import { ethers } from "hardhat";

async function task() {
  const [me] = await ethers.getSigners();

  const dealDeployer = await ethers.getContractAt(
    "DealDeployer",
    "0xB9A02C688Eb2BD954dDd1c8234Aa452882F1be14"
  );

  // const tx = await dealDeployer.initiateDeal(
  //   "0x99cB818E7e1Db89Dc6927D6Ba3B06112D62cACB1",
  //   "0xbA92B9219b0DeF5F3e6dC5e95787EcA6d0D309C3",
  //   "0x3c7e67d7ED1bC104621d7CaE810d64f3Ae458072",
  //   ethers.parseEther("10"),
  //   ethers.parseEther("20")
  // );
  // await tx.wait();

  const deal = await ethers.getContractAt(
    "Deal",
    (
      await dealDeployer.getDeals(me.address)
    )[0]
  );

  console.log(await deal.user0());
}

task().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
