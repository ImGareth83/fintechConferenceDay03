// npx hardhat run scripts/deploynft.js --network mumbai

const { ethers, hardhat } = require("hardhat");

async function main() {
  const NFTmintContract = await ethers.deployContract("NFTminting", [
    "Test-Contract",
    "TEST",
  ]);
  await NFTmintContract.waitForDeployment();

  console.log("NFT contract deployed to:", await NFTmintContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    console.error(error);
    process.exit(1);
  });
