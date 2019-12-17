'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = Schema({
    user: String,
    text: String
})

module.exports = mongoose.model('Message', MessageSchema)