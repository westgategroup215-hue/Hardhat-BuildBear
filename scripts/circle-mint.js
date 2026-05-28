const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const [contractAddress, recipient, amountArg] = process.argv.slice(2);

  if (!contractAddress) {
    throw new Error(
      "Usage: npx hardhat run scripts/circle-mint.js -- <USDC_CONTRACT_ADDRESS> [recipient] [amount]"
    );
  }

  const mintAmount = amountArg
    ? ethers.utils.parseUnits(amountArg, 6)
    : ethers.utils.parseUnits("1000", 6);

  const to = recipient || deployer.address;
  const token = await ethers.getContractAt("CircleUSDCToken", contractAddress);

  const tx = await token.mint(to, mintAmount);
  await tx.wait();

  console.log(`Minted ${ethers.utils.formatUnits(mintAmount, 6)} USDC to ${to}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
