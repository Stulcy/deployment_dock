import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const gatekeeperOneFactory = await ethers.getContractFactory("GatekeeperOne");
  const gatekeeperOne = await gatekeeperOneFactory.deploy();
  await gatekeeperOne.waitForDeployment();

  const theOtherMeFactory = await ethers.getContractFactory("TheOtherMe");
  const theOtherMe = await theOtherMeFactory.deploy(
    await gatekeeperOne.getAddress()
  );
  await theOtherMe.waitForDeployment();

  const tx = await theOtherMe.callEnter();
  await tx.wait();
}

async function handleReal() {
  const gatekeeperOne = await ethers.getContractAt(
    "GatekeeperOne",
    "0xdE700b4651c2E91612e4Ea1709A78CD2025adBfe"
  );

  const theOtherMeFactory = await ethers.getContractFactory("TheOtherMe");
  const theOtherMe = await theOtherMeFactory.deploy(
    await gatekeeperOne.getAddress()
  );
  await theOtherMe.waitForDeployment();

  const tx = await theOtherMe.callEnter();
  await tx.wait();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
