var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 1337;
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

//io.on("connection", function (socket) {
//    socket.on("send message", function (sent_msg, callback) {
//       sent_msg = "[ " + getCurrentDate() + " ]: " + sent_msg;
//
//        io.sockets.emit("update messages", sent_msg);
//        callback();
//    });
//});

http.listen(port, function () {
    console.log('listening on *:' + port);
});
