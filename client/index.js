require('dotenv').config();
const WebSocket = require('ws');
const pThrottle = require('p-throttle');

const config = require('../config');

const getWebsocket = (connection) => new WebSocket(connection);

const getThrottledWebsocket = () => pThrottle(getWebsocket, Number(config.connectionRate), 1000);

const wsConnectionOpenHandler = async (connection, ws) => {
  const send = pThrottle(ws.send.bind(ws), Number(config.messageRate), 1000);
  console.log(`Client opened connection ${connection} with ${ws.url}`);

  const firstMessageTime = new Date();
  const sentPromises = [];

  for (let i = 0; i < config.messagesPerConnection; i++) {
    sentPromises.push(send(config.messagePayload));
  }

  Promise.all(sentPromises).then(() => {
    console.log(`Sent ${config.messagesPerConnection} messages in ${new Date() - firstMessageTime}`);
    ws.close();
  });
};

const generateLoad = async () => {
  const throttledWS = getThrottledWebsocket();

  for (let connection = 1; connection <= config.totalConnections; connection++) {
    const ws = await throttledWS(config.server);

    ws.on('open', () => wsConnectionOpenHandler(connection, ws));

    ws.on('close', () => {
      console.log(`WS connection ${connection} closed`);
    });
  }
};

generateLoad();
