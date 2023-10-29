import { ethers } from "hardhat";

const CONTRACT = "0x6E6c5ac33e1C5bF2d9c9Bf0329C24EE28751049d";

async function handleReal() {
  const alienCodexBreakerFactory = await ethers.getContractFactory(
    "AlienCodexBreaker"
  );
  const alienCodexBreaker = await alienCodexBreakerFactory.deploy(CONTRACT);
  await alienCodexBreaker.waitForDeployment();

  console.log("Done!");
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
