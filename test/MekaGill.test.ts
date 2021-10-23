import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { MekaGill, MekaVerse } from "../typechain";

describe("Meka Gill Token", function () {
  let token: MekaGill;
  let nft: MekaVerse;
  let signer: SignerWithAddress;

  const name = "Meka Gill";
  const symbol = "MGILL";

  before(async function () {
    const NFT = await ethers.getContractFactory("MekaVerse");
    nft = await NFT.deploy("http://meka.com/");
    await nft.deployed();

    const Token = await ethers.getContractFactory("MekaGill");
    token = await Token.deploy(nft.address);
    await token.deployed();

    [signer] = await ethers.getSigners();
  });

  it("Deploys successfully", async function () {
    expect(await token.address).to.not.equal(0);
  });

  it("Has correct name", async function () {
    expect(await token.name()).to.equal(name);
  });

  it("Has correct symbol", async function () {
    expect(await token.symbol()).to.equal(symbol);
  });

  it("Has correct symbol", async function () {
    expect(await token.symbol()).to.equal(symbol);
  });

  it("Claim should revert with reason 'No mekas owned'", async function () {
    await expect(token.connect(signer).claimAllForOwner()).to.be.revertedWith(
      "NO_MEKAS_OWNED"
    );
  });

  it("Claim should be successfull and MGILL balance should be 10k", async function () {
    nft
      .connect(signer)
      .mint(
        [1],
        Date.now(),
        "0x4247c2a9a1509198ff66eab6d3133bc2cc30985153e12265e23e620f626b16f87e3ffb62fa7674e84beb48b978acfe4c7bd0be0e200211ec096880e7e7fac62e1c"
      );

    expect(await nft.connect(signer).balanceOf(signer.address)).to.equal(1);

    await token.connect(signer).claimAllForOwner();

    const balance = await token.balanceOf(signer.address);
    expect(balance.toString()).to.equal("10000000000000000000000");
  });
});
