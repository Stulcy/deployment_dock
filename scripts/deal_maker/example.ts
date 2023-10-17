import { ethers } from "hardhat";

async function run() {
  const [user1, user2, deployer] = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("ExampleERC20");
  const appleToken = await tokenFactory.connect(user1).deploy("Apple", "APL");
  await appleToken.waitForDeployment();
  const potatoToken = await tokenFactory.connect(user2).deploy("Potato", "PTT");
  await potatoToken.waitForDeployment();

  const dealDeployerFactory = await ethers.getContractFactory("DealDeployer");
  const dealDeployer = await dealDeployerFactory.connect(deployer).deploy();
  await dealDeployer.waitForDeployment();

  const dealTx = await dealDeployer
    .connect(user1)
    .initiateDeal(
      user2.address,
      await appleToken.getAddress(),
      await potatoToken.getAddress(),
      ethers.parseEther("10"),
      ethers.parseEther("20")
    );
  await dealTx.wait();

  const res = await dealDeployer.getDeals(user1.address);
  const dealAddress = res[0] ?? "";

  const deal = await ethers.getContractAt("Deal", dealAddress);

  const approveTx1 = await appleToken
    .connect(user1)
    .approve(dealAddress, ethers.parseEther("10"));
  await approveTx1.wait();

  const approveTx2 = await potatoToken
    .connect(user2)
    .approve(dealAddress, ethers.parseEther("20"));
  await approveTx2.wait();

  console.log("User1 balance:");
  console.log(
    "APL:",
    ethers.formatEther(await appleToken.balanceOf(user1.address))
  );
  console.log(
    "PTT:",
    ethers.formatEther(await potatoToken.balanceOf(user1.address))
  );
  console.log("User2 balance:");
  console.log(
    "APL:",
    ethers.formatEther(await appleToken.balanceOf(user2.address))
  );
  console.log(
    "PTT:",
    ethers.formatEther(await potatoToken.balanceOf(user2.address))
  );

  const executeTx = await deal.execute();
  await executeTx.wait();

  console.log("User1 balance:");
  console.log(
    "APL:",
    ethers.formatEther(await appleToken.balanceOf(user1.address))
  );
  console.log(
    "PTT:",
    ethers.formatEther(await potatoToken.balanceOf(user1.address))
  );
  console.log("User2 balance:");
  console.log(
    "APL:",
    ethers.formatEther(await appleToken.balanceOf(user2.address))
  );
  console.log(
    "PTT:",
    ethers.formatEther(await potatoToken.balanceOf(user2.address))
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
