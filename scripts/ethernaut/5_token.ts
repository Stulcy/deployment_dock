import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer, other] = await ethers.getSigners();

  const tokenFactory = await ethers.getContractFactory("Token");
  const token = await tokenFactory.connect(deployer).deploy(21000000);

  console.log(await token.totalSupply());
  console.log(await token.balanceOf(me.address));
  console.log(await token.balanceOf(deployer.address));

  await token.connect(other).transfer(me.address, 1000000000000000);

  console.log(await token.balanceOf(me.address));
}

async function handleReal() {
  const [me] = await ethers.getSigners();

  const goodFriendFactory = await ethers.getContractFactory("GoodFriend");
  const goodFriend = await goodFriendFactory.deploy(
    "0x83e400Da260da717B5B84e5a4900A92CF593e739"
  );

  await goodFriend.callTransfer(me.address, 1000000000000000);
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
