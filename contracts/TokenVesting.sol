// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/finance/VestingWalletCliff.sol";

error InvalidBeneficiary();
error InvalidDuration();
error InvalidCliff();

contract TokenVesting is VestingWalletCliff {
    constructor(
        address beneficiary,
        uint64 startTimestamp,
        uint64 durationSeconds,
        uint64 cliffSeconds
    )
        VestingWallet(
            beneficiary,
            startTimestamp,
            durationSeconds
        )
        VestingWalletCliff(
            cliffSeconds
        )
    {
        if (beneficiary == address(0)) {
            revert InvalidBeneficiary();
        }

        if (durationSeconds == 0) {
            revert InvalidDuration();
        }

        if (cliffSeconds >= durationSeconds) {
            revert InvalidCliff();
        }
    }

    function _vestingSchedule(
        uint256 totalAllocation,
        uint64 timestamp
    )
        internal
        view
        virtual
        override
        returns (uint256)
    {
        uint256 cliffTimestamp = cliff();
        uint256 endTimestamp = end();

        // Nothing vested through the cliff.
        if (timestamp <= cliffTimestamp) {
            return 0;
        }

        // Everything vested at/after the final end.
        if (timestamp >= endTimestamp) {
            return totalAllocation;
        }

        // Linear vesting starts AFTER the cliff.
        return (
            totalAllocation *
            (uint256(timestamp) - cliffTimestamp)
        ) / (endTimestamp - cliffTimestamp);
    }
}