module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('event', function (data) {
            console.log('event');
            //todo: get friends, broadcast new event to friends
            io.sockets.emit('message', data);
        })
    });
};