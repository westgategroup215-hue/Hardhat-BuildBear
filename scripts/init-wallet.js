const { getOrCreateWallet, loadWallet } = require("../helpers/wallet-manager");

async function main() {
  const wallet = getOrCreateWallet();
  console.log("\n=== Wallet Configuration ===");
  console.log(`Address: ${wallet.address}`);
  console.log(`Private Key: ${wallet.privateKey}`);
  console.log("\nUse this address as your purse wallet.");
  console.log("All deploy-and-mint scripts will send tokens to this address by default.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
