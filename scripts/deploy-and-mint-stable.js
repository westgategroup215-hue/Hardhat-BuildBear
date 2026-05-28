const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;
const { getOrCreateWallet } = require("../helpers/wallet-manager");

async function main() {
  const [deployer] = await ethers.getSigners();
  const purseWallet = getOrCreateWallet();
  const [arg1, arg2] = process.argv.slice(2);

  let recipient = purseWallet.address;
  let amount = null;

  if (arg1) {
    const isAmountOnly = /^\d+(?:\.\d+)?$/.test(arg1) || arg1.toLowerCase() === "max";
    if (isAmountOnly) {
      amount = arg1;
    } else {
      recipient = arg1;
    }
  }

  if (arg2) {
    amount = arg2;
  }

  const mintAmount = amount
    ? amount.toLowerCase() === "max"
      ? ethers.constants.MaxUint256
      : ethers.utils.parseUnits(amount, 6)
    : ethers.constants.MaxUint256;
  const amountLabel = amount || "MaxUint256";

  const StableToken = await ethers.getContractFactory("StableToken");
  const tokenDefinitions = [
    { name: "USD Coin", symbol: "USDC" },
    { name: "Tether USD", symbol: "USDT" },
    { name: "BuildBear USD", symbol: "USD" },
  ];

  const runRecords = [];

  for (const tokenDef of tokenDefinitions) {
    console.log(`Deploying ${tokenDef.symbol}...`);
    const token = await StableToken.deploy(tokenDef.name, tokenDef.symbol);
    await token.deployed();
    console.log(`- ${tokenDef.symbol} deployed at ${token.address}`);

    const tx = await token.mint(recipient, mintAmount);
    const receipt = await tx.wait();
    console.log(`- Minted ${amountLabel} to ${recipient} in tx ${receipt.transactionHash}`);

    runRecords.push({
      timestamp: new Date().toISOString(),
      network: hre.network.name,
      script: "scripts/deploy-and-mint-stable.js",
      contractName: tokenDef.name,
      contractSymbol: tokenDef.symbol,
      contractAddress: token.address,
      recipient,
      purseWallet: purseWallet.address,
      amount: amountLabel,
      amountRaw: mintAmount.toString(),
      txHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      deployer: deployer.address,
      confirmations: receipt.confirmations,
    });
  }

  const dbDir = path.join(__dirname, "..", "run-database");
  const dbFile = path.join(dbDir, "stable-deploy-mint-runs.json");
  fs.mkdirSync(dbDir, { recursive: true });

  let runs = [];
  if (fs.existsSync(dbFile)) {
    try {
      runs = JSON.parse(fs.readFileSync(dbFile, "utf8") || "[]");
    } catch {
      runs = [];
    }
  }

  runs = runs.concat(runRecords);
  fs.writeFileSync(dbFile, JSON.stringify(runs, null, 2));

  console.log(`\nDeploy and mint run saved to ${dbFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
