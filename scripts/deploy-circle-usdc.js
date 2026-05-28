const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Circle USDC token with owner:", deployer.address);

  const CircleUSDCToken = await ethers.getContractFactory("CircleUSDCToken");
  const token = await CircleUSDCToken.deploy();
  await token.deployed();

  console.log("Circle USDC deployed to:", token.address);

  const mintAmount = process.argv[2]
    ? ethers.utils.parseUnits(process.argv[2], 6)
    : ethers.utils.parseUnits("1000", 6);

  const tx = await token.mint(deployer.address, mintAmount);
  await tx.wait();

  console.log(`Minted ${ethers.utils.formatUnits(mintAmount, 6)} USDC to ${deployer.address}`);
  console.log("Use scripts/circle-mint.js to mint additional USDC after deployment.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
