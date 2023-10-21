import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  // solidity: "0.8.19",
  solidity: {
    compilers: [
      { version: "0.8.19" },
      { version: "0.6.0" },
      { version: "0.6.12" },
      { version: "0.6.6" },
      { version: "0.5.16" },
      { version: "0.5.0" },
      { version: "0.4.0" },
    ],
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_API_KEY}`,
      accounts: [
        process.env.WALLET_PRIVATE_KEY as string,
        process.env.SECOND_WALLET_PRIVATE_KEY as string,
      ],
    },
    mumbai: {
      // url: `https://polygon-mumbai.infura.io/v3/${process.env.MUMBAI_INFURA_API_KEY}`,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_API_KEY}`,
      accounts: [
        process.env.WALLET_PRIVATE_KEY as string,
        process.env.SECOND_WALLET_PRIVATE_KEY as string,
      ],
    },
  },
};

export default config;
