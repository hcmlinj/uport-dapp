'use strict'

const fs = require('fs')

module.exports = async ctx => {
    ctx.log.info(ctx.request.host)
    ctx.body = fs.readFileSync('index.html').toString()
}