import { ethers } from "hardhat";

const CONTRACT = "0xB5Aa2F77d7b72A4895823A00833E6742Ec8f1DB8";

async function handleReal() {
  const return42DeployerDeployer = await ethers.getContractFactory(
    "Return42Deployer"
  );
  const return42Deployer = await return42DeployerDeployer.deploy(CONTRACT);
  await return42Deployer.waitForDeployment();

  console.log("Deployed & Solved");
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
