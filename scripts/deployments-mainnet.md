# FIDURIS MAINNET DEPLOYMENT RECORD

## NETWORK
- Network: BNB Chain Mainnet
- Chain ID: 56
- Status: TOKEN AND VESTING DEPLOYED, VERIFIED AND FUNDED

## EXPECTED DEPLOYER
- Address: 0xE03866829778214D33a66A3F0517cDE32De4293E

## TOKEN
- Name: FIDURIS
- Symbol: FID
- Decimals: 18
- Maximum Supply: 10,000,000 FID
- Mainnet Contract Address: 0x60fabB10244037718b907De9ec7E17A622A8B482
- Deployment TX: 0xabf58d8b168c5082864c949a323b98768d4fef7745af43ac2ee7018b4a7e1758
- Deployment Block: 116508865
- Deployment Time: 17 August 2026, 18:02:18 UTC
- Deployment Status: SUCCESS
- Initial Mint: 10,000,000 FID to deployer
- Source Verification: VERIFIED

## TOKENOMICS
- Initial Liquidity: 2,000,000 FID
- Liquidity Reserve: 3,000,000 FID
- Ecosystem & Community: 3,000,000 FID
- Development: 1,000,000 FID
- Team: 1,000,000 FID
- Total: 10,000,000 FID

## VESTING

### Liquidity Reserve
- Allocation: 3,000,000 FID
- Cliff: 3 months
- Linear Vesting After Cliff: 24 months
- Total Duration: 27 months
- Mainnet Address: 0xA633245e9De4542ff61b501702C0D1E86496ece7
- Deployment TX: 0x101b371eaa097ead6535da36dfff1c2d2757015bcae4cfafc1123e31d03d9a67
- Deployment Block: 116516440
- Start Timestamp: 1786993146
- Source Verification: VERIFIED
- Funding TX: 0xb11c989be17e737fec2326c424b51b5a1bcda3adeb30907abe489659fa30140d
- Funding Status: SUCCESS
- Final FID Balance: 3,000,000 FID

### Ecosystem & Community
- Allocation: 3,000,000 FID
- Cliff: 3 months
- Linear Vesting After Cliff: 45 months
- Total Duration: 48 months
- Mainnet Address: 0xfCD582DE365f1863430194082Babe6A0e8a2C2c4
- Deployment TX: 0x949669bc652743e3e685a0da99a1b0357b9bcb32d1768a977b6aca43ae3cd72e
- Deployment Block: 116520268
- Start Timestamp: 1786994868
- Source Verification: VERIFIED
- Funding TX: 0xa51c9962d9c823b14bc29cfd39e3586c32790551e5cbf77e8b75111d3b1e32cf
- Funding Status: SUCCESS
- Final FID Balance: 3,000,000 FID

### Development
- Allocation: 1,000,000 FID
- Cliff: 3 months
- Linear Vesting After Cliff: 45 months
- Total Duration: 48 months
- Mainnet Address: 0x6E86aCaE9A77079Eb291B3f2FF5fb2f5ca0bd521
- Deployment TX: 0xa44d763fc4948f2a69e03905990c7a14437b7a0dae11aadac6ab0332c0ab8ba3
- Deployment Block: 116524929
- Start Timestamp: 1786996967
- Source Verification: VERIFIED
- Funding TX: 0xaa252c9c1bf024850b0aa0c87c95a4990e1b80edfdbe94134a891a4d753ec54c
- Funding Status: SUCCESS
- Final FID Balance: 1,000,000 FID

### Team
- Allocation: 1,000,000 FID
- Cliff: 12 months
- Linear Vesting After Cliff: 48 months
- Total Duration: 60 months
- Mainnet Address: 0x3032d2cf76cEE36D9b5e9D1A27E5F114fFBc1384
- Deployment TX: 0x2fdaef530e9fb29c384eefe953567b66c8106393eb3080687ef85801ed1afaca
- Deployment Block: 116528879
- Start Timestamp: 1786998744
- Source Verification: VERIFIED
- Funding TX: 0x85f656a15126cdcdc892181dc4627070a4d3f85df2bcd81136b1122f62f40925
- Funding Status: SUCCESS
- Final FID Balance: 1,000,000 FID

