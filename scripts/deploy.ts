import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying the contracts with the address:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("MekaGill");
  const token = await Token.deploy(
    "0x9A534628B4062E123cE7Ee2222ec20B86e16Ca8F"
  );
  await token.deployed();

  console.log("Meka Gill Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
