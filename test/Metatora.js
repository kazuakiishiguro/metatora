const MetaTora = artifacts.require('MetaTora.sol');

contract('MetaTora', (accounts) => {
  let metatora;

  before(async() => {
    metatora = await MetaTora.deployed();
  });

  describe('contract init', () => {
    it('should init correctly', async() => {
      const total_supply = (await metatora.totalSupply()).toNumber();
      assert.strictEqual(total_supply, 10000);
    });
  });

  describe('meta transaction', () => {
    it('should be able to recover address from signature', async() => {
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      const hash = await metatora.transferPreSignedHashing(metatora.address, accounts[1], 100, 10, nonce, {from: accounts[0]});
      const signature = await web3.eth.sign(hash, accounts[0]);
      const from = await metatora.recover(hash, signature);
      assert.strictEqual(from, accounts[0]);
    });

    it('should be able to metatora', async() => {
      const value = 100;
      const fee = 10;
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      const hash = await metatora.transferPreSignedHashing(metatora.address, accounts[1], 100, 10, nonce, {from: accounts[0]});
      const signature = await web3.eth.sign(hash, accounts[0]);
      await metatora.transferPreSigned(signature, accounts[1], value, fee, nonce, {from: accounts[2]});
      const account1_balance = (await metatora.balanceOf(accounts[1])).toNumber();
      const account2_balance = (await metatora.balanceOf(accounts[2])).toNumber();
      assert.strictEqual(account1_balance, value);
      assert.strictEqual(account2_balance, fee);
    });
  })
});