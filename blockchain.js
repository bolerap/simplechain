const {Block} = require('./block');
const {Transaction} = require('./transaction');

class Blockchain {
    constructor() {
        const genesisBlock = new Block(Date.now(), "Genesis Block", "0");

        this.blocks = [genesisBlock];
        this.pendingTransactions = [];
        this.reward = 50;
        this.difficult = 3;
    }

    getLastBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    mineReward(wallet) {
        const block = new Block(Date.now(), this.pendingTransactions, this.getLastBlock().hash);
        block.mineBlock(this.difficult);
        this.blocks.push(block);

        this.pendingTransactions = [new Transaction(null, wallet, this.reward)];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalance(wallet) {
        let amount = 0;
        for (const block of this.blocks) {
            for (const transaction of block.transactions) {
                if (transaction.source === wallet) {
                    amount -= transaction.amount;
                }

                if (transaction.dest === wallet) {
                    amount += transaction.amount;
                }
            }
        }

        return amount;
    }

    validate() {
        for (let i = 1, len = this.blocks.length; i < len; ++i) {
            if (this.blocks[i].hash !== this.blocks[i].calculateHash()) {
                return false;
            }

            if (this.blocks[i].previousHash !== this.blocks[i - 1].hash) {
                return false;
            }
        }

        return true;
    }
}

exports.Blockchain = Blockchain;