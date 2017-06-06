'use strict'

const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.sign = async ctx => {
    ctx.body = jwt.sign({
        iss: ctx.request.body.proxy,
        // exp: Math.floor(Date.now() / 1000) + 30,
        sub: '0x',
        aud: 'Taipei Ethereum Meetup 2017-05-16',
        claim: {
            proxy: ctx.request.body.proxy,
            name: ctx.request.body.name,
            github: ctx.request.body.github,
            comment: ctx.request.body.comment
        }
    }, fs.readFileSync('keystore/id_rsa'), { algorithm: 'RS256' })
}

exports.verify = async ctx => {
    ctx.body = {
        verify: (typeof ctx.state.user === 'undefined') ? 'Invalid Signature' : 'Signature Verified',
        decode: ctx.state.user
    }
}