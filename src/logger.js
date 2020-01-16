const Baray = require('baray')

module.exports = new Baray({
    appName: "cement",
    console: true,
    json: true,
    color: true,
    path: `${__dirname}/../logs`
})