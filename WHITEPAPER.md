# FIDURIS Whitepaper
**Version:** 1.0
**Network:** BNB Chain
**Token:** FIDURIS
**Symbol:** FID
**Maximum Supply:** 10,000,000 FID
**Token Contract:** `0x60fabB10244037718b907De9ec7E17A622A8B482`

---

## 1. Introduction

FIDURIS is a blockchain project built on BNB Chain with a focus on simplicity, clear structure, long-term development, and publicly verifiable on-chain information.

The FIDURIS token (FID) has a fixed maximum supply of 10,000,000 tokens. Its core token contract was intentionally designed without transfer taxes, blacklist functions, pause controls, additional minting, reflections, or hidden trading restrictions.

The project separates the core token from vesting and liquidity-management mechanisms. Allocations designated for the Liquidity Reserve, Ecosystem & Community, Development, and Team are managed through separate on-chain vesting contracts, allowing their schedules and balances to be independently verified.

Initial liquidity was created on PancakeSwap Infinity on BNB Chain and the resulting liquidity position was locked through UNCX V4. Real Mainnet buy and sell transactions were subsequently completed to verify normal token trading.

FIDURIS is intended to develop progressively rather than rely on speculative promises. Future ecosystem features, integrations, community initiatives, or utilities will be introduced only when they can be realistically developed, tested, and supported.

The project does not promise token price appreciation, investment returns, exchange listings, or guaranteed future utility.

The guiding principle of FIDURIS is:

**Clear by Design. Verifiable On-Chain.**

## 2. Project Principles
FIDURIS is built around a small set of principles intended to keep the project understandable, verifiable, and technically simple.

### Simplicity

The core FID token contract avoids unnecessary mechanisms that can make token behavior difficult to understand or verify. FIDURIS does not use transfer taxes, reflections, automatic liquidity functions, blacklist controls, hidden trading restrictions, or additional minting.

### Fixed Supply

The maximum supply is permanently limited to `10,000,000 FID`. The full supply was created at deployment, and the token contract does not provide a mechanism for creating additional FID.

### Separation of Responsibilities

The token contract is kept separate from vesting and liquidity-management mechanisms. Vesting allocations are held in dedicated on-chain vesting contracts rather than being controlled through custom logic inside the FID token itself.

### Verifiability

Important project information should be independently verifiable wherever possible. Token supply, contract code, vesting balances, vesting schedules, liquidity transactions, and liquidity-lock information are recorded on BNB Chain.

### Progressive Development

FIDURIS does not assume that every future feature must exist from the beginning. Ecosystem functionality may be developed progressively based on technical feasibility, project needs, and genuine community participation.

### No Price Promises

FIDURIS does not make promises regarding token price, returns, future market value, exchange listings, or profitability.

The project is intended to be evaluated through its structure, execution, development, and publicly verifiable information rather than speculative claims.

## 3. FIDURIS Token
FIDURIS (FID) is a BEP-20 token deployed on BNB Chain Mainnet.

The canonical token parameters are:

* **Name:** FIDURIS
* **Symbol:** FID
* **Network:** BNB Chain Mainnet
* **Chain ID:** `56`
* **Decimals:** `18`
* **Total Supply:** `10,000,000 FID`
* **Maximum Supply:** `10,000,000 FID`
* **Token Contract:** `0x60fabB10244037718b907De9ec7E17A622A8B482`

The full supply of `10,000,000 FID` was created during deployment. The deployed contract does not provide a mechanism for minting additional FID.

The token was deployed on 17 August 2026 and its source code was subsequently verified on BscScan.

**Deployment Transaction:**
`0xabf58d8b168c5082864c949a323b98768d4fef7745af43ac2ee7018b4a7e1758`

The FIDURIS Mainnet deployment was tested after deployment and the token parameters were confirmed directly on-chain.

## 4. Token Design
The FIDURIS token contract was intentionally designed to remain simple, predictable, and easy to verify.

The core token does not depend on complex trading mechanics or discretionary controls. Its primary purpose is to provide standard BEP-20 token functionality while keeping allocation management and vesting outside the token contract.

The FID token design includes:

