import { ethers } from "hardhat";
import * as cfg from "./config";
const EXPECTED_DEPLOYER =
  "0xE03866829778214D33a66A3F0517cDE32De4293E";
async function main() {
  console.log("======================================");
  console.log("FIDURIS MAINNET TOKEN DEPLOYMENT");
  console.log("======================================");

  // -----------------------------------
  // 1. Network safety
  // -----------------------------------

  const network = await ethers.provider.getNetwork();

  console.log("Chain ID:", network.chainId.toString());

  if (network.chainId !== 56n) {
    throw new Error(
      "STOP: This script can only run on BNB Chain Mainnet (Chain ID 56)."
    );
  }

  // -----------------------------------
  // 2. Manual confirmation safety
  // -----------------------------------

  if (
    process.env.MAINNET_DEPLOY_CONFIRM !==
    "FIDURIS_MAINNET_DEPLOY"
  ) {
    throw new Error(
      "STOP: MAINNET_DEPLOY_CONFIRM is not enabled."
    );
  }

  // -----------------------------------
  // 3. Tokenomics safety
  // -----------------------------------

  const allocated =
    cfg.INITIAL_LIQUIDITY +
    cfg.LIQUIDITY_RESERVE +
    cfg.ECOSYSTEM +
    cfg.DEVELOPMENT +
    cfg.TEAM;

  if (cfg.TOKEN_SUPPLY !== 10_000_000n) {
    throw new Error(
      "STOP: TOKEN_SUPPLY is not exactly 10,000,000."
    );
  }

  if (allocated !== cfg.TOKEN_SUPPLY) {
    throw new Error(
      "STOP: Tokenomics allocations do not equal total supply."
    );
  }

  console.log("Token supply:", cfg.TOKEN_SUPPLY.toString());
  console.log("Tokenomics total:", allocated.toString());

  // -----------------------------------
  // 4. Signer safety
  // -----------------------------------

  const signers = await ethers.getSigners();

  if (signers.length !== 1) {
    throw new Error(
      "STOP: Expected exactly one Mainnet deployer signer."
    );
  }

  const deployer = signers[0];
if (
  deployer.address.toLowerCase() !==
  EXPECTED_DEPLOYER.toLowerCase()
) {
  throw new Error(
    `STOP: Wrong Mainnet deployer. Expected ${EXPECTED_DEPLOYER}, got ${deployer.address}`
  );
}
  console.log("Deployer:", deployer.address);

  const bnbBalance =
    await ethers.provider.getBalance(deployer.address);

  console.log(
    "BNB balance:",
    ethers.formatEther(bnbBalance)
  );

  // -----------------------------------
  // 5. Deploy FIDURIS
  // -----------------------------------

  console.log("");
  console.log("Deploying ONE FIDURIS token...");

  const FIDURIS =
    await ethers.getContractFactory("FIDURIS");

  const token = await FIDURIS.deploy();

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();

  console.log("");
  console.log("FIDURIS deployed:");
  console.log(tokenAddress);

  // -----------------------------------
  // 6. Post-deployment verification
  // -----------------------------------

  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  const maxSupply = await token.MAX_SUPPLY();
  const deployerBalance =
    await token.balanceOf(deployer.address);

  const expectedSupply =
    ethers.parseUnits("10000000", 18);

  if (name !== "FIDURIS") {
    throw new Error("FAIL: Wrong token name.");
  }

  if (symbol !== "FID") {
    throw new Error("FAIL: Wrong token symbol.");
  }

  if (decimals !== 18n) {
    throw new Error("FAIL: Wrong decimals.");
  }

  if (totalSupply !== expectedSupply) {
    throw new Error("FAIL: Wrong total supply.");
  }

  if (maxSupply !== expectedSupply) {
    throw new Error("FAIL: MAX_SUPPLY mismatch.");
  }

  if (deployerBalance !== expectedSupply) {
    throw new Error(
      "FAIL: Deployer did not receive full supply."
    );
  }

  console.log("");
  console.log("POST-DEPLOYMENT CHECKS:");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals.toString());
  console.log(
    "Total supply:",
    ethers.formatUnits(totalSupply, 18),
    "FID"
  );
  console.log(
    "Deployer balance:",
    ethers.formatUnits(deployerBalance, 18),
    "FID"
  );

  console.log("");
  console.log("======================================");
  console.log("MAINNET TOKEN DEPLOYMENT: PASS");
  console.log("FIDURIS:", tokenAddress);
  console.log("======================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});