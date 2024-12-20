const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Microkernel = require('./core/microkernel');
const ConfigPlugin = require("./injectable/configPlugin")
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});




const kernel = new Microkernel();
configPlugin = new ConfigPlugin(kernel)
configPlugin.registerPlugin()
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', ({ event, data }) => {
        console.log(event,data)
        const response = kernel.processMessage(event, data);
        io.emit('update', response); 
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

httpServer.listen(8000, () => {
    console.log('Servidor Socket.IO corriendo en http://localhost:8000');
});
