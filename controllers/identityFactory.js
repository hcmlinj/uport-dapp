'use strict'

const web3 = require('../models/web3')
const config = require('../config.json')

exports.create = async ctx => {
    const body = ctx.request.body
    const identityFactory = web3.eth.contract(config.abi.IdentityFactory).at(config.contract.IdentityFactory)

    try {
        ctx.body = identityFactory.CreateProxyWithControllerAndRecovery(
            body.userKey,
            body.delegates.replace(/ /g, '') === '' ? [] : body.delegates.replace(/ /g, '').split(','),
            body.longTimeLock,
            body.shortTimeLock, {
                from: body.userKey,
                gas: 3000000
            })
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.query = async ctx => {
    const identityFactory = web3.eth.contract(config.abi.IdentityFactory).at(config.contract.IdentityFactory)

    try {
        ctx.body = identityFactory.senderToProxy(ctx.request.body.userKey)
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}