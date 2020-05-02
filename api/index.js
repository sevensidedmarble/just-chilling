const express = require('express');
const app = express();

const server = app.listen(6544, function () {
  console.log('server is running on port 6544')
});

const io = require('socket.io')(server);

// let clients = [
//   {name: "marble"},
//   {name: "dan"}
// ]

let clients = [];

io.on('connection', function (socket) {
  console.log("connected: ", socket.id)
  console.log(socket.client)
  // clients.push(client);

  // client.on('disconnect', function() {
  //     clients.splice(clients.indexOf(client), 1);
  // });

  // const newClients = io.sockets.clients();

  // io.emit('clients', newClients)

  socket.on('send_message', function (data) {
    io.emit('message', data)
  });
  // socket.on('new_client', function (data) {
  //   io.emit('clients', data)
  // });
});
