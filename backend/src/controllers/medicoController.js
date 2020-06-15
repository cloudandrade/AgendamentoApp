const Medico = require('../models/Medico');
const Logger = require('../services/logger_service');
const logger = new Logger('server');
const bcrypt = require('bcryptjs');

//criar
exports.create = async (req, res) => {
	logger.info('Route - Criação de Médico');
	let newMedico = {
		nome: req.body.nome,
		email: req.body.email,
		senha: bcrypt.hashSync(req.body.senha, 8),
	};

	if (!newMedico.nome) {
		res.status(400).send('O campo nome não pode ficar vazio');
	} else if (!newMedico.email) {
		res.status(400).send('O campo email não pode ficar vazio');
	} else if (!newMedico.senha) {
		res.status(400).send('O campo senha não pode ficar vazio');
	}
	console.log(newMedico);
	try {
		let payload = await Medico.create(newMedico);
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao cadastrar médico';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};

//buscar um medico
exports.index = async (req, res) => {
	const { id } = req.params;
	logger.info('Route - Busca de Médico');

	try {
		const payload = await Medico.findOne({ where: { id: id } });

		let response = { sucess: true, payload };
		if (!payload) {
			response = {
				sucess: true,
				payload: 'médico não encontrado',
			};
			return res.status(404).send(response);
		}
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao buscar médico';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};

//excluir
exports.destroy = async (req, res) => {
	const { id } = req.params;
	logger.info('Route - Exclusão de Médico');
	try {
		await Medico.destroy({
			where: {
				id: id,
			},
		});

		response = {
			sucess: true,
			payload: 'médico excluído dos registros',
		};
		return res.status(204).send(response);
	} catch (error) {
		response = {
			sucess: false,
			payload: 'falha ao excluir médico',
		};
		logger.error(response.payload, error);
		return res.status(500).send(response);
	}
};
