const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FIDURIS Token", function () {

  let token;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const FIDURIS = await ethers.getContractFactory("FIDURIS");
    token = await FIDURIS.deploy();
    await token.waitForDeployment();
  });

  it("Should have correct name", async function () {
    expect(await token.name()).to.equal("FIDURIS");
  });

  it("Should have correct symbol", async function () {
    expect(await token.symbol()).to.equal("FID");
  });

  it("Should have 18 decimals", async function () {
    expect(await token.decimals()).to.equal(18);
  });

  it("Should mint entire supply to deployer", async function () {
    const supply = await token.totalSupply();
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(supply);
  });

  it("Should have exactly 10,000,000 tokens", async function () {
    const expected = ethers.parseUnits("10000000", 18);
    expect(await token.totalSupply()).to.equal(expected);
  });

  it("Should transfer tokens", async function () {
    const [, addr1] = await ethers.getSigners();
    await token.transfer(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });

  it("Should approve tokens", async function () {
    const [owner, addr1] = await ethers.getSigners();
    await token.approve(addr1.address, 5000);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(5000);
  });

  it("Should transferFrom after approval", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await token.approve(addr1.address, 5000);
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 3000);
    expect(await token.balanceOf(addr2.address)).to.equal(3000);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(2000);
  });

  it("Should fail when sender doesn't have enough tokens", async function () {
    const [, addr1, addr2] = await ethers.getSigners();
    await expect(token.connect(addr1).transfer(addr2.address, 1)).to.be.reverted;
  });

  it("Should allow transferring zero tokens", async function () {
    const [, addr1] = await ethers.getSigners();
    await expect(token.transfer(addr1.address, 0)).to.not.be.reverted;
    expect(await token.balanceOf(addr1.address)).to.equal(0);
  });

  it("Should allow self transfer", async function () {
    const [owner] = await ethers.getSigners();
    const before = await token.balanceOf(owner.address);
    await token.transfer(owner.address, 12345);
    const after = await token.balanceOf(owner.address);
    expect(after).to.equal(before);
  });

  it("Should fail transferFrom without approval", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await expect(token.connect(addr1).transferFrom(owner.address, addr2.address, 1000)).to.be.reverted;
  });

  it("Should fail transferFrom above allowance", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    await token.approve(addr1.address, 1000);
    await expect(token.connect(addr1).transferFrom(owner.address, addr2.address, 2000)).to.be.reverted;
  });

  it("Should overwrite allowance", async function () {
    const [owner, addr1] = await ethers.getSigners();
    await token.approve(addr1.address, 1000);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(1000);
    await token.approve(addr1.address, 500);
    expect(await token.allowance(owner.address, addr1.address)).to.equal(500);
  });

  it("Should fail when transferring to zero address", async function () {
    await expect(token.transfer(ethers.ZeroAddress, 1000)).to.be.reverted;
  });it("Should transfer entire balance", async function () {
  const [owner, addr1] = await ethers.getSigners();

  const balance = await token.balanceOf(owner.address);

  await token.transfer(addr1.address, balance);

  expect(await token.balanceOf(owner.address)).to.equal(0);
  expect(await token.balanceOf(addr1.address)).to.equal(balance);
});it("Should reset allowance to zero", async function () {
  const [owner, addr1] = await ethers.getSigners();

  await token.approve(addr1.address, 1000);

  expect(
    await token.allowance(owner.address, addr1.address)
  ).to.equal(1000);

  await token.approve(addr1.address, 0);

  expect(
    await token.allowance(owner.address, addr1.address)
  ).to.equal(0);
});it("Should consume entire allowance", async function () {
  const [owner, addr1, addr2] = await ethers.getSigners();

  await token.approve(addr1.address, 1000);

  await token.connect(addr1).transferFrom(
    owner.address,
    addr2.address,
    1000
  );

  expect(
    await token.allowance(owner.address, addr1.address)
  ).to.equal(0);

  expect(
    await token.balanceOf(addr2.address)
  ).to.equal(1000);
});it("Should emit Transfer event", async function () {
  const [owner, addr1] = await ethers.getSigners();

  await expect(
    token.transfer(addr1.address, 1000)
  )
    .to.emit(token, "Transfer")
    .withArgs(owner.address, addr1.address, 1000);
});it("Should emit Approval event", async function () {
  const [owner, addr1] = await ethers.getSigners();

  await expect(
    token.approve(addr1.address, 5000)
  )
    .to.emit(token, "Approval")
    .withArgs(owner.address, addr1.address, 5000);
});it("Should handle multiple sequential transfers", async function () {
  const [owner, addr1, addr2] = await ethers.getSigners();

  await token.transfer(addr1.address, 1000);
  await token.transfer(addr2.address, 2000);

  await token.connect(addr1).transfer(addr2.address, 500);

  expect(await token.balanceOf(addr1.address)).to.equal(500);
  expect(await token.balanceOf(addr2.address)).to.equal(2500);

  const expectedOwnerBalance =
  (await token.totalSupply()) - 3000n;

  expect(await token.balanceOf(owner.address)).to.equal(expectedOwnerBalance);
});it("Should keep totalSupply unchanged after transfers", async function () {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const supplyBefore = await token.totalSupply();

  await token.transfer(addr1.address, 1000);
  await token.transfer(addr2.address, 2000);
  await token.connect(addr1).transfer(addr2.address, 500);

  const supplyAfter = await token.totalSupply();

  expect(supplyAfter).to.equal(supplyBefore);
});it("Should transfer almost entire balance", async function () {
  const [owner, addr1] = await ethers.getSigners();

  const total = await token.balanceOf(owner.address);
  const amount = total - 1n;

  await token.transfer(addr1.address, amount);

  expect(await token.balanceOf(owner.address)).to.equal(1n);
  expect(await token.balanceOf(addr1.address)).to.equal(amount);
});it("Should keep separate allowances for different spenders", async function () {
  const [owner, addr1, addr2] = await ethers.getSigners();

  await token.approve(addr1.address, 1000);
  await token.approve(addr2.address, 2000);

  expect(
    await token.allowance(owner.address, addr1.address)
  ).to.equal(1000);

  expect(
    await token.allowance(owner.address, addr2.address)
  ).to.equal(2000);
});it("Should not affect another spender allowance", async function () {
  const [owner, addr1, addr2, addr3] = await ethers.getSigners();

  await token.approve(addr1.address, 5000);
  await token.approve(addr2.address, 7000);

  await token.connect(addr1).transferFrom(
    owner.address,
    addr3.address,
    2000
  );

  expect(
    await token.allowance(owner.address, addr1.address)
  ).to.equal(3000);

  expect(
    await token.allowance(owner.address, addr2.address)
  ).to.equal(7000);
});it("Should keep allowance unchanged after failed transferFrom", async function () {
  const [owner, addr1, addr2] = await ethers.getSigners();

  await token.approve(addr1.address, 1000);

  await expect(
    token.connect(addr1).transferFrom(
      owner.address,
      addr2.address,
      2000
    )
  ).to.be.reverted;

  expect(
    await token.allowance(owner.address, addr1.address)
  ).to.equal(1000);
});it("Should track multiple spender allowances independently", async function () {
  const [owner, addr1, addr2, addr3] = await ethers.getSigners();

  await token.approve(addr1.address, 3000);
  await token.approve(addr2.address, 4000);

  await token.connect(addr1).transferFrom(
    owner.address,
    addr3.address,
    1000
  );

  await token.connect(addr2).transferFrom(
    owner.address,
    addr3.address,
    2500
  );

  expect(
    await token.allowance(owner.address, addr1.address)
  ).to.equal(2000);

  expect(
    await token.allowance(owner.address, addr2.address)
  ).to.equal(1500);

  expect(
    await token.balanceOf(addr3.address)
  ).to.equal(3500);
});it("Should transfer correct amounts to multiple recipients", async function () {
  const [owner, addr1, addr2, addr3] = await ethers.getSigners();

  await token.transfer(addr1.address, 1000);
  await token.transfer(addr2.address, 2000);
  await token.transfer(addr3.address, 3000);

  expect(await token.balanceOf(addr1.address)).to.equal(1000);
  expect(await token.balanceOf(addr2.address)).to.equal(2000);
  expect(await token.balanceOf(addr3.address)).to.equal(3000);

  const expectedOwnerBalance =
    (await token.totalSupply()) - 6000n;

  expect(await token.balanceOf(owner.address)).to.equal(expectedOwnerBalance);
});it("Should transfer exactly one token unit", async function () {
  const [, addr1] = await ethers.getSigners();

  await token.transfer(addr1.address, 1);

  expect(await token.balanceOf(addr1.address)).to.equal(1);
});it("Should transfer exactly one full token", async function () {
  const [, addr1] = await ethers.getSigners();

  const oneFID = ethers.parseUnits("1", 18);

  await token.transfer(addr1.address, oneFID);

  expect(await token.balanceOf(addr1.address)).to.equal(oneFID);
});it("Should revert when transferring to the zero address", async function () {
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  await expect(
    token.transfer(zeroAddress, 1)
  ).to.be.revertedWithCustomError(token, "ERC20InvalidReceiver");
});it("Should revert when approving the zero address", async function () {
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  await expect(
    token.approve(zeroAddress, 100)
  ).to.be.revertedWithCustomError(token, "ERC20InvalidSpender");
});it("Should revert when transferring more than balance", async function () {
  const [, addr1] = await ethers.getSigners();

  const tooMuch = ethers.parseUnits("100000000", 18);

  await expect(
    token.connect(addr1).transfer(
      token.target,
      tooMuch
    )
  ).to.be.reverted;
});it("Should revert when transferFrom exceeds allowance", async function () {
  const [, addr1, addr2] = await ethers.getSigners();

  const approved = ethers.parseUnits("100", 18);
  const attempt = ethers.parseUnits("101", 18);

  await token.approve(addr1.address, approved);

  await expect(
    token.connect(addr1).transferFrom(
      owner.address,
      addr2.address,
      attempt
    )
  ).to.be.reverted;
});it("Should handle 100 consecutive transfers correctly", async function () {
  const [, addr1] = await ethers.getSigners();

  const amount = 1n;

  for (let i = 0; i < 100; i++) {
    await token.transfer(addr1.address, amount);
  }

  expect(await token.balanceOf(addr1.address)).to.equal(100n);
});it("Should correctly transfer tokens across multiple wallets", async function () {
  const [, addr1, addr2, addr3] = await ethers.getSigners();

  const amount = ethers.parseUnits("100", 18);

  await token.transfer(addr1.address, amount);

  await token.connect(addr1).transfer(addr2.address, amount);

  await token.connect(addr2).transfer(addr3.address, amount);

  expect(await token.balanceOf(addr1.address)).to.equal(0);
  expect(await token.balanceOf(addr2.address)).to.equal(0);
  expect(await token.balanceOf(addr3.address)).to.equal(amount);
});it("Should preserve total supply after multiple operations", async function () {
  const [, addr1, addr2, addr3] = await ethers.getSigners();

  const initialSupply = await token.totalSupply();

  const amount = ethers.parseUnits("100", 18);

  await token.transfer(addr1.address, amount);

  await token.connect(addr1).transfer(addr2.address, amount);

  await token.connect(addr2).transfer(addr3.address, amount);

  const ownerBalance = await token.balanceOf(owner.address);
  const balance1 = await token.balanceOf(addr1.address);
  const balance2 = await token.balanceOf(addr2.address);
  const balance3 = await token.balanceOf(addr3.address);

  expect(
    ownerBalance + balance1 + balance2 + balance3
  ).to.equal(initialSupply);
});

});
