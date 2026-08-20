const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenVesting", function () {

    let token;
    let vesting;

    let owner;
    let beneficiary;

    beforeEach(async function () {

        [owner, beneficiary] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("FIDURIS");
        token = await Token.deploy();
        await token.waitForDeployment();

        const Vesting = await ethers.getContractFactory("TokenVesting");

        const now = Math.floor(Date.now() / 1000);

        vesting = await Vesting.deploy(
            beneficiary.address,
            now,
            24 * 30 * 24 * 60 * 60,
            3 * 30 * 24 * 60 * 60
        );

        await vesting.waitForDeployment();

    });

    it("Should deploy successfully", async function () {

        expect(await vesting.owner()).to.equal(
            beneficiary.address
        );

    });

    it("Should receive 3,000,000 FID", async function () {

        await token.transfer(
            await vesting.getAddress(),
            ethers.parseUnits("3000000", 18)
        );

        const balance = await token.balanceOf(
            await vesting.getAddress()
        );

        expect(balance).to.equal(
            ethers.parseUnits("3000000", 18)
        );

    });

    it("Should revert with InvalidDuration", async function () {

        const Vesting = await ethers.getContractFactory("TokenVesting");

        const now = Math.floor(Date.now() / 1000);

        await expect(
            Vesting.deploy(
                beneficiary.address,
                now,
                0,
                0
            )
        ).to.be.revertedWithCustomError(
            Vesting,
            "InvalidDuration"
        );

    });

});