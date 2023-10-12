import { ethers } from "hardhat";

// Basic example of deploying a contract

async function main() {
  const smthDeployer = await ethers.getContractFactory("Smth");
  const smth = await smthDeployer.deploy();
  await smth.waitForDeployment();

  console.log("Deployed ->", await smth.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
