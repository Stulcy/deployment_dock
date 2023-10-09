import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const elevatorFactory = await ethers.getContractFactory("Elevator");
  const elevator = await elevatorFactory.deploy();

  const buildingFactory = await ethers.getContractFactory("MyBuilding");
  const building = await buildingFactory.deploy();

  await building.goToFloor(await elevator.getAddress());
}

async function handleReal() {
  const buildingFactory = await ethers.getContractFactory("MyBuilding");
  const building = await buildingFactory.deploy();
  await building.waitForDeployment(); // THIS AWAIT IS NEEDED EVERYWHERE

  await building.goToFloor("0xa1fe9d6cd96feb9e0e3ffbffe7b052f1944720f7", {
    gasLimit: 100000,
  });
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
