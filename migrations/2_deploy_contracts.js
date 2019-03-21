const MetaTora = artifacts.require('MetaTora.sol');

module.exports = (deployer) => {
  deployer.deploy(MetaTora, 10000);
}