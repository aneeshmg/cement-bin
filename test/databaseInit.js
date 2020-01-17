const _db = require('../src/db')
const config = require('../src/config')

const files = require('./data/files')

// This is just for testing

if (config.test) {
    _db.connectToDatabase()
    .then(() => {
        const db = _db.getDb()

        db.collection('files').drop()

        db.collection('files').insertMany(files)

        console.log("Inserted test data!")

    })
    .catch(err => console.log("Something went wrong writing test data to the databse.", err))
}
