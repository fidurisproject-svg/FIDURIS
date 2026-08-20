import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const mainnetSignerEnabled =
  process.env.MAINNET_SIGNER_ENABLE ===
  "FIDURIS_ENABLE_MAINNET_SIGNER";

const mainnetAccounts =
  mainnetSignerEnabled && process.env.PRIVATE_KEY
    ? [process.env.PRIVATE_KEY]
    : [];

const config: HardhatUserConfig = {
  solidity: "0.8.28",

  networks: {
    bscTestnet: {
      url: "https://bsc-testnet-rpc.publicnode.com",
      chainId: 97,
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },

    bscMainnet: {
      url: "https://bsc-dataseed.bnbchain.org",
      chainId: 56,
      accounts: mainnetAccounts,
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
  },
};

export default config;