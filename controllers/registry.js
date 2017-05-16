'use strict'

const ethSigner = require('eth-signer')

const web3 = require('../models/web3')
const utils = require('../models/utils')
const config = require('../config.json')

exports.set = async ctx => {
    try {
        const body = ctx.request.body

        const proxy = web3.eth.contract(config.abi.Proxy).at(body.proxy)
        const controller = web3.eth.contract(config.abi.RecoverableController).at(proxy.owner())

        const registrationIdentifier = body.registrationIdentifier
        const valueIpfs = await utils.ipfsAdd(body.value)
        const value = utils.hexToBytes32(valueIpfs)
        const data = `0x${ethSigner.txutils._encodeFunctionTxData('set', ['bytes32', 'address', 'bytes32'], [registrationIdentifier, '0x0', value])}`

        const hash = controller.forward(config.contract.UportRegistry, 0, data, {
            from: body.userKey,
            gas: 2000000
        })

        ctx.body = { hash, valueIpfs }
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}

exports.get = async ctx => {
    try {
        const body = ctx.request.body

        const registry = web3.eth.contract(config.abi.UportRegistry).at(config.contract.UportRegistry)

        const registrationIdentifier = body.registrationIdentifier
        const valueBytes32 = registry.get(registrationIdentifier, body.proxy, '0x0')

        if (valueBytes32 === '0x0000000000000000000000000000000000000000000000000000000000000000') {
            ctx.throw(404, 'registry not found')
        } else {
            const valueIpfs = utils.bytes32ToHex(valueBytes32)
            const value = await utils.ipfsCat(valueIpfs)

            ctx.body = { valueBytes32, valueIpfs, value }
        }
    } catch (e) {
        ctx.log.error(e.message)
        ctx.throw(400, e.message)
    }
}