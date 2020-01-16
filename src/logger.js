const Baray = require('baray')
const config = require('./config')

module.exports = new Baray({
    appName: config.name,
    console: true,
    json: true,
    color: true,
    path: `${__dirname}/../logs`
})