const fs = require("fs");
const path = require("path");
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  const [contractAddress, recipient, amountArg] = process.argv.slice(2);

  if (!contractAddress) {
    throw new Error(
      "Usage: npx hardhat run scripts/mint-max-stable.js --network mainnet -- <CONTRACT_ADDRESS> [recipient] [amount|max]"
    );
  }

  const to = recipient || deployer.address;
  const amount = amountArg && amountArg.toLowerCase() !== "max" ? amountArg : null;
  const mintAmount = amount
    ? ethers.utils.parseUnits(amount, 6)
    : ethers.constants.MaxUint256;
  const amountLabel = amount || "MaxUint256";

  const token = await ethers.getContractAt("StableToken", contractAddress);
  const tx = await token.mint(to, mintAmount);
  const receipt = await tx.wait();

  const runRecord = {
    timestamp: new Date().toISOString(),
    network: hre.network.name,
    script: "scripts/mint-max-stable.js",
    contractAddress,
    recipient: to,
    amount: amountLabel,
    amountRaw: mintAmount.toString(),
    txHash: receipt.transactionHash,
    blockNumber: receipt.blockNumber,
    deployer: deployer.address,
    confirmations: receipt.confirmations,
  };

  const dbDir = path.join(__dirname, "..", "run-database");
  const dbFile = path.join(dbDir, "stable-mint-runs.json");
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

  console.log(`Mint completed: ${amountLabel} tokens to ${to}`);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`Run details saved to ${dbFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
