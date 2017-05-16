'use strict'

const Koa = require('koa')
const Logger = require('concurrency-logger')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser')
const serve = require('koa-static')

const routes = require('./routes')

const app = new Koa()
const router = new Router()
const logger = Logger.default({ timestamp: true })

const port = process.env.PORT || 3000

routes(router)

app
    .use(logger)
    .use(bodyparser())
    .use(router.routes())
    .use(serve('dist'))
    .listen(port, () =>
        console.log(`Server started: http://127.0.0.1:${port}`)
    )