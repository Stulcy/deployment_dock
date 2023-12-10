import { ethers } from "hardhat";

async function test() {
  const bridgeContract = await ethers.getContractAt(
    "AnyswapV4ERC20",
    "0xe069Af87450fB51Fc0d0E044617f1C134163e591"
  );

  console.log(
    await bridgeContract.balanceOf("0xA99f7fF0d8b3dbc1eF552b1B80822F551b81F6F6")
  );
}

test().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
