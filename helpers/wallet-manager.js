const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");

const CONFIG_FILE = path.join(__dirname, "..", "wallet-config.json");

function generateWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

function saveWallet(walletData) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(walletData, null, 2));
  console.log(`Wallet saved to ${CONFIG_FILE}`);
}

function loadWallet() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
  } catch {
    return null;
  }
}

function getOrCreateWallet() {
  let wallet = loadWallet();
  if (!wallet) {
    wallet = generateWallet();
    saveWallet(wallet);
    console.log(`Created new wallet at ${wallet.address}`);
  }
  return wallet;
}

module.exports = {
  generateWallet,
  saveWallet,
  loadWallet,
  getOrCreateWallet,
  CONFIG_FILE,
};
