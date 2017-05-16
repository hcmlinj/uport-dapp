'use strict'

const bs58 = require('bs58')
const IPFS = require('ipfs-mini')

const config = require('../config.json')

const ipfs = new IPFS(config.ipfs)

exports.hexToBytes32 = hex => `0x${new Buffer(bs58.decode(hex)).toString('hex').slice(4)}`

exports.bytes32ToHex = bytes32 => bs58.encode(new Buffer(`1220${bytes32.slice(2)}`, 'hex'))

exports.ipfsAdd = str => new Promise((resolove, reject) => {
  ipfs.add(str, (err, res) => {
    if (err) reject(err)
    if (res) resolove(res)
  })
})

exports.ipfsCat = hex => new Promise((resolove, reject) => {
  ipfs.cat(hex, (err, res) => {
    if (err) reject(err)
    if (res) resolove(res)
  })
})