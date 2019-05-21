var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let connections = [];
io.on("connection", socket => {
    connections.push(socket)
    console.log(`a user connected ${socket.id}`);

    // var clients = io.sockets.clients();
    // const clients = io.sockets.clients();
    console.log(connections)
    // console.log(Object.keys(io.engine.clients).length) 
    socket.on("SEND_MESSAGE", function (data) {
        io.emit("MESSAGE", data);
    });
    socket.on("disconnect", function () {
        connections.splice(connections.indexOf(socket), 1)
        console.log("user disconnected");
    });



    socket.on('typing', () => {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });
});

http.listen(3000, () => {
    console.log("listening on *:3000");
});