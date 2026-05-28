const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StableToken", function () {
  it("deploys and mints USDC, USDT, USD", async function () {
    const [owner, recipient] = await ethers.getSigners();
    const StableToken = await ethers.getContractFactory("StableToken");

    const usdc = await StableToken.deploy("USD Coin", "USDC");
    await usdc.deployed();
    await usdc.mint(recipient.address, ethers.utils.parseUnits("500", 6));
    expect(await usdc.balanceOf(recipient.address)).to.equal(
      ethers.utils.parseUnits("500", 6)
    );

    const usdt = await StableToken.deploy("Tether USD", "USDT");
    await usdt.deployed();
    await usdt.mint(recipient.address, ethers.utils.parseUnits("300", 6));
    expect(await usdt.balanceOf(recipient.address)).to.equal(
      ethers.utils.parseUnits("300", 6)
    );

    const usd = await StableToken.deploy("BuildBear USD", "USD");
    await usd.deployed();
    await usd.mint(recipient.address, ethers.utils.parseUnits("100", 6));
    expect(await usd.balanceOf(recipient.address)).to.equal(
      ethers.utils.parseUnits("100", 6)
    );
  });

  it("uses 6 decimals", async function () {
    const StableToken = await ethers.getContractFactory("StableToken");
    const usd = await StableToken.deploy("BuildBear USD", "USD");
    await usd.deployed();
    expect(await usd.decimals()).to.equal(6);
  });
});