* **Fixed supply:** `10,000,000 FID`
* **Decimals:** `18`
* **Additional minting:** None
* **Transfer tax:** None
* **Buy tax:** None
* **Sell tax:** None
* **Blacklist functionality:** None
* **Pause functionality:** None
* **Reflections:** None
* **Automatic liquidity mechanisms:** None
* **Anti-whale or maximum-wallet restrictions:** None
* **Hidden buy or sell restrictions:** None

This design reduces the number of mechanisms that can unexpectedly alter normal token transfers.

Vesting is handled through separate on-chain contracts rather than being embedded into the FID token. This separation keeps the core token logic simpler while allowing each vested allocation to have its own independently verifiable schedule and balance.

The project may build additional ecosystem functionality around FIDURIS in the future, but such functionality does not require changing the fixed supply or introducing hidden transfer controls into the existing token contract.

## 5. Tokenomics
FIDURIS has a fixed total and maximum supply of `10,000,000 FID`.

The supply is allocated as follows:

| Allocation            |            FID | Percentage |
| --------------------- | -------------: | ---------: |
| Initial Liquidity     |      2,000,000 |        20% |
| Liquidity Reserve     |      3,000,000 |        30% |
| Ecosystem & Community |      3,000,000 |        30% |
| Development           |      1,000,000 |        10% |
| Team                  |      1,000,000 |        10% |
| **Total**             | **10,000,000** |   **100%** |

The `2,000,000 FID` Initial Liquidity allocation was designated for establishing the initial FID/BNB liquidity position.

The remaining `8,000,000 FID`, representing `80%` of the total supply, was allocated to four separate on-chain vesting contracts:

* `3,000,000 FID` — Liquidity Reserve
* `3,000,000 FID` — Ecosystem & Community
* `1,000,000 FID` — Development
* `1,000,000 FID` — Team

These allocations are not held as freely available balances in ordinary project wallets at launch. They were transferred to dedicated vesting contracts with defined schedules.

Vesting determines when tokens become available for release. It does not automatically spend, sell, or deploy vested tokens.

The Liquidity Reserve is intended by project policy to support future liquidity requirements on decentralized or centralized exchanges. This intended use is a project policy and is not enforced by the current vesting contract itself.

Ecosystem & Community and Development allocations are intended to support future project development, integrations, community initiatives, infrastructure, and other legitimate ecosystem needs as they arise.

The Team allocation follows a stricter vesting schedule intended to align access to team tokens with longer-term project development.

## 6. Vesting Structure
FIDURIS uses separate on-chain vesting contracts for the Liquidity Reserve, Ecosystem & Community, Development, and Team allocations.

The vesting contracts are based on OpenZeppelin `VestingWalletCliff`.

Under this implementation, no tokens are vested before the configured cliff timestamp. When the cliff is reached, the contract applies the underlying linear vesting schedule calculated from the original vesting start time. As a result, a proportional amount becomes vested immediately at the cliff, after which vesting continues linearly until the end of the configured duration.

This behavior is determined by the deployed smart contracts and can be independently verified on-chain.

Vested tokens are not automatically transferred or spent. A vested amount only becomes eligible for release according to the contract rules.

### 6.1 Liquidity Reserve
The Liquidity Reserve allocation contains:

**Allocation:** `3,000,000 FID`
**Vesting Contract:** `0xA633245e9De4542ff61b501702C0D1E86496ece7`

Deployed vesting parameters:

* **Start Timestamp:** `1786993146`
* **Total Duration:** `69,984,000 seconds`
* **Equivalent Duration:** `810 days` (`27 × 30 days`)
* **Cliff:** `7,776,000 seconds`
* **Equivalent Cliff:** `90 days` (`3 × 30 days`)

No FID is vested before the 90-day cliff.

At the cliff, approximately `333,333.33 FID` becomes vested because the underlying linear vesting calculation is measured from the original start timestamp.

After the cliff, vesting continues linearly until the end of the 810-day total duration.

The Liquidity Reserve is intended by project policy only for supporting future liquidity requirements on decentralized or centralized exchanges.

This intended use is not enforced by the vesting contract itself. The vesting contract controls when tokens become eligible for release, not how released tokens are subsequently used.

### 6.2 Ecosystem & Community
The Ecosystem & Community allocation contains:

**Allocation:** `3,000,000 FID`
**Vesting Contract:** `0xfCD582DE365f1863430194082Babe6A0e8a2C2c4`

