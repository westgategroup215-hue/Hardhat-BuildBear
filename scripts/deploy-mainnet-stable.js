const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying stable tokens from:", deployer.address);

  const StableToken = await ethers.getContractFactory("StableToken");
  const tokenDefinitions = [
    { name: "USD Coin", symbol: "USDC" },
    { name: "Tether USD", symbol: "USDT" },
    { name: "BuildBear USD", symbol: "USD" },
  ];

  for (const tokenDef of tokenDefinitions) {
    console.log(`Deploying ${tokenDef.symbol}...`);
    const token = await StableToken.deploy(tokenDef.name, tokenDef.symbol);
    await token.deployed();
    console.log(`- ${tokenDef.symbol} deployed at ${token.address}`);
  }

  console.log("Stable token deployments completed.");
  console.log("You can mint additional supply using scripts/mint-stable.js");
}

