const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Medico = db.sequelize.define(
	'medico',
	{
		nome: {
			type: STRING,
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
		modelName: 'Medico',
		tableName: 'medico',
	}
);

/*Medico.sync({
    force: true
})*/
module.exports = Medico;
