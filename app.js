const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const { program } = require('commander');
const SocketServer = require('socket.io');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index');
});
app.get('/shogi', function (req, res) {
    res.render('shogi');
});

program.option('--port <number>', 'listen port');
program.parse(process.argv);
let port = 3000;
if (program.port) {
    port = program.port;
}

const server = http.createServer(app).listen(port);
const io = SocketServer().listen(server, {'log level': 1});

console.log('http://localhost:' + port + '/');

io.sockets.on('connection', (socket) => {
    socket.on('send-message', (message) => {
        console.log(message);
        socket.broadcast.json.emit('cast-message', message);
    });
    socket.on('send-shogi', (data) => {
        socket.broadcast.json.emit('cast-shogi', data);
    });
});
