import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImg from '../../assets/medical.png';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api, { getListaPacientes } from '../../services/api';

export default function Profile() {
	const nomeMedico = localStorage.getItem('nomeMedico');

	const [pacientes, setPacientes] = useState([]);
	const history = useHistory();

	useEffect(() => {
		getListaPacientes()
			.then((response) => {
				setPacientes(response.data.payload);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	async function handleLogout() {
		localStorage.clear();
		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="medical" />
				<span>Bem vindo(a), {nomeMedico}</span>
				<Link className="button" to="/agendamentos">
					Agendamentos
				</Link>
				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1>Pacientes</h1>
			<ul>
				{pacientes.length ? (
					pacientes.map((paciente) => (
						<li key={paciente.id}>
							<strong>Paciente:</strong>
							<p>{paciente.nome}</p>

							<strong>Email:</strong>
							<p>{paciente.email}</p>

							<strong>idade</strong>
							<p>{paciente.idade}</p>
						</li>
					))
				) : (
					<h3>
						Não há pacientes cadastrados para você ainda
					</h3>
				)}
			</ul>
		</div>
	);
}
