import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const gatekeeperOneFactory = await ethers.getContractFactory("GatekeeperTwo");
  const gatekeeperOne = await gatekeeperOneFactory.deploy();
  await gatekeeperOne.waitForDeployment();

  const theOtherMeTwoFactory = await ethers.getContractFactory("TheOtherMeTwo");
  const theOtherMeTwo = await theOtherMeTwoFactory.deploy(
    await gatekeeperOne.getAddress()
  );
  await theOtherMeTwo.waitForDeployment();
}

async function handleReal() {
  const gatekeeperTwo = await ethers.getContractAt(
    "GatekeeperOne",
    "0xBEf88AE9Ceb6429574Ecf0A07332e8e76963eD55"
  );
  const theOtherMeTwoFactory = await ethers.getContractFactory("TheOtherMeTwo");
  const theOtherMeTwo = await theOtherMeTwoFactory.deploy(
    await gatekeeperTwo.getAddress()
  );
  await theOtherMeTwo.waitForDeployment();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
