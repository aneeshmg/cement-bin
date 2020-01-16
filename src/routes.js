const router = require('express').Router()
const _db = require('./db')
const logger = require('./logger')

const handlers = require('./routeHandlers')


router.get('/', handlers.index)

module.exports = router