import { ethers } from "hardhat";

const FACTOR =
  57896044618658097711785492504343953926634992332820282019728792003956564819968n;

// Run on localhost
async function handleTest() {
  const coinFlipFactory = await ethers.getContractFactory("CoinFlip");
  const coinFlip = await coinFlipFactory.deploy();

  const coinFlipBreakerFactory = await ethers.getContractFactory(
    "CoinFlipBreaker"
  );
  const coinFlipBreaker = await coinFlipBreakerFactory.deploy(
    await coinFlip.getAddress()
  );

  await coinFlipBreaker.flip();

  for (let i = 0; i < 10; i++) {
    await coinFlipBreaker.flip();
    console.log(i);
  }
}

async function handleReal() {
  const coinFlip = await ethers.getContractAt(
    "CoinFlip",
    "0x9329A37b58A858DE76cD6e3edd782E00006326B8"
  );

  const coinFlipBreakerFactory = await ethers.getContractFactory(
    "CoinFlipBreaker"
  );
  const coinFlipBreaker = await coinFlipBreakerFactory.deploy(
    "0x9329A37b58A858DE76cD6e3edd782E00006326B8"
  );

  for (let i = 0; i < 10; i++) {
    await coinFlipBreaker.flip();
    console.log(i);
    await new Promise((f) => setTimeout(f, 20000));
  }
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
