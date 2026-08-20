import { ethers } from "hardhat";
import * as cfg from "./config";

const EXPECTED_DEPLOYER =
  "0xE03866829778214D33a66A3F0517cDE32De4293E";

type VestingTarget =
  | "LIQUIDITY"
  | "ECOSYSTEM"
  | "DEVELOPMENT"
  | "TEAM";

async function main() {
  console.log("======================================");
  console.log("FIDURIS MAINNET - ONE VESTING DEPLOY");
  console.log("NO TOKEN TRANSFERS");
  console.log("======================================");

  // 1. Network safety
  const network = await ethers.provider.getNetwork();

  if (network.chainId !== 56n) {
    throw new Error(
      "STOP: Expected BNB Chain Mainnet (Chain ID 56)."
    );
  }

  console.log("Chain ID: 56");

  // 2. Select exactly one vesting target
  const target =
    process.env.MAINNET_VESTING_TARGET as
      | VestingTarget
      | undefined;

  if (
    target !== "LIQUIDITY" &&
    target !== "ECOSYSTEM" &&
    target !== "DEVELOPMENT" &&
    target !== "TEAM"
  ) {
    throw new Error(
      "STOP: MAINNET_VESTING_TARGET is invalid."
    );
  }

  // 3. Target-specific confirmation
  const expectedConfirm =
    `FIDURIS_DEPLOY_${target}_ONCE`;

  if (
    process.env.MAINNET_VESTING_CONFIRM !==
    expectedConfirm
  ) {
    throw new Error(
      `STOP: Confirmation must equal ${expectedConfirm}`
    );
  }

  // 4. Global tokenomics safety
  const total =
    cfg.INITIAL_LIQUIDITY +
    cfg.LIQUIDITY_RESERVE +
    cfg.ECOSYSTEM +
    cfg.DEVELOPMENT +
    cfg.TEAM;

  if (
    cfg.TOKEN_SUPPLY !== 10_000_000n ||
    total !== 10_000_000n
  ) {
    throw new Error(
      "STOP: Tokenomics total mismatch."
    );
  }

  const M = cfg.MONTH;

  // 5. Exact target configuration
  let name: string;
  let duration: number;
  let cliff: number;

  if (target === "LIQUIDITY") {
    if (
      cfg.LIQUIDITY_RESERVE !== 3_000_000n ||
      cfg.LIQUIDITY_CLIFF !== 3 * M ||
      cfg.LIQUIDITY_DURATION !== 27 * M ||
      cfg.LIQUIDITY_DURATION -
        cfg.LIQUIDITY_CLIFF !==
        24 * M
    ) {
      throw new Error(
        "STOP: Liquidity configuration mismatch."
      );
    }

    name = "Liquidity Reserve";
    duration = cfg.LIQUIDITY_DURATION;
    cliff = cfg.LIQUIDITY_CLIFF;
  } else if (target === "ECOSYSTEM") {
    if (
      cfg.ECOSYSTEM !== 3_000_000n ||
      cfg.ECOSYSTEM_CLIFF !== 3 * M ||
      cfg.ECOSYSTEM_DURATION !== 48 * M ||
      cfg.ECOSYSTEM_DURATION -
        cfg.ECOSYSTEM_CLIFF !==
        45 * M
    ) {
      throw new Error(
        "STOP: Ecosystem configuration mismatch."
      );
    }

    name = "Ecosystem & Community";
    duration = cfg.ECOSYSTEM_DURATION;
    cliff = cfg.ECOSYSTEM_CLIFF;
  } else if (target === "DEVELOPMENT") {
    if (
      cfg.DEVELOPMENT !== 1_000_000n ||
      cfg.DEVELOPMENT_CLIFF !== 3 * M ||
      cfg.DEVELOPMENT_DURATION !== 48 * M ||
      cfg.DEVELOPMENT_DURATION -
        cfg.DEVELOPMENT_CLIFF !==
        45 * M
    ) {
      throw new Error(
        "STOP: Development configuration mismatch."
      );
    }

    name = "Development";
    duration = cfg.DEVELOPMENT_DURATION;
    cliff = cfg.DEVELOPMENT_CLIFF;
  } else {
    if (
      cfg.TEAM !== 1_000_000n ||
      cfg.TEAM_CLIFF !== 12 * M ||
      cfg.TEAM_DURATION !== 60 * M ||
      cfg.TEAM_DURATION -
        cfg.TEAM_CLIFF !==
        48 * M
    ) {
      throw new Error(
        "STOP: Team configuration mismatch."
      );
    }

    name = "Team";
    duration = cfg.TEAM_DURATION;
    cliff = cfg.TEAM_CLIFF;
  }

  console.log("Target:", name);
  console.log("Duration seconds:", duration);
  console.log("Cliff seconds:", cliff);

  // 6. Signer safety
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
      `STOP: Wrong deployer: ${deployer.address}`
    );
  }

  console.log("Deployer:", deployer.address);

  // 7. Blockchain timestamp
  const latestBlock =
    await ethers.provider.getBlock("latest");

  if (!latestBlock) {
    throw new Error(
      "STOP: Could not read latest Mainnet block."
    );
  }

  const startTimestamp = latestBlock.timestamp;

  // 8. Deploy ONE contract
  const Vesting =
    await ethers.getContractFactory(
      "TokenVesting"
    );

  console.log("");
  console.log(`Deploying ONLY: ${name}`);

  const vesting = await Vesting.deploy(
    deployer.address,
    startTimestamp,
    BigInt(duration),
    BigInt(cliff)
  );

  await vesting.waitForDeployment();

  const address =
    await vesting.getAddress();

  // 9. Read-back verification
  const owner = await vesting.owner();
  const start = await vesting.start();
  const actualDuration =
    await vesting.duration();
  const actualCliff =
    await vesting.cliff();

  if (
    owner.toLowerCase() !==
    EXPECTED_DEPLOYER.toLowerCase()
  ) {
    throw new Error("FAIL: Owner mismatch.");
  }

  if (start !== BigInt(startTimestamp)) {
    throw new Error("FAIL: Start mismatch.");
  }

  if (
    actualDuration !== BigInt(duration)
  ) {
    throw new Error("FAIL: Duration mismatch.");
  }

  if (
    actualCliff - start !== BigInt(cliff)
  ) {
    throw new Error("FAIL: Cliff mismatch.");
  }

  console.log("");
  console.log("======================================");
  console.log(`${name}: DEPLOYMENT PASS`);
  console.log("Address:", address);
  console.log("Start:", start.toString());
  console.log(
    "Duration:",
    actualDuration.toString()
  );
  console.log(
    "Cliff offset:",
    (actualCliff - start).toString()
  );
  console.log("");
  console.log("NO FID WAS TRANSFERRED.");
  console.log(
    "VERIFY AND RECORD THIS ADDRESS BEFORE CONTINUING."
  );
  console.log("======================================");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});