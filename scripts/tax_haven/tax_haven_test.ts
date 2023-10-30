import { ethers } from "hardhat";

async function test() {
  const [me] = await ethers.getSigners();

  const exampleTokenFactory = await ethers.getContractFactory("ExampleERC20");
  const exampleToken = await exampleTokenFactory.deploy("Token", "TKN");
  await exampleToken.waitForDeployment();

  const taxHavenTokenFactory = await ethers.getContractFactory("TaxHavenToken");
  const taxHavenToken = await taxHavenTokenFactory.deploy(
    "thToken",
    "thTKN",
    await exampleToken.getAddress()
  );
  await taxHavenToken.waitForDeployment();

  const approveTx = await exampleToken.approve(
    await taxHavenToken.getAddress(),
    ethers.parseEther("1")
  );
  await approveTx.wait();

  console.log(ethers.formatEther(await taxHavenToken.balanceOf(me.address)));

  const mintTx = await taxHavenToken.mint(ethers.parseEther("1"));
  await mintTx.wait();

  console.log(ethers.formatEther(await taxHavenToken.balanceOf(me.address)));

  const burnTx = await taxHavenToken.burn(ethers.parseEther("1"));
  await burnTx.wait();

  console.log(ethers.formatEther(await taxHavenToken.balanceOf(me.address)));
}

test().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
