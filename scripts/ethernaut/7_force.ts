import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me] = await ethers.getSigners();

  const forceFactory = await ethers.getContractFactory("Force");
  const force = await forceFactory.deploy();

  const forceAddress = await force.getAddress();

  const forceFillerFactory = await ethers.getContractFactory("ForceFiller");
  const forceFiller = await forceFillerFactory.deploy(forceAddress, {
    value: 100,
  });

  await forceFiller.fillForce();
  console.log(await ethers.provider.getBalance(forceAddress));
}

async function handleReal() {
  const forceFillerFactory = await ethers.getContractFactory("ForceFiller");
  const forceFiller = await forceFillerFactory.deploy(
    "0xE011423026836B45E4F049c10439F611f9189171",
    {
      value: 100,
    }
  );

  await forceFiller.fillForce();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
