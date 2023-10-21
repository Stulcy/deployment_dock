import { ethers } from "hardhat";

async function deploy() {
  const dealDeployerFactory = await ethers.getContractFactory("DealDeployer");
  const dealDeployer = await dealDeployerFactory.deploy();
  await dealDeployer.waitForDeployment();
  console.log(await dealDeployer.getAddress());

  // const [user1, user2] = await ethers.getSigners();

  // const tokenFactory = await ethers.getContractFactory("ExampleERC20");
  // const appleToken = await tokenFactory.connect(user1).deploy("Apple", "APL");
  // await appleToken.waitForDeployment();
  // console.log(await appleToken.getAddress());
  // const potatoToken = await tokenFactory.connect(user2).deploy("Potato", "PTT");
  // await potatoToken.waitForDeployment();
  // console.log(await potatoToken.getAddress());
}

deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
