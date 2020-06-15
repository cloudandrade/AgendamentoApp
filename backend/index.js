const express = require('express');
var bodyParser = require('body-parser');
const routes = require('./src/routes');
const cors = require('cors');

require('./src/config/db/db');

const PORT = process.env.PORT || '8001';

const server = express();

const Logger = require('./src/services/logger_service');
const logger = new Logger('server');

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(routes);

server.listen(PORT, () => {
	logger.info(`Servidor Rodando na Porta: ${PORT}`.bgBlue);
});
