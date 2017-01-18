module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('event', function (data) {
            io.sockets.emit('message', data);
        })
    });
};