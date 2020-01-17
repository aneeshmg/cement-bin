const fs = require('fs')
const uuid = require('uuid/v4')
const _db = require('./db')
const logger = require('./logger')


const index = (req, res) => {
    res.render('index', {
        title: 'Welcome | Cement-bin',
    })
}

const save = (req, res) => {
    let db = _db.getDb()
    let id = uuid()
    let text = req.body.data
    let filename = req.body.filename
    let expirationDate = req.body.expirationDate
    let SUCCESS = true

    fs.writeFile(`${__dirname}/../files/${id}.txt`, text, err => {
        if (err) SUCCESS = false
        else logger.info(`${id} was saved.`)

        db.collection('files').insertOne({
            tag: id,
            name: filename,
            expiration: expirationDate,
            deleted: false
        }, (err, result) => {
            if (err) SUCCESS = false
            else logger.info(`Saved file ${filename} as ${id}`)
        })

        if (SUCCESS === true) {
            res.send({
                tag: id,
                status: 200
            })
        }
        else res.send(500)
    })


}

const getFileListing = (req, res) => {
    let db = _db.getDb()

    db.collection('files').find({
        deleted: false
    }).toArray().then(files => {
        let currentDate = new Date()
        // Filter by expiration date before returning
        files = files.filter(file => {
            expirationDate = new Date(file.expiration)
            return expirationDate - currentDate > 0
        })
        res.send(files)
    })
}

const deleteFiles = (req, res) => {
    let db = _db.getDb()
    let tag = req.body.tag

    db.collection('files').updateOne({
        tag: tag
    }, {
        $set: {
            deleted: true
        }
    }).then(() => {
        logger.info(`Deleted ${tag} from database.`)

        fs.rename(`${__dirname}/../files/${tag}.txt`, `${__dirname}/../files/deleted/${tag}.txt`, err => {
            if (err) {
                logger.error("Something went wrong while moving file to deleted directory." + err)
                res.send(500)
            }
            else res.send(200)
        })
    }).catch(err => {
        logger.error("Something went wrong when deleting from database." + err)
        res.send(500)
    })
}

module.exports = {
    index,
    save,
    getFileListing,
    deleteFiles
}