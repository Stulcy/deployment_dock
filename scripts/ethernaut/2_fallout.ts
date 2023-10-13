import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer] = await ethers.getSigners();

  const falloutFactory = await ethers.getContractFactory("Fallout");
  const fallout = await falloutFactory.connect(deployer).deploy();
  await fallout.waitForDeployment();

  console.log(await fallout.owner());

  console.log(await ethers.provider.getBalance(me.address));

  const falloutTx = await fallout
    .connect(me)
    .Fal1out({ value: ethers.parseEther("50") });
  await falloutTx.wait();

  console.log(await ethers.provider.getBalance(me.address));

  const collectTx = await fallout.connect(me).collectAllocations();
  await collectTx.wait();

  console.log(await ethers.provider.getBalance(me.address));
}

async function handleReal() {
  const fallout = await ethers.getContractAt("Fallout", "0xSPACEGENTLEMAN");

  const falloutTx = await fallout.Fal1out();
  await falloutTx.wait();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
