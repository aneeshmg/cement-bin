const router = require('express').Router()
const handlers = require('./routeHandlers')


router.get('/', handlers.index)

router.post('/save', handlers.save)

router.get('/files', handlers.getFileListing)

router.delete('/files', handlers.deleteFiles)

module.exports = router