Deployed vesting parameters:

* **Start Timestamp:** `1786994868`
* **Total Duration:** `124,416,000 seconds`
* **Equivalent Duration:** `1,440 days` (`48 × 30 days`)
* **Cliff:** `7,776,000 seconds`
* **Equivalent Cliff:** `90 days` (`3 × 30 days`)

No FID is vested before the 90-day cliff.

At the cliff, `187,500 FID` becomes vested because the underlying linear vesting calculation is measured from the original start timestamp.

After the cliff, vesting continues linearly until the end of the 1,440-day total duration.

The Ecosystem & Community allocation is intended to support legitimate ecosystem and community-related development, including future integrations, infrastructure, community initiatives, incentives, grants, applications, utilities, and other project needs.

Vested tokens are not automatically released or spent. The vesting contract determines when tokens become eligible for release; actual use remains subject to project decisions and publicly stated policies.

### 6.3 Development
The Development allocation contains:

**Allocation:** `1,000,000 FID`
**Vesting Contract:** `0x6E86aCaE9A77079Eb291B3f2FF5fb2f5ca0bd521`

Deployed vesting parameters:

* **Start Timestamp:** `1786996967`
* **Total Duration:** `124,416,000 seconds`
* **Equivalent Duration:** `1,440 days` (`48 × 30 days`)
* **Cliff:** `7,776,000 seconds`
* **Equivalent Cliff:** `90 days` (`3 × 30 days`)

No FID is vested before the 90-day cliff.

At the cliff, `62,500 FID` becomes vested because the underlying linear vesting calculation is measured from the original start timestamp.

After the cliff, vesting continues linearly until the end of the 1,440-day total duration.

The Development allocation is intended to support technical development, infrastructure, integrations, maintenance, security work, applications, tools, and other legitimate development requirements of the FIDURIS project.

Vested tokens are not automatically released or spent. The vesting contract determines when tokens become eligible for release; actual use remains subject to project decisions and publicly stated policies.

### 6.4 Team
The Team allocation contains:

**Allocation:** `1,000,000 FID`
**Vesting Contract:** `0x3032d2cf76cEE36D9b5e9D1A27E5F114fFBc1384`

Deployed vesting parameters:

* **Start Timestamp:** `1786998744`
* **Total Duration:** `155,520,000 seconds`
* **Equivalent Duration:** `1,800 days` (`60 × 30 days`)
* **Cliff:** `31,104,000 seconds`
* **Equivalent Cliff:** `360 days` (`12 × 30 days`)

No FID is vested before the 360-day cliff.

At the cliff, `200,000 FID` becomes vested because the underlying linear vesting calculation is measured from the original start timestamp.

After the cliff, vesting continues linearly until the end of the 1,800-day total duration.

The Team allocation uses the longest cliff period among the FIDURIS vested allocations. This structure is intended to align access to team tokens with longer-term participation in the project.

Vested tokens are not automatically released or spent. The vesting contract determines when tokens become eligible for release.

## 7. Liquidity Structure
Initial FIDURIS liquidity was established on PancakeSwap Infinity on BNB Chain Mainnet.

The liquidity configuration was:

* **Pair:** BNB / FID
* **Pool Type:** PancakeSwap Infinity CLAMM
* **Fee:** `0.25%` static
* **Range:** Full Range
* **Hooks:** Off
* **Dynamic Fee:** Off
* **Initial Reference Price:** `2,000,000 FID per 1 BNB`

The initial liquidity transaction deposited approximately:

* `0.999999999999999924 BNB`
* `1,999,999.999999999999998985 FID`

**Liquidity Creation Transaction:**
`0x21f4b34f8bc2cdca644dc7f9b3d3517f38cd43c3e6fa9576fd036eaf9a93ec8d`

The resulting PancakeSwap Infinity liquidity position was represented by:

**Position NFT:** `#1047417`

After the liquidity position was created, it was locked using UNCX V4 on BNB Chain.

**UNCX V4 Locker Contract:**
`0xd8c5BB7137021D93e70B7814C697BED303573b21`

**Liquidity Lock Transaction:**
`0x013697462504707858da08f80f1e319a798c723b9d31645c0d504bce0fb69424`

The lock configuration includes:

