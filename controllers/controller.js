'use strict'

const web3 = require('../models/web3')
const config = require('../config.json')

exports.recoveryKey = async ctx => {
    const controller = web3.eth.contract(config.abi.RecoverableController).at(ctx.request.body.controller)

    try {
        ctx.body = controller.recoveryKey()
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.userKey = async ctx => {
    const controller = web3.eth.contract(config.abi.RecoverableController).at(ctx.request.body.controller)

    try {
        ctx.body = controller.userKey()
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.proposedUserKey = async ctx => {
    const controller = web3.eth.contract(config.abi.RecoverableController).at(ctx.request.body.controller)

    try {
        ctx.body = controller.proposedUserKey()
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.signUserKeyChange = async ctx => {
    const body = ctx.request.body
    const controller = web3.eth.contract(config.abi.RecoverableController).at(body.controller)

    try {
        ctx.body = controller.signUserKeyChange(body.proposedUserKey, {
            from: body.userKey,
            gas: 2000000
        })
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.changeUserKey = async ctx => {
    const body = ctx.request.body
    const controller = web3.eth.contract(config.abi.RecoverableController).at(body.controller)

    try {
        ctx.body = controller.changeUserKey({
            from: body.userKey,
            gas: 2000000
        })
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}