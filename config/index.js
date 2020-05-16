const config = {
  messageRate: process.env.messageRate,
  messagesPerConnection: process.env.messagesPerConnection,
  messagePayload: process.env.messagePayload,
  totalConnections: process.env.totalConnections,
  connectionRate: process.env.connectionRate,
  server: process.env.server,
};

module.exports = config;
