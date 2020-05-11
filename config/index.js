const config = {
	rate: process.env.rate,
	messagesPerConnection: process.env.messagesPerConnection,
	messagePayload: process.env.messagePayload,
	totalConnections: process.env.totalConnections,
};

module.exports = config;
