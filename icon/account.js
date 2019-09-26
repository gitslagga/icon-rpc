const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const { IconService, iconService } = require('../lib/restful')
const IconWallet  = IconService.IconWallet
const IconValidator = IconService.IconValidator
const config = require('../lib/config')
const logger = require('../lib/logger')

router.use(bodyParser.json())

router.use(function timeLog(req, res, next) {
    logger.info('Request Original Url' + req.originalUrl)
    next()
})

router.post('/generateAccount', async function (req, res) {
    const bob = await IconWallet.create()
    const data = {
        address: bob.getAddress(),
        privateKey: bob.getPrivateKey(),
        publicKey: bob.getPublicKey()
    }

    res.json({
        code: 0,
        data
    })
})

router.post('/validatorAccount', async function (req, res) {
    if (!req.body || !req.body.address)
        return res.json({ code: 404, msg: 'missing params' })

    const valid = await IconValidator.isAddress(req.body.address)

    res.json({
        code: 0,
        data: valid
    })
})

router.post('/getAssetsByAccount', async function (req, res) {
    if (!req.body || !req.body.address)
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body', req.body)

    const assets = await iconService.getBalance(req.body.address).execute()
    const balance = assets.toFixed() / config.UnitIcx

    res.json({code: 0, data: balance })
})

module.exports = router