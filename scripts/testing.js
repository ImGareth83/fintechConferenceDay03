// node scripts/testing.js
const { ethers, hardhat } = require("hardhat");
const contractJSON = require("../artifacts/contracts/NFTminting.sol/NFTminting.json");

const abi = contractJSON.abi;

async function main() {
  const alchemy = new ethers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_API_KEY
  );

  const userWallet = new ethers.Wallet(process.env.PRIVATE_KEY, alchemy);

  const NFTcontract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    userWallet
  );

  const tx1 = await NFTcontract.owner();

  const ownerWallet = "<your-owner-wallet-address>";
  console.log("mint to owner's wallet address :" + ownerWallet);

  await NFTcontract.safeMint(
    ownerWallet,
    "https://bafkreia54nc2s3dqu4y6cx3djrpaku7dgcxophlytb2lxhfnglbtg7rdoy.ipfs.nftstorage.link/"
  );

  console.log("All NFTs minted.");
  console.log(
    "View on: https://testnets.opensea.io/assets/mumbai/" +
      process.env.CONTRACT_ADDRESS
  );

  console.log(
    "view nft on browser: https://ipfs.io/ipfs/bafybeicn7t63653k7hzqge26s5dal54xbshpczrhyuueyczld6zktnppcu/image"
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    console.error(error);
    process.exit(1);
  });
