const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const [contractAddress, recipient, amountArg] = process.argv.slice(2);

  if (!contractAddress) {
    throw new Error(
      "Usage: npx hardhat run scripts/mint-stable.js --network mainnet -- <CONTRACT_ADDRESS> [recipient] [amount]"
    );
  }

  const to = recipient || deployer.address;
  const amount = amountArg || "1000";
  const mintAmount = ethers.utils.parseUnits(amount, 6);

  const token = await ethers.getContractAt("StableToken", contractAddress);
  const tx = await token.mint(to, mintAmount);
  await tx.wait();

  console.log(`Minted ${amount} tokens to ${to} on contract ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
