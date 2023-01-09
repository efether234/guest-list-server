const express = require('express')
const config = require('config')
const logger = require('./startup/logger')

const app = express()

require('./startup/db')()
require('./startup/routes')(app)

const port = config.get('port')
const server = app.listen(port, () => {
    logger.info(`Now listening on port ${port}...`)
})

module.exports = server