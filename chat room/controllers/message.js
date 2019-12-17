'use strict'

const Message = require('../models/message')

function getMessage(req, res) {
    let messageId = req.params.messageId

    Message.findById(messageId, (err, message) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!message) return res.status(404).send({ message: `El mensaje no existe` })

        res.status(200).send({ message })
    })
}

function getMessage(req, res) {
    Message.find({}, (err, messages) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!messages) return res.status(404).send({ message: 'No existen mensajes' })

        res.send(200, { messages })
    })
}

function saveMessage(req, res) {
    console.log('POST /api/message')
    console.log(req.body)

    let message = new Message()
    message.user = req.body.user
    message.text = req.body.text

    message.save((err, messageStored) => {
        if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err} ` })

        res.status(200).send({ message: messageStored })
    })
}

function updateMessage(req, res) {
    let messageId = req.params.messageId
    let update = req.body

    Message.findByIdAndUpdate(messageId, update, (err, messageUpdated) => {
        if (err) res.status(500).send({ message: `Error al actualizar el mensaje: ${err}` })

        res.status(200).send({ message: messageUpdated })
    })
}

function deleteMessage(req, res) {
    let messageId = req.params.messageId

    Message.findById(messageId, (err, message) => {
        if (err) res.status(500).send({ message: `Error al borrar el mensaje: ${err}` })

        message.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el mensaje: ${err}` })
            res.status(200).send({ message: 'El mensaje ha sido eliminado' })
        })
    })
}

module.exports = {
    getMessage,
    getMessage,
    saveMessage,
    updateMessage,
    deleteMessage
}