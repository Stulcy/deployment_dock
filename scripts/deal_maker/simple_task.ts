import { ethers } from "hardhat";

async function task() {
  const [me] = await ethers.getSigners();

  const dealDeployer = await ethers.getContractAt(
    "DealDeployer",
    "0x5347E967692d1e002BF5E54BBEc59a6008f77B73"
  );

  const tx = await dealDeployer.initiateDeal(
    "0x99cB818E7e1Db89Dc6927D6Ba3B06112D62cACB1",
    "0xbA92B9219b0DeF5F3e6dC5e95787EcA6d0D309C3",
    "0x3c7e67d7ED1bC104621d7CaE810d64f3Ae458072",
    ethers.parseEther("10"),
    ethers.parseEther("10")
  );
  await tx.wait();

  console.log((await dealDeployer.getDeals(me.address))[0]);
}

task().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
