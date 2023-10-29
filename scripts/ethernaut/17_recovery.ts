import { ethers } from "hardhat";

async function handleReal() {
  const simpleToken = await ethers.getContractAt(
    "SimpleToken",
    "0x34dBc06B0Feb78ea0E14E449885Cd6dcCDDC091e"
  );

  const tx = await simpleToken.destroy(
    "0x280D29be122e4ed3fEB0f57732ADCB4320598de2"
  );
  await tx.wait();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
