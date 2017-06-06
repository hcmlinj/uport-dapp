'use strict'

const util = require('ethereumjs-util')
const axios = require('axios')

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

exports.sign = async ctx => {
    const body = ctx.request.body
    const message = JSON.stringify({
        userKey: body.userKey,
        proxy: body.proxy
    })

    ctx.body = {
        message,
        signature: web3.eth.sign(body.userKey, web3.sha3(message))
    }
}

exports.verify = async ctx => {
    const body = ctx.request.body

    const signature = util.fromRpcSig(body.signed.signature)
    const pub = util.ecrecover(util.hashPersonalMessage(util.sha3(body.signed.message)), signature.v, signature.r, signature.s)
    const addr = util.pubToAddress(pub)

    ctx.body = {
        pub: `0x${pub.toString('hex')}`,
        addr: `0x${addr.toString('hex')}`
    }
}