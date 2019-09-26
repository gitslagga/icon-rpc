
const IconService = require('icon-sdk-js')
const config = require('./config')

const provider = new IconService.HttpProvider(config.ApiEndpoint)
const iconService = new IconService(provider)

module.exports = { IconService, iconService }