## FINAL TOKEN DISTRIBUTION CHECK
- Deployer / Initial Liquidity: 2,000,000 FID
- Liquidity Reserve Vesting: 3,000,000 FID
- Ecosystem & Community Vesting: 3,000,000 FID
- Development Vesting: 1,000,000 FID
- Team Vesting: 1,000,000 FID
- Total Accounted Supply: 10,000,000 FID
- Final Read-Only Balance Check: PASS

## PRE-MAINNET SHA256 BASELINE

FIDURIS.sol
EB6AAF2CB2B6A17AF11B211E2371BB7A1DF43A85F5A80A35047BA7FD566FE027

TokenVesting.sol
64F9C00C5477C0313033C73B6999BB76D7B53969AB125CF6B0A7F73CF9277395

config.ts
39D894BA90BAF5DFE1EEDEA9178C55759B1EC13B508BA8AD52725C2336C38C0C

deploy-mainnet-token.ts
0B9A9A59D080E729F936DED9C4C4A11B146487EB9F5A5ADC02DE433956CDFDCE

deploy-mainnet-one-vesting.ts
1823146F3FB494D0EB261A0D5DFC7F55359F87EDA2252A802D7EAA77C4990A0D

hardhat.config.ts
2DAA6E68E688CB07D74D9A6E5104A956C9E048E1E1BF835A290F22EDE60C96ED

## MAINNET FUNDING SCRIPT BASELINE

fund-mainnet-one-vesting.ts
DCFB9A931C744F488CB054278422F15EEA13A522FEACE0DF0F1E39147F9B950B

## PRE-DEPLOY STATUS
- Fresh compile: PASS
- Hardhat tests: 40 PASS / 0 FAIL
- VS Code Problems: 0
- SHA256 baseline: 6 / 6 MATCH
- Mainnet signer safety switch: TESTED
- Mainnet deploy confirmation lock: TESTED
- Mainnet vesting confirmation lock: TESTED

## MAINNET STATUS
- FIDURIS token deployment performed: YES
- FIDURIS token post-deployment read-only checks: PASS
- FIDURIS Source Verification: VERIFIED
- Mainnet vesting deployments performed: YES
- Mainnet vesting source verification: VERIFIED
- Mainnet vesting pre-funding read-only checks: PASS
- Mainnet vesting funding performed: YES
- Mainnet vesting final balance checks: PASS
- Total vesting funding: 8,000,000 FID
- Initial-liquidity allocation used: 2,000,000 FID
- PancakeSwap Infinity liquidity created: YES
- UNCX V4 liquidity position lock created: YES (24 months)
- Mainnet BUY test: PASS
- Mainnet SELL test: PASS

## PANCAKESWAP INFINITY LIQUIDITY

- Network: BNB Chain Mainnet
- Pair: BNB / FID
- Pool type: PancakeSwap Infinity CLAMM
- Fee tier: 0.25%
- Range: Full Range
- Hooks: OFF
- Dynamic fee: OFF
- Initial liquidity: approximately 1 BNB + 2,000,000 FID
- Liquidity creation transaction:
  0x21f4b34f8bc2cdca644dc7f9b3d3517f38cd43c3e6fa9576fd036eaf9a93ec8d
- PancakeSwap position NFT: #1047417

## UNCX V4 LIQUIDITY LOCK

- Locker: UNCX V4
- Lock duration: 24 months
- Locker contract:
  0xd8c5BB7137021D93e70B7814C697BED303573b21
- Lock transaction:
  0x013697462504707858da08f80f1e319a798c723b9d31645c0d504bce0fb69424
- UNCX Lock NFT: #2
- Unlock timestamp: 1850411900
- Unlock date: 20 Aug 2028 19:18:20 UTC

## MAINNET TRADING TEST

- BUY TEST: PASS
- Buy input: 0.005 BNB
- Buy output: 9,925.008957775806440905 FID
- Buy transaction:
  0xddb5dc9a6f3b4d7d0bff3d0dae10161f35760527c734e86285b2f3db2217fe36

- Limited FID approval:
  0xd7d0f5b2aa79d4adaae1643df8205db968ae307d68f7fa5ad104c4953da71525
- Approved amount: 9,925.008957 FID

- SELL TEST: PASS
- Sell input: approximately 9,925.00895778 FID
- Sell output: approximately 0.0049751 BNB
- Sell transaction:
  0x3259b98244f1c32f2d62479fa8e491d2aacfb376edc7afc6a117885a14272292
