# FIDURIS Mainnet Test Report

**Network:** BNB Chain Mainnet  
**Chain ID:** 56  
**Token:** FIDURIS (FID)  
**Token Contract:** `0x60fabB10244037718b907De9ec7E17A622A8B482`  
**Report Date:** 20 August 2026

## 1. Purpose

This report records the final Mainnet deployment, vesting, liquidity, liquidity-lock, and live trading validation of the FIDURIS token on BNB Chain.

All checks and transactions documented in this report were performed against the canonical FIDURIS Mainnet deployment.
## 2. Token Deployment and Verification

The canonical FIDURIS token was successfully deployed on BNB Chain Mainnet.

**Contract Address:** `0x60fabB10244037718b907De9ec7E17A622A8B482`  
**Deployment Transaction:** `0xabf58d8b168c5082864c949a323b98768d4fef7745af43ac2ee7018b4a7e1758`  
**Block:** `116508865`  
**Deployment Time:** 17 August 2026, 18:02:18 UTC  
**Deployer:** `0xE03866829778214D33A66A3F0517cDE32De4293E`

Post-deployment read-only checks confirmed:

- Name: `FIDURIS`
- Symbol: `FID`
- Decimals: `18`
- Total Supply: `10,000,000 FID`
- Maximum Supply: fixed at `10,000,000 FID`
- Initial supply recipient: deployer wallet
- Additional minting after deployment: not available

The FIDURIS contract source code was successfully verified on BscScan.

**Token deployment result: PASS**  
**Source verification result: PASS**
## 3. Vesting Contracts

Four separate TokenVesting contracts were deployed on BNB Chain Mainnet for the vested FIDURIS allocations.

### 3.1 Liquidity Reserve

**Allocation:** `3,000,000 FID`  
**Vesting Contract:** `0xA633245e9De4542ff61b501702C0D1E86496ece7`  
**Deployment Transaction:** `0x101b371eaa097ead6535da36dfff1c2d2757015bcae4cfafc1123e31d03d9a67`  
**Block:** `116516440`  
**Deployment Time:** 17 August 2026, 18:59:07 UTC  
**Beneficiary:** `0xE03866829778214D33A66A3F0517cDE32De4293E`

**Start Timestamp:** `1786993146`  
**Duration:** `69,984,000 seconds`  
**Cliff:** `7,776,000 seconds`

The contract was successfully deployed and source-verified on BscScan.

**Liquidity Reserve vesting deployment result: PASS**  
**Source verification result: PASS**
### 3.2 Ecosystem & Community

**Allocation:** `3,000,000 FID`  
**Vesting Contract:** `0xfCD582DE365f1863430194082Babe6A0e8a2C2c4`  
**Deployment Transaction:** `0x949669bc652743e3e685a0da99a1b0357b9bcb32d1768a977b6aca43ae3cd72e`  
**Block:** `116520268`  
**Deployment Time:** 17 August 2026, 19:27:50 UTC  
**Beneficiary:** `0xE03866829778214D33A66A3F0517cDE32De4293E`

**Start Timestamp:** `1786994868`  
**Duration:** `124,416,000 seconds`  
**Cliff:** `7,776,000 seconds`

The contract was successfully deployed and source-verified on BscScan.

**Ecosystem & Community vesting deployment result: PASS**  
**Source verification result: PASS**
### 3.3 Development

**Allocation:** `1,000,000 FID`
**Vesting Contract:** `0x6E86aCaE9A77079Eb291B3f2FF5fb2f5ca0bd521`
**Deployment Transaction:** `0xa44d763fc4948f2a69e03905990c7a14437b7a0dae11aadac6ab0332c0ab8ba3`
**Block:** `116524929`
**Deployment Time:** 17 August 2026, 20:02:49 UTC
**Beneficiary:** `0xE03866829778214D33A66A3F0517cDE32De4293E`

**Start Timestamp:** `1786996967`
**Duration:** `124,416,000 seconds`
**Cliff:** `7,776,000 seconds`

The contract was successfully deployed and source-verified on BscScan.

**Development vesting deployment result: PASS**
**Source verification result: PASS**
### 3.4 Team

**Allocation:** `1,000,000 FID`  
**Vesting Contract:** `0x3032d2cf76cEE36D9b5e9D1A27E5F114fFBc1384`  
**Deployment Transaction:** `0x2fdaef530e9fb29c384eefe953567b66c8106393eb3080687ef85801ed1afaca`  
**Block:** `116528879`  
**Deployment Time:** 17 August 2026, 20:32:26 UTC  
**Beneficiary:** `0xE03866829778214D33A66A3F0517cDE32De4293E`

**Start Timestamp:** `1786998744`  
**Duration:** `155,520,000 seconds`  
**Cliff:** `31,104,000 seconds`

The contract was successfully deployed and source-verified on BscScan.

