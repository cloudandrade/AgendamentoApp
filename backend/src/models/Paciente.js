const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Paciente = db.sequelize.define(
	'paciente',
	{
		nome: {
			type: STRING,
			required: true,
		},
		telefone: {
			type: STRING,
		},
		idade: {
			type: INTEGER,
			required: true,
		},
		endereco_id: {
			type: INTEGER,
			required: true,
		},
		email: {
			type: STRING,
			required: true,
		},
		senha: {
			type: STRING,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Paciente',
		tableName: 'paciente',
	}
);

/*Paciente.sync({
    force: true
})*/
module.exports = Paciente;
