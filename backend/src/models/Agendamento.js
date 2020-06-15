const db = require('../config/db/db');
const { INTEGER, DECIMAL, STRING } = require('sequelize');

const Agendamento = db.sequelize.define(
	'agendamento',
	{
		horario: {
			type: DECIMAL,
			required: true,
		},
		data: {
			type: STRING,
			required: true,
		},
		id_paciente: {
			type: INTEGER,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Agendamento',
		tableName: 'agendamento',
	}
);

/*Agendamento.sync({
    force: true
})*/
module.exports = Agendamento;