* **Locked Position NFT:** `#1047417`
* **UNCX V4 Lock NFT:** `#2`
* **Configured Lock Period:** approximately `24 months`
* **Unlock Timestamp:** `1850411900`
* **Unlock Time:** `20 August 2028, 19:18:20 UTC`

During the locking process, UNCX charged a `0.2 BNB` flat fee together with a `1%` fee from the liquidity position. The LP-position fee represented approximately `0.01 BNB` and `20,000 FID`.

Approximately `99%` of the original liquidity position remained locked after the UNCX position fee.

The project intends to review the liquidity structure and available PancakeSwap technology before the lock expires. Any extension, relock, or migration should be completed before the existing lock expires when continued liquidity locking is appropriate.

## 8. Security and Technical Verification
FIDURIS was developed with an emphasis on keeping the core token contract simple and reducing unnecessary administrative or trading controls.

The FIDURIS token contract and the deployed vesting contracts have publicly verified source code on BscScan, allowing the deployed bytecode and contract logic to be independently inspected.

Before Mainnet deployment, the project used automated testing and deployment checks to validate the token and vesting logic.

After Mainnet deployment, additional read-only and live transaction checks were performed.

The Mainnet verification process included:

* Confirmation of the FIDURIS token name, symbol, decimals, and total supply
* Confirmation that the full fixed supply equals `10,000,000 FID`
* Verification of the deployed token contract source code
* Verification of the four deployed vesting contract source codes
* Confirmation of vesting contract owners, schedules, and balances
* Verification that the four vesting allocations were funded with exactly `8,000,000 FID`
* Verification that the remaining `2,000,000 FID` allocation was used for initial liquidity
* Successful creation of PancakeSwap Infinity Mainnet liquidity
* Successful locking of the liquidity position through UNCX V4
* Successful live Mainnet BUY transaction
* Successful limited token approval
* Successful live Mainnet SELL transaction
* Successful verification of all documented Mainnet transaction receipts

A dedicated Mainnet validation record is maintained in:

`MAINNET_TEST_REPORT.md`

The finalized report records `14` unique Mainnet transaction hashes, all of which were checked and returned successful transaction receipt status `0x1`.

The finalized SHA-256 fingerprint of that report is:

`E6B20288BEBAE92895AF5D377556048966FE1277F232AB0C327A4F5C598155ED`

This fingerprint can be used to detect subsequent modifications to the finalized report.

These verification procedures reduce operational uncertainty, but they do not eliminate smart-contract, blockchain, wallet, exchange, market, infrastructure, or human risks.

FIDURIS does not claim that testing or source-code verification is equivalent to a formal independent security audit.

## 9. Transparency and On-Chain Verification
FIDURIS is structured so that important technical and allocation information can be independently checked through public blockchain data.

The project uses the principle:

**Clear by Design. Verifiable On-Chain.**

Where practical, public project documentation should correspond directly with the deployed Mainnet contracts and recorded transactions.

Information that can be independently verified includes:

* FIDURIS token contract and fixed supply
* Verified token source code
* Vesting contract addresses
* Verified vesting contract source code
* Vesting balances and schedules
* Token funding transactions
* Initial liquidity creation
* PancakeSwap Infinity liquidity position
* UNCX V4 liquidity lock
* Liquidity unlock timestamp
* Mainnet BUY and SELL test transactions
* Other documented Mainnet transaction hashes

The canonical FIDURIS token contract is:

`0x60fabB10244037718b907De9ec7E17A622A8B482`

The four canonical vesting contracts are:

* **Liquidity Reserve:** `0xA633245e9De4542ff61b501702C0D1E86496ece7`
* **Ecosystem & Community:** `0xfCD582DE365f1863430194082Babe6A0e8a2C2c4`
* **Development:** `0x6E86aCaE9A77079Eb291B3f2FF5fb2f5ca0bd521`
* **Team:** `0x3032d2cf76cEE36D9b5e9D1A27E5F114fFBc1384`

Public documentation is intended to distinguish clearly between facts enforced by smart contracts and project policies that are not technically enforced on-chain.

For example, vesting contracts enforce when tokens become eligible for release, but they do not enforce the purpose for which released tokens are subsequently used. Statements about intended allocation use are therefore identified as project policy rather than smart-contract restrictions.

