'use strict'

const web3 = require('../models/web3')

exports.info = async ctx => {
    const accounts = web3.eth.accounts;

    ctx.body = {
        blockNumber: web3.eth.blockNumber,
        coinbase: web3.eth.coinbase,
        accounts: accounts.map(account => ({
            address: account,
            balance: web3.fromWei(web3.eth.getBalance(account))
        }))
    }
}