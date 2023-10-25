import { ethers } from "hardhat";

async function checkAllowance() {
  const [user1, user2] = await ethers.getSigners();

  const appleToken = await ethers.getContractAt(
    "ExampleERC20",
    "0xbA92B9219b0DeF5F3e6dC5e95787EcA6d0D309C3"
  );

  console.log(
    await appleToken.allowance(
      user1.address,
      "0x9864e9AB59515B0fE9C058271DFcf9339d738A2e"
    )
  );
}

checkAllowance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
