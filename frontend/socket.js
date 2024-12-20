
export const socket = io('http://localhost:8000');


socket.on('connect', () => {
    console.log('Conectado al servidor de Socket.IO');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor de Socket.IO');
});
