import { ethers } from "hardhat";

async function giveAllowance() {
  const [user1, user2] = await ethers.getSigners();

  //   const appleToken = await ethers.getContractAt(
  //     "ExampleERC20",
  //     "0xbA92B9219b0DeF5F3e6dC5e95787EcA6d0D309C3"
  //   );

  //   const tx = await appleToken.approve(
  //     "0xC60A0122f9Af24bC333e399f304BBA52858E73F1",
  //     ethers.parseEther("10")
  //   );
  //   await tx.wait();

  const potatoToken = await ethers.getContractAt(
    "ExampleERC20",
    "0x3c7e67d7ED1bC104621d7CaE810d64f3Ae458072"
  );

  const tx = await potatoToken
    .connect(user2)
    .approve(
      "0xC60A0122f9Af24bC333e399f304BBA52858E73F1",
      ethers.parseEther("10")
    );
  await tx.wait();
}

giveAllowance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
