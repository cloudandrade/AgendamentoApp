import axios from 'axios';
const APIPORT = '8001';
const URLAPI = `http://localhost:${APIPORT}`;

const api = axios.create({
	baseURL: URLAPI,
});

export default api;

export function getListaPacientes() {
	const acessToken = localStorage.getItem('accessToken');
	let token = `Bearer ${acessToken}`;

	return api.get('paciente', {
		headers: {
			Authorization: token,
		},
	});
}

export async function getListaAgendamentos(data) {
	const acessToken = await localStorage.getItem('accessToken');
	let token = `Bearer ${acessToken}`;

	const options = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	};

	return axios.post(`${URLAPI}/agendamento/list`, data, options);

	/* 	return await api.post('agendamento/list', data, {
		headers: {
			Authorization: token,
		},
	}); */
}
