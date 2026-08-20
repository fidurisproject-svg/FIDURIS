import { ethers } from "hardhat";
import * as cfg from "./config";

const EXPECTED_DEPLOYER =
  "0xE03866829778214D33a66A3F0517cDE32De4293E";

const FIDURIS_TOKEN =
  "0x60fabB10244037718b907De9ec7E17A622A8B482";

type FundingTarget =
  | "LIQUIDITY"
  | "ECOSYSTEM"
  | "DEVELOPMENT"
  | "TEAM";

type TargetConfig = {
  label: string;
  address: string;
  amount: bigint;
  start: bigint;
  duration: bigint;
  cliffOffset: bigint;
};

const TARGETS: Record<FundingTarget, TargetConfig> = {
  LIQUIDITY: {
    label: "Liquidity Reserve",
    address: "0xA633245e9De4542ff61b501702C0D1E86496ece7",
    amount: cfg.LIQUIDITY_RESERVE,
    start: 1786993146n,
    duration: BigInt(cfg.LIQUIDITY_DURATION),
    cliffOffset: BigInt(cfg.LIQUIDITY_CLIFF),
  },

  ECOSYSTEM: {
    label: "Ecosystem & Community",
    address: "0xfCD582DE365f1863430194082Babe6A0e8a2C2c4",
    amount: cfg.ECOSYSTEM,
    start: 1786994868n,
    duration: BigInt(cfg.ECOSYSTEM_DURATION),
    cliffOffset: BigInt(cfg.ECOSYSTEM_CLIFF),
  },

  DEVELOPMENT: {
    label: "Development",
    address: "0x6E86aCaE9A77079Eb291B3f2FF5fb2f5ca0bd521",
    amount: cfg.DEVELOPMENT,
    start: 1786996967n,
    duration: BigInt(cfg.DEVELOPMENT_DURATION),
    cliffOffset: BigInt(cfg.DEVELOPMENT_CLIFF),
  },

  TEAM: {
    label: "Team",
    address: "0x3032d2cf76cEE36D9b5e9D1A27E5F114fFBc1384",
    amount: cfg.TEAM,
    start: 1786998744n,
    duration: BigInt(cfg.TEAM_DURATION),
    cliffOffset: BigInt(cfg.TEAM_CLIFF),
  },
};

