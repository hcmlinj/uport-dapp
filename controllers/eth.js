'use strict'

const utils = require('ethereumjs-util')
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
    const message = `${body.userKey},${body.proxy}`

    ctx.body = {
        message,
        signature: web3.eth.sign(body.userKey, web3.sha3(message))
    }
}

exports.verify = async ctx => {
    const body = ctx.request.body

    const r = utils.toBuffer(body.signed.signature.slice(0, 66))
    const s = utils.toBuffer('0x' + body.signed.signature.slice(66, 130))
    const v = utils.toBuffer('0x' + body.signed.signature.slice(130, 132)).readInt8()
    const m = utils.toBuffer(web3.sha3(body.signed.message))
    const pub = '0x' + utils.ecrecover(m, v, r, s).toString('hex')
    const addr = '0x' + utils.pubToAddress(pub).toString('hex')

    ctx.body = { pub, addr }
}