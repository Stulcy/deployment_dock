import { ethers } from "hardhat";

async function swapTest() {
  // Get usable wallets
  const signers = await ethers.getSigners();

  // Deploy token 0 (from wallet #0 (user0) - no changes)
  const token0 = await ethers.deployContract("ExampleERC20", ["Token0", "T0"]);
  const token0Contract = await token0.waitForDeployment();
  const token0Address = await token0Contract.getAddress();
  console.log("Token0 ->", token0Address, "\n");

  // Deploy token 1
  const token1 = await ethers.deployContract(
    "ExampleERC20",
    ["Token1", "T1"],
    signers[1] // Sign transaction with account #1 wallet (user1)
  );
  const token1Contract = await token1.waitForDeployment();
  const token1Address = await token1Contract.getAddress();
  console.log("Token1 ->", token1Address, "\n");

  // Balances at first
  console.log("User 0 balance:");
  console.log(
    "token0 ->",
    ethers.formatEther(await token0.balanceOf(signers[0]))
  );
  console.log(
    "token1 ->",
    ethers.formatEther(await token1.balanceOf(signers[0]))
  );
  console.log();
  console.log("User 1 balance:");
  console.log(
    "token0 ->",
    ethers.formatEther(await token0.balanceOf(signers[1]))
  );
  console.log(
    "token1 ->",
    ethers.formatEther(await token1.balanceOf(signers[1]))
  );

  // Deploy TokenSwap
  const tokenSwap = await ethers.deployContract("TokenSwap", [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    token0,
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    token1,
  ]);
  const tokenSwapContract = await tokenSwap.waitForDeployment();
  const tokenSwapAddress = await tokenSwapContract.getAddress();
  console.log("\nTokenSwap ->", tokenSwapAddress, "\n");

  // Giving allowance to tokenSwap for token0 from user0
  token0Contract.approve(tokenSwapAddress, ethers.parseEther("1"));

  // Giving allowance to tokenSwap for token1 from user1
  token1Contract
    .connect(signers[1])
    .approve(tokenSwapAddress, ethers.parseEther("2"));

  // Trigger swap
  await tokenSwapContract.swap(ethers.parseEther("1"), ethers.parseEther("2"));
  console.log("Swap went through!\n");

  // Balances at the end
  console.log("User 0 balance:");
  console.log(
    "token0 ->",
    ethers.formatEther(await token0.balanceOf(signers[0]))
  );
  console.log(
    "token1 ->",
    ethers.formatEther(await token1.balanceOf(signers[0]))
  );
  console.log();
  console.log("User 1 balance:");
  console.log(
    "token0 ->",
    ethers.formatEther(await token0.balanceOf(signers[1]))
  );
  console.log(
    "token1 ->",
    ethers.formatEther(await token1.balanceOf(signers[1]))
  );
}

swapTest().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
