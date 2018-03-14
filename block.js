const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficult) {
        console.time('mined a block in');
        while (this.hash.substring(0, difficult) !== Array(difficult + 1).join('0')) {
            this.nonce += 1;
            this.hash = this.calculateHash();
        }
        console.timeEnd('mined a block in');
    }

}

exports.Block = Block;