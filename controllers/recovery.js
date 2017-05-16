'use strict'

const web3 = require('../models/web3')
const config = require('../config.json')

exports.getAddresses = async ctx => {
    const recovery = web3.eth.contract(config.abi.RecoveryQuorum).at(ctx.request.body.recovery)

    try {
        const delegates = recovery.getAddresses()

        ctx.body = delegates.map(d => ({
            delegate: d,
            proposedUserKey: recovery.delegates(d)[2]
        }))
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.replaceDelegates = async ctx => {
    const body = ctx.request.body
    const recovery = web3.eth.contract(config.abi.RecoveryQuorum).at(body.recovery)
    const delegatesToRemove = body.delegatesToRemove.replace(/ /g, '') === '' ? [] : body.delegatesToRemove.replace(/ /g, '').split(',')
    const delegatesToAdd = body.delegatesToAdd.replace(/ /g, '') === '' ? [] : body.delegatesToAdd.replace(/ /g, '').split(',')

    try {
        ctx.body = recovery.replaceDelegates(delegatesToRemove, delegatesToAdd, {
            from: body.userKey,
            gas: 2000000
        })
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.signUserChange = async ctx => {
    const body = ctx.request.body
    const recovery = web3.eth.contract(config.abi.RecoveryQuorum).at(body.recovery)

    try {
        ctx.body = recovery.signUserChange(body.proposedUserKey, {
            from: body.userKey,
            gas: 2000000
        })
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}