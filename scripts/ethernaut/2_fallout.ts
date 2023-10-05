import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer] = await ethers.getSigners();

  const falloutFactory = await ethers.getContractFactory("Fallout");
  const fallout = await falloutFactory.connect(deployer).deploy();

  console.log(await ethers.provider.getBalance(me.address));

  await fallout.connect(me).Fal1out({ value: ethers.parseEther("50") });

  console.log(await ethers.provider.getBalance(me.address));

  await fallout.connect(me).collectAllocations();

  console.log(await ethers.provider.getBalance(me.address));
}

// Run on Sepolia
async function handleReal() {
  const fallout = await ethers.getContractAt(
    "Fallout",
    "0x901eBDe592d38BB759F36d72262b1487eba7A16A"
  );

  const [me] = await ethers.getSigners();

  await fallout.connect(me).Fal1out({ value: 1 });

  await fallout.connect(me).collectAllocations();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
