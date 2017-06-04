'use strict'

const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.sign = async ctx => {
    ctx.body = jwt.sign({
        userKey: ctx.request.body.userKey,
        proxy: ctx.request.body.proxy,
        exp: Math.floor(Date.now() / 1000) + 10
    }, fs.readFileSync('keystore/id_rsa'), { algorithm: 'RS256' })
}

exports.verify = async ctx => {
    ctx.body = ctx.state.user
}