import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const vaultFactory = await ethers.getContractFactory("Vault");
  const vault = await vaultFactory.deploy(
    ethers.encodeBytes32String("Solidity")
  );

  const vaultAddress = await vault.getAddress();

  const storage1 = await ethers.provider.getStorage(vaultAddress, 1);

  console.log(ethers.decodeBytes32String(storage1));

  await vault.unlock(storage1);
}

async function handleReal() {
  const vault = await ethers.getContractAt(
    "Vault",
    "0x31aeFe5f3e3C9c8a08ED41279899Af7a2357d2fd"
  );

  const storage1 = await ethers.provider.getStorage(
    "0x31aeFe5f3e3C9c8a08ED41279899Af7a2357d2fd",
    1
  );

  await vault.unlock(storage1);
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
