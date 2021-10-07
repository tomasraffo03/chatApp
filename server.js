const io = require('socket.io')(3000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('usuario conectado');

    socket.on('disconnect', () => {
        console.log("usuario desconectado");
    })

    socket.on('send-chat-message', msg => {
        io.emit('message', msg);
    })
    
})