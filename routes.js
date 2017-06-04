'use strict'

const index = require('./controllers/index')
const eth = require('./controllers/eth')
const identityFactory = require('./controllers/identityFactory')
const proxy = require('./controllers/proxy')
const controller = require('./controllers/controller')
const recovery = require('./controllers/recovery')
const registry = require('./controllers/registry')
const jwt = require('./controllers/jwt')

module.exports = router => {
    router.get('/config', async ctx => {
        ctx.body = require('./config')
    })

    router.get('/', index)

    router.get('/eth/info', eth.info)
    router.post('/eth/sign', eth.sign)
    router.post('/eth/verify', eth.verify)

    router.post('/identity-factory/create', identityFactory.create)
    router.post('/identity-factory/query', identityFactory.query)

    router.post('/proxy/owner', proxy.owner)

    router.post('/controller/recoveryKey', controller.recoveryKey)
    router.post('/controller/userKey', controller.userKey)
    router.post('/controller/proposedUserKey', controller.proposedUserKey)
    router.post('/controller/signUserKeyChange', controller.signUserKeyChange)
    router.post('/controller/changeUserKey', controller.changeUserKey)

    router.post('/recovery/getAddresses', recovery.getAddresses)
    router.post('/recovery/replaceDelegates', recovery.replaceDelegates)
    router.post('/recovery/signUserChange', recovery.signUserChange)

    router.post('/registry/set', registry.set)
    router.post('/registry/get', registry.get)

    router.post('/jwt/sign', jwt.sign)
    router.get('/jwt/verify', jwt.verify)
}