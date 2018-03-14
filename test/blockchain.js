const assert = require('assert');
const {Block} =  require('../block');
const {Transaction} = require('../transaction');
const {Blockchain} =  require('../blockchain');

const blockchain = new Blockchain();

describe("Block chain test", function() {
    it("Initialize a blockchain", function() {
        const bc = new Blockchain();
        assert(bc.getLastBlock().hash !== undefined);
    });

    it("mine new block/reward", function() {
        assert.equal(blockchain.getBalance('mywallet'), 0);
        blockchain.createTransaction(new Transaction('Awallet', 'Bwallet', 50));
        blockchain.createTransaction(new Transaction('Awallet', 'Bwallet', 100));

        blockchain.mineReward('mywallet');
        blockchain.mineReward('mywallet');

        console.log('blockchain after mined two block');
        console.log(JSON.stringify(blockchain, null, 2));

        assert.equal(blockchain.getBalance('mywallet'), 50);
        assert.equal(blockchain.getBalance('Bwallet'), 150);
    });
});