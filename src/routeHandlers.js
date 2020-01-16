const fs = require('fs')
const path = require('path')
const pug = require('pug')
const _db = require('./db')
const logger = require('./logger')
const config = require('./config')



const index = (req, res) => {
    res.render('index', {
        title: 'Welcome | Cement-bin',
    })
}

module.exports = {
    index
}