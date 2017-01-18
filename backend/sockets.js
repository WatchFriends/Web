module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('event', function (data) {
            console.log('event');
            io.sockets.emit('message', data);
        })
    });
};