**Team vesting deployment result: PASS**  
**Source verification result: PASS**
## 4. Pre-Funding Vesting Verification

Before transferring any FID to the vesting contracts, a consolidated read-only Mainnet verification was performed.

The check confirmed:

- Deployer balance: `10,000,000 FID`
- Liquidity Reserve vesting balance: `0 FID`
- Ecosystem & Community vesting balance: `0 FID`
- Development vesting balance: `0 FID`
- Team vesting balance: `0 FID`

All four vesting contracts reported the expected beneficiary/owner:

`0xE03866829778214D33A66A3F0517cDE32De4293E`

The vesting schedule parameters read directly from Mainnet matched the intended deployment parameters for all four contracts.

No FID had been transferred to any vesting contract at the time of this verification.

**Pre-funding vesting verification result: PASS**
## 5. Vesting Funding

After the pre-funding verification passed, the four vesting contracts were funded individually using the guarded Mainnet funding procedure.

### 5.1 Liquidity Reserve Funding

**Amount:** `3,000,000 FID`
**Target Contract:** `0xA633245e9De4542ff61b501702C0D1E86496ece7`
**Funding Transaction:** `0xb11c989be17e737fec2326c424b51b5a1bcda3adeb30907abe489659fa30140d`

The funding execution confirmed:

* Target balance before: `0 FID`
* Deployer balance before: `10,000,000 FID`
* Transaction receipt: successful
* Target balance after: `3,000,000 FID`
* Deployer balance after: `7,000,000 FID`

**Liquidity Reserve funding result: PASS**
### 5.2 Ecosystem & Community Funding

**Amount:** `3,000,000 FID`
**Target Contract:** `0xfCD582DE365f1863430194082Babe6A0e8a2C2c4`
**Funding Transaction:** `0xa51c9962d9c823b14bc29cfd39e3586c32790551e5cbf77e8b75111d3b1e32cf`

The funding execution confirmed:

* Target balance before: `0 FID`
* Deployer balance before: `7,000,000 FID`
* Transaction receipt: successful
* Target balance after: `3,000,000 FID`
* Deployer balance after: `4,000,000 FID`

**Ecosystem & Community funding result: PASS**
### 5.3 Development Funding

**Amount:** `1,000,000 FID`
**Target Contract:** `0x6E86aCaE9A77079Eb291B3f2FF5fb2f5ca0bd521`
**Funding Transaction:** `0xaa252c9c1bf024850b0aa0c87c95a4990e1b80edfdbe94134a891a4d753ec54c`

The funding execution confirmed:

* Target balance before: `0 FID`
* Deployer balance before: `4,000,000 FID`
* Transaction receipt: successful
* Target balance after: `1,000,000 FID`
* Deployer balance after: `3,000,000 FID`

**Development funding result: PASS**
### 5.4 Team Funding

**Amount:** `1,000,000 FID`
**Target Contract:** `0x3032d2cf76cEE36D9b5e9D1A27E5F114fFBc1384`
**Funding Transaction:** `0x85f656a15126cdcdc892181dc4627070a4d3f85df2bcd81136b1122f62f40925`

The funding execution confirmed:

* Target balance before: `0 FID`
* Deployer balance before: `3,000,000 FID`
* Transaction receipt: successful
* Target balance after: `1,000,000 FID`
* Deployer balance after: `2,000,000 FID`

**Team funding result: PASS**
## 6. Final Vesting Balance Verification

After all four vesting contracts were funded, a final read-only Mainnet balance verification was performed.

The final balances were:

* Deployer wallet: `2,000,000 FID`
* Liquidity Reserve vesting: `3,000,000 FID`
* Ecosystem & Community vesting: `3,000,000 FID`
* Development vesting: `1,000,000 FID`
* Team vesting: `1,000,000 FID`

**Total accounted supply:** `10,000,000 FID`

The full fixed token supply was accounted for exactly.

The remaining `2,000,000 FID` in the deployer wallet represented the allocation reserved for initial Mainnet liquidity.

**Final vesting balance verification result: PASS**
## 7. PancakeSwap Infinity Mainnet Liquidity

Initial FIDURIS liquidity was successfully created on PancakeSwap Infinity on BNB Chain Mainnet.

**Liquidity Transaction:** `0x21f4b34f8bc2cdca644dc7f9b3d3517f38cd43c3e6fa9576fd036eaf9a93ec8d`
**Block:** `116898038`
**Transaction Time:** 19 August 2026, 18:41:46 UTC

**Pool Type:** PancakeSwap Infinity CLAMM
**Pair:** BNB / FID
**Fee:** `0.25%` static
**Range:** Full Range
**Hooks:** Off
**Dynamic Fee:** Off
**Initial Price:** `2,000,000 FID per 1 BNB`

Actual liquidity deposited:

* BNB: `0.999999999999999924 BNB`
* FID: `1,999,999.999999999999998985 FID`

