const { getNamedAccounts, deployments, ethers, network } = require("hardhat");
const { assert } = require("chai");
const { developmentChains } = require("../../helper-hardhat-config");
require("dotenv").config();

developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe Staging Tests", function() {
      let fundMe;
      let deployer;
      const sendValue = ethers.utils.parseEther("0.1");

      beforeEach(async function() {
        deployer = (await getNamedAccounts()).deployer;
        fundMe = await ethers.getContract("FundMe", deployer);
      });
      it("allows people to fund and withdraw", async function() {
        const fundTxResponse = await fundMe.fund({ value: sendValue });
        await fundTxResponse.wait(1);
        const withdarwTxResponse = await fundMe.withdraw();
        await withdarwTxResponse.wait(1);
        const endingFundMeBalance = await fundMe.provider.getBalance(
          fundMe.address
        );
        assert.equal(endingFundMeBalance.toString(), "0");
      });
    });
