/* eslint-disable import/no-unresolved */
const { Router } = require('express');
const Auth = require('../controllers/authController');
const { checkAuthorization } = require('../middleware/auth');
const pacienteController = require('../controllers/pacienteController');
const medicoController = require('../controllers/medicoController');
const agendamentoController = require('../controllers/agendamentoController');

const routes = Router();

routes.get('/', (req, res) => {
	res.send('Server Running');
});

routes.post('/auth/', Auth.auth);

routes.get('/auth/verify/', checkAuthorization, async (req, res) => {
	res.json({
		error: null,
		data: {
			message: 'Autorizado com sucesso',
		},
	});
});

//Pacientes Routes
routes.post('/paciente', pacienteController.create);
routes.get(
	'/paciente/:id',
	checkAuthorization,
	pacienteController.index
);
routes.get('/paciente', checkAuthorization, pacienteController.list);
routes.delete(
	'/paciente/:id',
	checkAuthorization,
	pacienteController.destroy
);
//Medicos Routes
routes.post('/medico', medicoController.create);
routes.get('/medico/:id', checkAuthorization, medicoController.index);
routes.delete(
	'/medico/:id',
	checkAuthorization,
	medicoController.destroy
);

//Agendamento Routes
routes.post(
	'/agendamento',
	checkAuthorization,
	agendamentoController.create
);
routes.post(
	'/agendamento/list',
	checkAuthorization,
	agendamentoController.list
);
routes.get(
	'/agendamento/:id',
	checkAuthorization,
	agendamentoController.index
);
routes.delete(
	'/agendamento/:id',
	checkAuthorization,
	agendamentoController.destroy
);

module.exports = routes;
