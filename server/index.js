require('dotenv').config();
const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8080 });

const counters = {
  incomingConnections: 0,
  incomingMessages: 0,
};

wsServer.on('connection', (ws, req) => {
  console.log(`Incoming connection established with ${req.socket.remoteAddress}:${req.socket.remotePort}`);
  counters.incomingConnections++;

  ws.on('message', () => {
    counters.incomingMessages++;
  });
  ws.on('close', () => {
    console.log(counters);
  });
});