FIDURIS will not describe an off-chain policy as an on-chain guarantee.

Where the project changes future operational plans, public documentation should be updated without rewriting or misrepresenting historical on-chain activity.

## 10. Ecosystem and Future Development
FIDURIS is intended to develop progressively rather than launch with artificial or unfinished utility claims.

The initial phase of the project focuses on establishing a technically functional and publicly verifiable foundation. This includes the token contract, vesting structure, liquidity, liquidity locking, Mainnet trading validation, documentation, and public project infrastructure.

Future development may include areas such as:

* Educational tools and blockchain-related content
* Community participation mechanisms
* Task or contribution-based ecosystem initiatives
* Applications or mini-apps that integrate FID
* Community rewards for legitimate participation or completed activities
* Technical integrations with compatible blockchain services
* Additional decentralized exchange liquidity where appropriate
* Centralized exchange integration if technically, legally, and economically justified
* Other utilities developed in response to genuine project or community needs

These items represent possible development directions and should not be interpreted as guaranteed features or commitments.

New functionality should be introduced only when it can be realistically developed, tested, maintained, and documented.

The Ecosystem & Community and Development allocations exist to provide resources for legitimate future project needs, but the availability of vested tokens does not require those tokens to be spent.

Unused vested tokens may remain unreleased until there is a justified project requirement.

FIDURIS does not require continuous expansion for the appearance of activity. Development should prioritize useful, sustainable, and technically supportable features over unnecessary complexity.

Future changes to the ecosystem should not alter the fixed `10,000,000 FID` maximum supply or misrepresent the behavior of the deployed token contract.

## 11. Project Roadmap
FIDURIS follows a progressive roadmap in which completed technical work is separated from future development objectives.

### Phase 1 — Core Infrastructure — Completed

The initial technical foundation of FIDURIS has been completed on BNB Chain Mainnet.

Completed work includes:

- FIDURIS token development and testing
- Mainnet token deployment
- BscScan source-code verification
- Deployment of four dedicated vesting contracts
- Funding of the vesting contracts with `8,000,000 FID`
- Initial PancakeSwap Infinity liquidity creation
- UNCX V4 liquidity-position lock
- Live Mainnet BUY test
- Live Mainnet SELL test
- Mainnet deployment and transaction verification
- Finalization of the Mainnet technical test report

### Phase 2 — Public Project Infrastructure

The next phase focuses on establishing the official public infrastructure of FIDURIS.

Planned work includes:

- Finalization and publication of the FIDURIS Whitepaper
- Public GitHub repository and technical documentation
- Official project website
- BscScan token metadata and public project information
- Official project communication channels
- Clear public access to contract, vesting, liquidity, and lock information

### Phase 3 — Community and Ecosystem Development

After the public infrastructure is established, development may expand according to genuine project and community needs.

Potential areas include:

- Blockchain education initiatives
- Community participation mechanisms
- FID-integrated applications or mini-apps
- Contribution or task-based ecosystem programs
- Community incentives and legitimate reward programs
- Technical integrations and additional ecosystem utilities

Development in this phase will depend on technical feasibility, available resources, project requirements, and genuine community participation.

### Phase 4 — Long-Term Infrastructure and Liquidity Review

FIDURIS intends to periodically review its technical infrastructure as blockchain technology evolves.

This includes:

- Reviewing PancakeSwap and BNB Chain infrastructure
- Monitoring the existing liquidity-lock timeline
- Reviewing liquidity requirements before the current lock expires
- Extending, relocking, or migrating liquidity when technically appropriate
- Evaluating additional DEX or CEX integrations when justified
- Maintaining and improving public technical documentation

No roadmap item represents a promise of token price, financial return, exchange listing, or guaranteed completion by a specific date.

The roadmap may evolve as the project develops, but historical on-chain information and completed milestones will not be rewritten or misrepresented.
## 12. Risks
FIDURIS operates on public blockchain infrastructure and involves technical, operational, market, and regulatory risks. No technical design, vesting structure, liquidity lock, or verification process can eliminate these risks.

Users should independently evaluate the project and understand the risks associated with blockchain-based assets before interacting with FID.

Key risks include:

