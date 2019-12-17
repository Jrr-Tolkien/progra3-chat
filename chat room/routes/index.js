'use strict'

const express = require('express')
const messageCtrl = require('../controllers/message')
const api = express.Router()

api.get('/message', messageCtrl.getMessage)
api.get('/message/:messageId', messageCtrl.getMessage)
api.post('/message', messageCtrl.saveMessage)
api.put('/message/:messageId', messageCtrl.updateMessage)
api.delete('/message/:messageId', messageCtrl.deleteMessage)

module.exports = api