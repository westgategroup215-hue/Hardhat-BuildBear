const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CircleUSDCToken", function () {
  it("deploys and allows the owner to mint USDC", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const CircleUSDCToken = await ethers.getContractFactory("CircleUSDCToken");
    const token = await CircleUSDCToken.deploy();
    await token.deployed();

    await token.mint(recipient.address, ethers.utils.parseUnits("500", 6));
    expect(await token.balanceOf(recipient.address)).to.equal(
      ethers.utils.parseUnits("500", 6)
    );
  });

  it("has 6 decimals and USDC metadata", async function () {
    const CircleUSDCToken = await ethers.getContractFactory("CircleUSDCToken");
    const token = await CircleUSDCToken.deploy();
    await token.deployed();

    expect(await token.name()).to.equal("Circle USD Coin");
    expect(await token.symbol()).to.equal("USDC");
    expect(await token.decimals()).to.equal(6);
  });
});