- **Market Risk:** The market value of FID may rise, fall substantially, or become highly volatile. There is no guaranteed market value, liquidity level, or demand.
- **Liquidity Risk:** Available liquidity may be insufficient for certain transactions, particularly larger trades. Trading activity can materially affect execution price and slippage.
- **Smart-Contract Risk:** Although the token and vesting contracts were tested and source-verified, undiscovered software defects, dependency issues, or unexpected blockchain interactions may still exist.
- **Third-Party Protocol Risk:** FIDURIS relies on external infrastructure including BNB Chain, PancakeSwap, UNCX, wallets, RPC providers, block explorers, and other services. Failures or changes affecting these systems may affect FIDURIS.
- **Wallet and Key Risk:** Loss, theft, compromise, or misuse of private keys can result in irreversible loss of blockchain assets or control.
- **Blockchain Risk:** Network congestion, chain reorganizations, software changes, validator issues, outages, transaction failures, or changes to BNB Chain may affect the project.
- **Liquidity-Lock Risk:** A liquidity lock restricts access to the locked position until its configured unlock time, but it does not guarantee permanent liquidity, token value, trading volume, or future relocking.
- **Vesting Risk:** Vesting contracts control when allocated tokens become eligible for release. Once released, their subsequent use is not technically restricted by the current vesting contracts.
- **Operational Risk:** Human error, incorrect transactions, configuration mistakes, compromised accounts, or failures in project operations may cause losses or disruption.
- **Regulatory Risk:** Laws, regulations, tax treatment, exchange requirements, and rules relating to blockchain assets may change and may differ between jurisdictions.
- **Exchange Risk:** There is no guarantee that FID will be listed, remain listed, or maintain trading availability on any decentralized or centralized exchange.
- **Development Risk:** Planned or potential ecosystem features may be delayed, changed, reduced, or never implemented.
- **Adoption Risk:** There is no guarantee that FIDURIS will achieve community adoption, ecosystem usage, integrations, trading activity, or long-term continuation.

Past technical completion, successful Mainnet transactions, source-code verification, and liquidity locking do not guarantee future performance or project success.

Participation in FIDURIS involves uncertainty and users remain responsible for their own decisions and for independently verifying publicly available information.
## 13. Legal and Educational Disclaimer
This Whitepaper is provided for general informational and educational purposes regarding the FIDURIS project and its technical structure.

Nothing in this document constitutes financial, investment, legal, tax, accounting, or other professional advice.

FIDURIS does not promise or guarantee:

- Profit or investment returns
- Token price appreciation
- A minimum or stable market value
- Future trading volume or liquidity
- Listing on any decentralized or centralized exchange
- Completion of every potential roadmap item
- Adoption, integrations, partnerships, or ecosystem growth

FID is a blockchain-based digital token. Acquiring, holding, transferring, or interacting with blockchain assets involves significant risk, including the possibility of losing some or all economic value associated with those assets.

The legal and regulatory classification of digital assets may vary between jurisdictions and may change over time. Users are responsible for understanding and complying with laws, regulations, tax obligations, and restrictions applicable to them.

Nothing in this Whitepaper should be interpreted as a representation that FID has any particular legal or regulatory classification in every jurisdiction.

The FIDURIS project does not provide individualized investment recommendations and does not encourage users to acquire FID based on expectations of profit.

Any decision to interact with FIDURIS should be made independently and based on the user's own research, risk assessment, and circumstances.

Public blockchain transactions are generally irreversible. Users are responsible for wallet security, private-key security, transaction verification, and confirming that they are interacting with the correct contract addresses.

Technical information in this Whitepaper is intended to reflect the deployed FIDURIS Mainnet contracts and documented project structure at the time of publication. Where future changes occur, updated documentation may be published.

On-chain historical records remain authoritative for transactions and deployed contract state.
## 14. Official On-Chain References
The following addresses and transaction hashes are the canonical Mainnet references for FIDURIS on BNB Chain.

**Network:** BNB Chain Mainnet  
**Chain ID:** `56`

### FIDURIS Token

**Token Contract:**  
`0x60fabB10244037718b907De9ec7E17A622A8B482`

**Token Deployment Transaction:**  
`0xabf58d8b168c5082864c949a323b98768d4fef7745af43ac2ee7018b4a7e1758`

### Vesting Contracts

