const MongoClient = require('mongodb').MongoClient
const log = require('./logger')

let _db

const connectToDatabase = () => {
    return new Promise((res, rej) => {
        MongoClient.connect(
            `mongodb://mongo/cement`
        , { useNewUrlParser: true })
        .then(client => {
            log.info('Connected to db.')
            _db = client.db()
            res()
        })
        .catch(err => {
            log.error(JSON.stringify(err))
            rej(err)
        })
    })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    log.error("Database not found or something went wrong with db.")
}

module.exports = {
    connectToDatabase,
    getDb
}