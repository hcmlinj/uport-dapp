'use strict'

const web3 = require('../models/web3')
const config = require('../config.json')

exports.owner = async ctx => {
    const proxy = web3.eth.contract(config.abi.Proxy).at(ctx.request.body.proxy)

    try {
        ctx.body = proxy.owner()
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}