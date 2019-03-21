module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gasPrice: 0,
      gas: 6600000,
    },
  },
  compilers: {
    solc: {
      version: "0.5.2",
    }
  }
}