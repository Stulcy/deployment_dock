import { ethers } from "hardhat";

// Basic example of interaction with a contract

async function interact() {
  const contract = await ethers.getContractAt(
    "Smth",
    "0x5fbdb2315678afecb367f032d93f642f64180aa3"
  );

  const tx = await contract.setCount(ethers.parseUnits("5"));
  await tx.wait();

  const res = await contract.getCount();

  console.log("Count ->", ethers.formatEther(res), "ETH");
}

interact().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
