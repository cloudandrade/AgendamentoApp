const Sequelize = require('sequelize');
const Logger = require('../../services/logger_service');
//conexão com o banco de dados mysql
const logger = new Logger('db_config');
const dbname = process.env.DBNAME || 'agendamentoApp';
const dbuser = process.env.DBUSER || 'root';
const dbpass = process.env.DBPASS || 'root';
const dbhost = process.env.DBHOST || 'localhost';

//o primeiro parâmetro é o banco de dados, o segundo é o usuário e o terceiro a senha
const sequelize = new Sequelize(dbname, dbuser, dbpass, {
	host: dbhost,
	dialect: 'mysql',
});

sequelize
	.authenticate()
	.then(() => {
		logger.info('Banco de dados conectado com sucesso.');
	})
	.catch((err) => {
		logger.error(
			'Não foi possível se conectar ao banco de dados:',
			err
		);
	});

module.exports = {
	Sequelize,
	sequelize,
};
