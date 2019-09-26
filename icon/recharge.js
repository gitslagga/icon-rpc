
const express = require('express')
const router = express.Router()

const { IconService, iconService } = require('../lib/restful')
const IconConverter = IconService.IconConverter
const logger = require('../lib/logger')

router.post('/getBlocknumber', (req, res) => {
    const block = await iconService.getLastBlock().execute()

    res.json({ code: 0, data: block.height })
})

async function getTransfers(blockNumber) {
    try {
        const block = await iconService.getBlockByHeight(blockNumber).execute()
        logger.info("getBlockByHeight", JSON.stringify(block))
        
        const transaction_list = block.confirmed_transaction_list
        const transfers = []

        for (let i = 0; i < transaction_list.length; i++) {
            const transaction = transaction_list[i]
            if (!transaction.dataType && !transaction.data) {
                const result = await iconService.getTransactionResult(transaction.txHash).execute()
                logger.info("getBlockByHeight", JSON.stringify(result))

                const status = IconConverter.toNumber(result.status)
                if (status === '1') {
                    transfers.push({
                        send: transaction.from,
                        to: transaction.to,
                        token: 'icx',
                        value: IconConverter.toNumber(transaction.value),
                        txHash: transaction.txHash,
                    })
                }
            }
        }

        return { code: 0, data: transfers }
    } catch (error) {
        logger.info('RechargeList Error', error.toString())
        return { code: 405, msg: error.toString() } 
    }
}

router.post('/rechargeList', async function (req, res) {
    if (!req.body || !req.body.blockNumber) 
        return res.json({ code: 404, msg: 'missing params' })

    logger.info('Request Body', req.body)
    
    const transfers = await getTransfers(req.body.blockNumber)
    res.json(transfers)
})

module.exports = router