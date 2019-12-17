'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const path = require('path')
const viewsPath = path.join(__dirname + '/views/')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'html')

app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/'),
    express.static(__dirname + '/node_modules/socket.io-client/dist/'),
    express.static(__dirname + '/views/')
]);

app.use('/api', api)
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/chat', (req, res) => {
    res.sendFile(path.join(viewsPath + 'chat.html'));
})




module.exports = app