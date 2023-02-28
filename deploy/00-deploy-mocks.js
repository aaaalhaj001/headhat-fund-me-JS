const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");

const DECIMALS = "8";
const INITIAL_PRICE = "200000000000"; // 2000

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId;

  if (chainId == 31337) {
    log("local network detected Deloying mocks");
    await deploy("MockV3Aggregator", {
      contarct: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })    
    
    log("Mocks Deploy");
    log("------------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
