const Agendamento = require('../models/Agendamento');
const { sequelize } = require('../config/db/db');
const Logger = require('../services/logger_service');
const logger = new Logger('server');

exports.create = async (req, res) => {
	logger.info('Route - Criação de Agendamento');
	let horario = req.body.horario.toFixed(2);
	let newAgendamento = {
		horario: horario.toString(),
		data: req.body.data,
		id_paciente: req.body.id_paciente,
	};

	try {
		let payload = await Agendamento.create(newAgendamento);
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao cadastrar agendamento';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};

exports.list = async (req, res) => {
	let data = req.body;
	logger.info('Route - Listagem de Agendamentos');
	data = data.data.split('T');
	data = data[0];

	sequelize
		.query(
			`SELECT agendamento.id, agendamento.data, agendamento.horario, paciente.nome, paciente.id as paciente_id 
			FROM agendamento 
			join paciente on agendamento.id_paciente = paciente.id  WHERE agendamento.data LIKE '%${data}%' ORDER BY CAST(agendamento.horario as SIGNED integer) ASC`
		)
		.then((agendamentos) => {
			let payload = agendamentos[0];
			let response = { sucess: true, payload };
			return res.send(response);
		})
		.catch((erro) => {
			let payload = 'falha ao listar agendamentos da data';
			logger.error(payload, erro);
			let response = { sucess: false, payload };
			res.status(500).send(response);
		});
};

exports.index = async (req, res) => {
	const { id } = req.params;
	logger.info('Route - Busca de Agendamento');

	try {
		const payload = await Agendamento.findOne({
			where: { id: id },
		});

		let response = { sucess: true, payload };
		if (!payload) {
			response = {
				sucess: true,
				payload: 'agendamento não encontrado',
			};
			return res.status(404).send(response);
		}
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao buscar agendamento';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};

exports.destroy = async (req, res) => {
	const { id } = req.params;
	logger.info('Route - Exclusão de Agendamento');
	try {
		await Agendamento.destroy({
			where: {
				id: id,
			},
		});

		response = {
			sucess: true,
			payload: 'Agendamento cancelado',
		};
		return res.status(204).send(response);
	} catch (error) {
		response = {
			sucess: false,
			payload: 'falha ao cancelar o agendamento',
		};
		logger.error(response.payload, error);
		return res.status(500).send(response);
	}
};
