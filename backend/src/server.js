const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http')

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log(socket.handshake.query);   
});

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-b87wf.mongodb.net/semana09?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// GET, POST, PUT, DELETE

//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')));
app.use(routes);

app.listen(3333);