The liquidity position was represented by:

**PancakeSwap Infinity Position NFT:** `#1047417`

The position NFT was initially minted to the FIDURIS deployer wallet:

`0xE03866829778214D33A66A3F0517cDE32De4293E`

**PancakeSwap Infinity liquidity creation result: PASS**
## 8. UNCX V4 Liquidity Lock

The PancakeSwap Infinity liquidity position was successfully locked using UNCX V4 on BNB Chain Mainnet.

**Lock Transaction:** `0x013697462504707858da08f80f1e319a798c723b9d31645c0d504bce0fb69424`
**Block:** `116910337`
**Transaction Time:** 19 August 2026, 20:14:02 UTC
**UNCX V4 Locker Contract:** `0xd8c5BB7137021D93e70B7814C697BED303573b21`

**PancakeSwap Position NFT:** `#1047417`
**UNCX V4 Lock NFT:** `#2`
**Lock Duration:** `24 months`
**Unlock Timestamp:** `1850411900`
**Unlock Time:** 20 August 2028, 19:18:20 UTC

The PancakeSwap Infinity Position NFT `#1047417` was transferred from the FIDURIS deployer wallet into the UNCX V4 locker.

UNCX V4 Lock NFT `#2` was minted to the FIDURIS wallet.

Decoded lock parameters confirmed:

* Token ID: `1047417`
* Unlock timestamp: `1850411900`
* Mint Lock NFT: `true`

UNCX charged:

* Flat lock fee: `0.2 BNB`
* LP position fee: `1%`
* Approximate LP fee component: `0.01 BNB` and `20,000 FID`

Approximately `99%` of the original liquidity position remained locked after the UNCX LP-position fee.

**UNCX V4 liquidity lock result: PASS**
## 9. Live Mainnet BUY Test

A small real Mainnet buy test was performed from a separate wallet to confirm that FID could be purchased normally through the live PancakeSwap Infinity liquidity.

**Buy Transaction:** `0xddb5dc9a6f3b4d7d0bff3d0dae10161f35760527c734e86285b2f3db2217fe36`
**Block:** `116915419`
**Input:** `0.005 BNB`
**FID Received:** `9,925.008957775806440905 FID`

The transaction was routed through the PancakeSwap Universal Router:

`0xd9C500DfF816a1Da21A48A732d3498Bf09dc9AEB`

The transaction completed successfully and the purchased FID was received by the test wallet.

This confirmed that the live Mainnet pool accepted a normal BNB-to-FID purchase.

**Mainnet BUY test result: PASS**
## 10. Limited Approval and Live Mainnet SELL Test

Before the sell test, the test wallet approved only the required FID amount instead of granting an unlimited token allowance.

**Approval Transaction:** `0xd7d0f5b2aa79d4adaae1643df8205db968ae307d68f7fa5ad104c4953da71525`
**Approved Amount:** `9,925.008957 FID`
**Spender:** `0x40A1Fe393A7F566F27dF6acE18e6773be844dAfc`

After the limited approval succeeded, the purchased FID was sold back through the live Mainnet liquidity.

**Sell Transaction:** `0x3259b98244f1c32f2d62479fa8e491d2aacfb376edc7afc6a117885a14272292`

MetaMask confirmed approximately:

* FID sent: `9,925.00895778 FID`
* BNB received: `0.0049751 BNB`

The sell transaction completed successfully.

This confirmed that FID could be both purchased and sold normally through the live PancakeSwap Infinity Mainnet liquidity.

**Limited approval result: PASS**
**Mainnet SELL test result: PASS**
**Mainnet round-trip trading test result: PASS**
## 11. Final Mainnet Test Result

The complete FIDURIS Mainnet deployment and validation process was completed successfully.

Final verified status:

* FIDURIS token deployment: **PASS**
* Token source verification: **PASS**
* Token post-deployment checks: **PASS**
* Liquidity Reserve vesting deployment and verification: **PASS**
* Ecosystem & Community vesting deployment and verification: **PASS**
* Development vesting deployment and verification: **PASS**
* Team vesting deployment and verification: **PASS**
* Pre-funding vesting verification: **PASS**
* Liquidity Reserve funding: **PASS**
* Ecosystem & Community funding: **PASS**
* Development funding: **PASS**
* Team funding: **PASS**
* Final vesting balance verification: **PASS**
* PancakeSwap Infinity liquidity creation: **PASS**
* UNCX V4 liquidity lock: **PASS**
* Live Mainnet BUY test: **PASS**
* Limited token approval: **PASS**
* Live Mainnet SELL test: **PASS**
* Mainnet round-trip trading validation: **PASS**

The full fixed supply of `10,000,000 FID` was accounted for, the intended vesting allocations were funded, Mainnet liquidity was successfully created and locked, and real buy and sell transactions completed successfully.

**FINAL MAINNET TEST RESULT: PASS**