async function main() {
  console.log("======================================");
  console.log("FIDURIS MAINNET VESTING FUNDING");
  console.log("======================================");

  // --------------------------------------------------
  // 1. NETWORK CHECK
  // --------------------------------------------------

  const network = await ethers.provider.getNetwork();

  console.log("Chain ID:", network.chainId.toString());

  if (network.chainId !== 56n) {
    throw new Error(
      "STOP: This script can only run on BNB Chain Mainnet (Chain ID 56)."
    );
  }

  // --------------------------------------------------
  // 2. TARGET CHECK
  // --------------------------------------------------

  const targetName =
    process.env.MAINNET_FUNDING_TARGET as FundingTarget | undefined;

  if (
    !targetName ||
    !["LIQUIDITY", "ECOSYSTEM", "DEVELOPMENT", "TEAM"].includes(
      targetName
    )
  ) {
    throw new Error(
      "STOP: MAINNET_FUNDING_TARGET must be LIQUIDITY, ECOSYSTEM, DEVELOPMENT, or TEAM."
    );
  }

  const target = TARGETS[targetName];

  const expectedConfirmation =
    `FIDURIS_FUND_${targetName}_ONCE`;

  if (
    process.env.MAINNET_FUNDING_CONFIRM !==
    expectedConfirmation
  ) {
    throw new Error(
      `STOP: Confirmation must equal ${expectedConfirmation}`
    );
  }

  // --------------------------------------------------
  // 3. TOKENOMICS CHECK
  // --------------------------------------------------

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

  console.log("");
  console.log("Target:", target.label);
  console.log("Target address:", target.address);
  console.log("Allocation:", target.amount.toString(), "FID");

  // --------------------------------------------------
  // 4. SIGNER CHECK
  // --------------------------------------------------

  const signers = await ethers.getSigners();

  if (signers.length !== 1) {
    throw new Error(
      "STOP: Expected exactly one Mainnet signer."
    );
  }

  const deployer = signers[0];

  if (
    deployer.address.toLowerCase() !==
    EXPECTED_DEPLOYER.toLowerCase()
  ) {
    throw new Error(
      `STOP: Wrong signer. Expected ${EXPECTED_DEPLOYER}, got ${deployer.address}`
    );
  }

  console.log("Signer:", deployer.address);

  // --------------------------------------------------
  // 5. TOKEN CONTRACT CHECK
  // --------------------------------------------------

  const tokenCode =
    await ethers.provider.getCode(FIDURIS_TOKEN);

  if (tokenCode === "0x") {
    throw new Error(
      "STOP: No contract code at canonical FIDURIS token address."
    );
  }

  const token =
    await ethers.getContractAt(
      "FIDURIS",
      FIDURIS_TOKEN,
      deployer
    );

  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  const maxSupply = await token.MAX_SUPPLY();

  const expectedSupply =
    ethers.parseUnits("10000000", 18);

  if (name !== "FIDURIS")
    throw new Error("STOP: Wrong token name.");

  if (symbol !== "FID")
    throw new Error("STOP: Wrong token symbol.");

  if (decimals !== 18n)
    throw new Error("STOP: Wrong token decimals.");

  if (totalSupply !== expectedSupply)
    throw new Error("STOP: Wrong token total supply.");

  if (maxSupply !== expectedSupply)
    throw new Error("STOP: Wrong MAX_SUPPLY.");

  // --------------------------------------------------
  // 6. VESTING CONTRACT CHECK
  // --------------------------------------------------

  const vestingCode =
    await ethers.provider.getCode(target.address);

  if (vestingCode === "0x") {
    throw new Error(
      "STOP: Target vesting address has no contract code."
    );
  }

  const vesting =
    await ethers.getContractAt(
      "TokenVesting",
      target.address
    );

  const owner = await vesting.owner();
  const start = await vesting.start();
  const duration = await vesting.duration();
  const cliffAbsolute = await vesting.cliff();
  const cliffOffset = cliffAbsolute - start;

  if (
    owner.toLowerCase() !==
    EXPECTED_DEPLOYER.toLowerCase()
  ) {
    throw new Error(
      "STOP: Vesting owner does not match expected beneficiary."
    );
  }

  if (start !== target.start) {
    throw new Error(
      `STOP: Wrong vesting start. Expected ${target.start}, got ${start}`
    );
  }

  if (duration !== target.duration) {
    throw new Error(
      `STOP: Wrong vesting duration. Expected ${target.duration}, got ${duration}`
    );
  }

  if (cliffOffset !== target.cliffOffset) {
    throw new Error(
      `STOP: Wrong cliff offset. Expected ${target.cliffOffset}, got ${cliffOffset}`
    );
  }

  // --------------------------------------------------
  // 7. BALANCE / DUPLICATE-FUNDING CHECK
  // --------------------------------------------------

  const amount =
    ethers.parseUnits(
      target.amount.toString(),
      18
    );

  const targetBalanceBefore =
    await token.balanceOf(target.address);

  const deployerBalanceBefore =
    await token.balanceOf(deployer.address);

  console.log("");
  console.log(
    "Target FID balance before:",
    ethers.formatUnits(targetBalanceBefore, 18)
  );

  console.log(
    "Deployer FID balance before:",
    ethers.formatUnits(deployerBalanceBefore, 18)
  );

  if (targetBalanceBefore !== 0n) {
    throw new Error(
      "STOP: Target vesting already contains FID. Possible duplicate funding attempt."
    );
  }

  if (deployerBalanceBefore < amount) {
    throw new Error(
      "STOP: Deployer does not have enough FID."
    );
  }

  // --------------------------------------------------
  // 8. FINAL PRE-TRANSFER DISPLAY
  // --------------------------------------------------

  console.log("");
  console.log("======================================");
  console.log("FINAL FUNDING CHECK PASSED");
  console.log("======================================");
  console.log("From:", deployer.address);
  console.log("To:", target.address);
  console.log("Target:", target.label);
  console.log(
    "Amount:",
    ethers.formatUnits(amount, 18),
    "FID"
  );
  console.log("");
  console.log("SENDING ONE FID TRANSFER...");
if (
  process.env.MAINNET_FUNDING_EXECUTE !==
  "FIDURIS_EXECUTE_REAL_FUNDING"
) {
  throw new Error(
    "STOP: All pre-transfer checks passed. Real funding execution is disabled."
  );
}
  // --------------------------------------------------
  // 9. ONE REAL TRANSFER
  // --------------------------------------------------

  const tx =
    await token.transfer(
      target.address,
      amount
    );

  console.log("Transaction hash:", tx.hash);

  const receipt = await tx.wait();

  if (!receipt || receipt.status !== 1) {
    throw new Error(
      "FAIL: Funding transaction was not successful."
    );
  }

  // --------------------------------------------------
  // 10. POST-TRANSFER ON-CHAIN CHECK
  // --------------------------------------------------

  const targetBalanceAfter =
    await token.balanceOf(target.address);

  const deployerBalanceAfter =
    await token.balanceOf(deployer.address);

  if (targetBalanceAfter !== amount) {
    throw new Error(
      "FAIL: Target vesting balance does not equal intended allocation."
    );
  }

  if (
    deployerBalanceAfter !==
    deployerBalanceBefore - amount
  ) {
    throw new Error(
      "FAIL: Deployer balance changed by an unexpected amount."
    );
  }

  console.log("");
  console.log("POST-TRANSFER CHECK:");
  console.log(
    "Target balance:",
    ethers.formatUnits(targetBalanceAfter, 18),
    "FID"
  );

  console.log(
    "Deployer balance:",
    ethers.formatUnits(deployerBalanceAfter, 18),
    "FID"
  );

  console.log("");
  console.log("======================================");
  console.log(`${target.label}: FUNDING PASS`);
  console.log("TX:", tx.hash);
  console.log("======================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});