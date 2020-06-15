const Paciente = require('../models/Paciente');
const Endereco = require('../models/Endereco');
const Logger = require('../services/logger_service');
const logger = new Logger('server');
const { sequelize } = require('../config/db/db');

exports.create = async (req, res) => {
	logger.info('Route - Criação de Paciente');
	let newPaciente = req.body;

	if (!newPaciente.nome) {
		res.status(400).send('O campo nome não pode ficar vazio');
	} else if (!newPaciente.email) {
		res.status(400).send('O campo email não pode ficar vazio');
	} else if (!newPaciente.senha) {
		res.status(400).send('O campo senha não pode ficar vazio');
	}

	try {
		let endereco = await Endereco.create({
			logradouro: newPaciente.logradouro,
			numero: newPaciente.numero,
			bairro: newPaciente.bairro,
			cidade: newPaciente.cidade,
		});

		let payload = await Paciente.create({
			nome: newPaciente.nome,
			email: newPaciente.email,
			senha: newPaciente.senha,
			telefone: newPaciente.telefone,
			idade: newPaciente.idade,
			endereco_id: endereco.id,
		});

		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao cadastrar paciente';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};

exports.index = async (req, res) => {
	const { id } = req.params;

	sequelize
		.query(
			`select * from paciente join 
		endereco on paciente.endereco_id = endereco.id
		where paciente.id = ${id}`
		)
		.then((paciente) => {
			let payload = paciente[0];
			let response = { sucess: true, payload };
			if (!paciente[0].length) {
				response = {
					sucess: true,
					payload: 'paciente não encontrado',
				};
				return res.status(404).send(response);
			}
			return res.send(response);
		})
		.catch((error) => {
			let payload = 'falha ao buscar paciente';
			logger.error(payload, error);
			let response = { sucess: false, payload };
			res.status(500).send(response);
		});
};

exports.list = async (req, res) => {
	logger.info('Route - Listagem de Paciente');

	sequelize
		.query(`select nome, email, idade from paciente`)
		.then((paciente) => {
			let payload = paciente[0];
			let response = { sucess: true, payload };
			if (!paciente[0].length) {
				response = {
					sucess: true,
					payload: 'não existem pacientes',
				};
				return res.status(404).send(response);
			}
			return res.send(response);
		})
		.catch((error) => {
			let payload = 'falha ao buscar paciente';
			logger.error(payload, error);
			let response = { sucess: false, payload };
			res.status(500).send(response);
		});
};

exports.destroy = async (req, res) => {
	const { id } = req.params;

	const paciente = await Paciente.findOne({ where: { id: id } });
	const endereco_id = paciente.dataValues.endereco_id;
	const paciente_id = paciente.dataValues.id;

	sequelize
		.query(`delete from endereco where id = ${endereco_id}`)
		.then(() => {
			sequelize
				.query(
					`delete from paciente where id = ${paciente_id}`
				)
				.then(() => {
					response = {
						sucess: true,
						payload: 'paciente excluído dos registros',
					};
					return res.status(204).send(response);
				})
				.catch((erro) => {
					response = {
						sucess: false,
						payload: 'falha ao excluir paciente',
					};
					logger.error(response.payload, error);
					return res.status(500).send(response);
				});
		})
		.catch((erro) => {
			response = {
				sucess: false,
				payload: 'falha ao excluir endereco do paciente',
			};
			logger.error(response.payload, error);
			return res.status(500).send(response);
		});

	await Endereco.destroy({
		where: {
			id: endereco_id,
		},
	})
		.then(() => {
			Paciente.destroy({
				where: {
					id: paciente_id,
				},
			});
		})
		.catch((error) => {
			response = {
				sucess: false,
				payload: 'falha ao excluir paciente',
			};
			logger.error(response.payload, error);
			return res.status(500).send(response);
		});
};
