const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;
const { getOrCreateWallet } = require("../helpers/wallet-manager");

async function main() {
  const [deployer] = await ethers.getSigners();
  const purseWallet = getOrCreateWallet();
  const [recipientArg, amountArg] = process.argv.slice(2);

  let recipient = recipientArg || purseWallet.address;
  let amount = amountArg || null;

  if (!amountArg && recipientArg && /^\d+(?:\.\d+)?$/.test(recipientArg)) {
    amount = recipientArg;
    recipient = purseWallet.address;
  }

  const mintAmount = amount
    ? amount.toLowerCase() === "max"
      ? ethers.constants.MaxUint256
      : ethers.utils.parseUnits(amount, 6)
    : ethers.constants.MaxUint256;
  const amountLabel = amount || "MaxUint256";

  const StableToken = await ethers.getContractFactory("StableToken");
  const token = await StableToken.deploy("USD Coin", "USDC");
  await token.deployed();
  console.log(`USDC deployed at ${token.address}`);

  const tx = await token.mint(recipient, mintAmount);
  const receipt = await tx.wait();
  console.log(`Minted ${amountLabel} USDC to ${recipient} in tx ${receipt.transactionHash}`);

  const runRecord = {
    timestamp: new Date().toISOString(),
    network: hre.network.name,
    script: "scripts/deploy-and-mint-usdc.js",
    contractName: "USD Coin",
    contractSymbol: "USDC",
    contractAddress: token.address,
    recipient,
    purseWallet: purseWallet.address,
    amount: amountLabel,
    amountRaw: mintAmount.toString(),
    txHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
    deployer: deployer.address,
    confirmations: receipt.confirmations,
  };

  const dbDir = path.join(__dirname, "..", "run-database");
  const dbFile = path.join(dbDir, "usdc-deploy-mint-runs.json");
  fs.mkdirSync(dbDir, { recursive: true });

  let runs = [];
  if (fs.existsSync(dbFile)) {
    try {
      runs = JSON.parse(fs.readFileSync(dbFile, "utf8") || "[]");
    } catch {
      runs = [];
    }
  }

  runs.push(runRecord);
  fs.writeFileSync(dbFile, JSON.stringify(runs, null, 2));
  console.log(`Run details saved to ${dbFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
