const mongoose = require('mongoose');
const app = require('./app');
const io = require('socket.io');
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')



    let socket = io.listen(
        app.listen(config.port, () => {
            console.log(`API REST corriendo en http://localhost:${config.port}`)
        })
    );

    socket.on('connection', function(client) {
        client.send("nueva conexion");
        client.broadcast.send("nueva conexion");

        client.on('user-connected', function(user) {
            client.emit('user-connected', user);
            client.broadcast.emit('user-connected', user);
        });

        client.on('user-left', function(user) {
            client.emit('user-left', user);
            client.broadcast.emit('user-left', user);
        });

        client.on('new-message', function(new_msg) {
            client.emit('new-message', new_msg);
            client.broadcast.emit('new-message', new_msg);
        });


    });
})