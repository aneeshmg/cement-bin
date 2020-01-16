const server = require('./src/server')
const logger = require('./src/logger')
const config = require('./src/config')

server.listen(config.port, () => { logger.info(`Application running on ${config.port}`)})