**Liquidity Reserve Vesting Contract:**  
`0xA633245e9De4542ff61b501702C0D1E86496ece7`

**Liquidity Reserve Deployment Transaction:**  
`0x101b371eaa097ead6535da36dfff1c2d2757015bcae4cfafc1123e31d03d9a67`

**Liquidity Reserve Funding Transaction:**  
`0xb11c989be17e737fec2326c424b51b5a1bcda3adeb30907abe489659fa30140d`

**Ecosystem & Community Vesting Contract:**  
`0xfCD582DE365f1863430194082Babe6A0e8a2C2c4`

**Ecosystem & Community Deployment Transaction:**  
`0x949669bc652743e3e685a0da99a1b0357b9bcb32d1768a977b6aca43ae3cd72e`

**Ecosystem & Community Funding Transaction:**  
`0xa51c9962d9c823b14bc29cfd39e3586c32790551e5cbf77e8b75111d3b1e32cf`

**Development Vesting Contract:**  
`0x6E86aCaE9A77079Eb291B3f2FF5fb2f5ca0bd521`

**Development Deployment Transaction:**  
`0xa44d763fc4948f2a69e03905990c7a14437b7a0dae11aadac6ab0332c0ab8ba3`

**Development Funding Transaction:**  
`0xaa252c9c1bf024850b0aa0c87c95a4990e1b80edfdbe94134a891a4d753ec54c`

**Team Vesting Contract:**  
`0x3032d2cf76cEE36D9b5e9D1A27E5F114fFBc1384`

**Team Deployment Transaction:**  
`0x2fdaef530e9fb29c384eefe953567b66c8106393eb3080687ef85801ed1afaca`

**Team Funding Transaction:**  
`0x85f656a15126cdcdc892181dc4627070a4d3f85df2bcd81136b1122f62f40925`

### Liquidity and Lock

**PancakeSwap Infinity Liquidity Creation Transaction:**  
`0x21f4b34f8bc2cdca644dc7f9b3d3517f38cd43c3e6fa9576fd036eaf9a93ec8d`

**PancakeSwap Infinity Position NFT:** `#1047417`

**UNCX V4 Locker Contract:**  
`0xd8c5BB7137021D93e70B7814C697BED303573b21`

**UNCX V4 Liquidity Lock Transaction:**  
`0x013697462504707858da08f80f1e319a798c723b9d31645c0d504bce0fb69424`

**UNCX V4 Lock NFT:** `#2`

**Liquidity Unlock Timestamp:** `1850411900`

### Mainnet Trading Validation

**BUY Test Transaction:**  
`0xddb5dc9a6f3b4d7d0bff3d0dae10161f35760527c734e86285b2f3db2217fe36`

**Limited Approval Transaction:**  
`0xd7d0f5b2aa79d4adaae1643df8205db968ae307d68f7fa5ad104c4953da71525`

**SELL Test Transaction:**  
`0x3259b98244f1c32f2d62479fa8e491d2aacfb376edc7afc6a117885a14272292`

These references allow the principal FIDURIS Mainnet deployment, vesting, funding, liquidity, locking, and trading-validation activity to be independently inspected through BNB Chain blockchain data.
## 15. Conclusion
FIDURIS was designed around a straightforward principle: keep the core token simple, separate important responsibilities, and make material project information publicly verifiable wherever possible.

The FID token has a fixed maximum supply of `10,000,000 FID`, with no additional minting mechanism, transfer tax, blacklist, pause function, reflections, or hidden trading restrictions.

The project uses separate on-chain vesting contracts for major allocations, publicly documented Mainnet liquidity, a locked PancakeSwap Infinity liquidity position, and verified Mainnet deployment and trading transactions.

FIDURIS does not depend on promises of price appreciation, guaranteed exchange listings, or speculative return claims.

Future development will depend on technical feasibility, available resources, project needs, and genuine community participation. Potential ecosystem development may evolve, but the deployed token supply and historical blockchain activity remain independently verifiable.

Users should evaluate FIDURIS based on its actual deployed contracts, public documentation, on-chain records, and future execution rather than assumptions or promotional claims.

The long-term objective is to maintain a project structure that remains understandable, technically supportable, and open to independent verification.

**Clear by Design. Verifiable On-Chain.**