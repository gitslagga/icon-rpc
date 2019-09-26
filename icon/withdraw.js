const express = require('express')
const router = express.Router()
const BigNumber = require('bignumber.js')

const {IconService, iconService} = require('../lib/restful')
const logger = require('../lib/logger')
const config = require('../lib/config')

const IconWallet  = IconService.IconWallet
const SignedTransaction = IconService.SignedTransaction
const { CallBuilder, IcxTransactionBuilder } = IconService.IconBuilder
const IconConverter = IconService.IconConverter
const IconAmount = IconService.IconAmount

async function getDefaultStepCost() {
    const methodName = 'getStepCosts'

    const callBuilder = new CallBuilder()
    const call = callBuilder
        .to(config.GOVERNANCE_ADDRESS)
        .method(methodName)
        .build()
    const stepCosts = await iconService.call(call).execute()
    logger.info('stepCosts', JSON.stringify(stepCosts))

    return IconConverter.toBigNumber(stepCosts.default).times(2)
}

async function sendTransaction(privateKey, toAddress, toValue) {
    try {
        const wallet = IconWallet.loadPrivateKey(privateKey)
        const walletAddress = wallet.getAddress()

        const value = IconAmount.of(toValue, IconAmount.Unit.ICX).toLoop()
        logger.info('IconAmount of toLoop', JSON.stringify(value))
        
        const networkId = new BigNumber(config.NetworkID)
        const nonce = IconConverter.toBigNumber(config.None)
        const version = new BigNumber(config.Version)
        const stepLimit = await getDefaultStepCost()
        const timestamp = (new Date()).getTime() * 1000

        const icxTransactionBuilder = new IcxTransactionBuilder()
        const transaction = icxTransactionBuilder
        .nid(networkId)
        .nonce(nonce)
        .from(walletAddress)
        .to(toAddress)
        .value(value)
        .version(version)
        .stepLimit(stepLimit)
        .timestamp(timestamp)
        .build()

        const signedTransaction = new SignedTransaction(transaction, wallet)
        const txHash = await iconService.sendTransaction(signedTransaction).execute()
        logger.info('sendTransaction txHash', txHash)

        return { code: 0, msg: 'success', data: txHash }
        
    } catch (error) {
        logger.info('sendTransaction Error', error.toString())
        return { code: 405, msg: error.toString() } 
    }
}

router.post('/assetsTransfer', async function (req, res) {
    if (!req.body || !req.body.key || !req.body.to || !req.body.value) 
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body', req.body.to, req.body.value)

    const transfers = await sendTransaction(req.body.key, req.body.to, req.body.value)
    res.json(transfers)
})

module.exports = router