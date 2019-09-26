const express = require('express')
const account = require('./icon/account')
const recharge = require('./icon/recharge')
const withdraw = require('./icon/withdraw')
const logger = require('./lib/logger')
const app = express()

app.use('/icon', [account, recharge, withdraw])

app.listen(3000, () => console.log('icon restful api listening on port 3000'))

process.on('uncaughtException', (err) => {
    if (err) {
        logger.error(err)
    }
})

process.on('unhandledRejection', (err, promise) => {
    if (err) {
        logger.error(err)
    }
})