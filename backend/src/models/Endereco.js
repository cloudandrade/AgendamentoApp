const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Endereco = db.sequelize.define(
	'endereco',
	{
		logradouro: {
			type: STRING,
			required: true,
		},
		numero: {
			type: INTEGER,
			required: true,
		},
		bairro: {
			type: STRING,
			required: true,
		},
		cidade: {
			type: STRING,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Endereco',
		tableName: 'endereco',
	}
);

/*Endereco.sync({
    force: true
})*/
module.exports = Endereco;
