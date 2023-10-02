import { ethers } from "hardhat";

async function interact() {
  const contract = await ethers.getContractAt(
    "Smth",
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );

  await contract.setCount(ethers.parseUnits("5"));

  const res = await contract.getCount();
  console.log(ethers.formatEther(res));
}

interact().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
