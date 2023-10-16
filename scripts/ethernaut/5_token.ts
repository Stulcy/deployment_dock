import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer] = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("Token");
  const token = await tokenFactory.connect(deployer).deploy(21000000);
  await token.waitForDeployment();

  const goodFriendFactory = await ethers.getContractFactory("GoodFriend");
  const goodFriend = await goodFriendFactory.deploy(await token.getAddress());
  await goodFriend.waitForDeployment();

  console.log(await token.balanceOf(me.address));

  const tx = await goodFriend.callTransfer(me.address, 1000000000000000);
  await tx.wait();

  console.log(await token.balanceOf(me.address));
}

async function handleReal() {
  const [me] = await ethers.getSigners();

  const goodFriendFactory = await ethers.getContractFactory("GoodFriend");
  const goodFriend = await goodFriendFactory.deploy("0xSPACEGENTLEMAN");
  await goodFriend.waitForDeployment();

  const tx = await goodFriend.callTransfer(me.address, 1000000000000000);
  await tx.wait();
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
