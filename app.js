const express = require('express');
const bodyParser = require('body-parser');
const ws = require('ws');
const app = express();

const {Transaction} = require('./transaction');
const {Block} = require('./block');
const {Blockchain} =  require('./blockchain');

const httpPort = process.env.HTTPPORT || 3000;
const p2pPort = process.env.P2PPORT || 4000;
const sockets = [];
const blockchain = new Blockchain();

// http
app.use(bodyParser.json());

app.get('/blocks', (req, res) => res.send(JSON.stringify(blockchain)));
app.post('/mining/:wallet', (req, res) => {
    const {transactions} = req.body;
    const {wallet} = req.params;

    transactions.forEach(transaction => blockchain.createTransaction(transaction));
    blockchain.mineReward(wallet);
    blockchain.mineReward(wallet);

    res.status(200).json({message: 'mined a new block'});
});
app.get('/balance/:wallet', (req, res) => {
    const {wallet} = req.params;

    res.status(500).json({wallet: wallet, amount: blockchain.getBalance(wallet)});
});
app.listen(httpPort, () => console.log('Listening on http port: ' + httpPort));