const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const logger = require('./logger')

const config = require('./config')
const routes = require('./routes')
const db = require('./db')

const app = express()


app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/js', express.static(path.join(__dirname, '../views/js')))
// app.use('/files', express.static(path.join(__dirname, '../files')))

// Always wear helmet
app.use(helmet())
app.use(cors())

app.use('/', routes)

db.connectToDatabase()
    .then()
    .catch(error => {
        logger.error("Something went wrong connecting to database ", error)
        process.exit(1)
    })

module.exports = app