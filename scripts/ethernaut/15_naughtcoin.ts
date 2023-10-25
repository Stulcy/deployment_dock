import { ethers } from "hardhat";

async function handleReal() {
  const [me, otherMe] = await ethers.getSigners();

  const naughtCoin = await ethers.getContractAt(
    "NaughtCoin",
    "0x74aF04F79B9FD44e0A5291749C575249b98636Ae"
  );

  console.log(ethers.formatEther(await naughtCoin.balanceOf(me.address)));
  const tx0 = await naughtCoin.approve(otherMe, ethers.parseEther("1000000"));
  await tx0.wait();

  const tx1 = await naughtCoin
    .connect(otherMe)
    .transferFrom(me.address, otherMe.address, ethers.parseEther("1000000"));

  await tx1.wait();

  console.log(ethers.formatEther(await naughtCoin.balanceOf(me.address)));
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
