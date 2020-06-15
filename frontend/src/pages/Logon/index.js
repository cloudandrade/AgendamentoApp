import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import medicalImg from '../../assets/doctor2.png';
import logoImg from '../../assets/medical.png';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '43ch',
		},
	},
}));

export default function Logon() {
	const [id, setId] = useState('');
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const history = useHistory();
	const classes = useStyles();

	async function handleLogin(e) {
		e.preventDefault();

		try {
			const response = await api.post('auth', { email, senha });

			if (response.data.auth === true) {
				localStorage.setItem(
					'accessToken',
					response.data.accessToken
				);
				localStorage.setItem(
					'idMedico',
					response.data.payload.id
				);
				localStorage.setItem(
					'nomeMedico',
					response.data.payload.nome
				);
			}

			history.push('/profile');
		} catch (error) {
			console.log(error);
			alert('Falha no login');
		}
	}

	return (
		<div className="logon-container">
			<section className="form">
				<img
					src={logoImg}
					alt="Medical agendamento"
					className="logoImg"
				/>
				<form
					className={classes.root}
					noValidate
					autoComplete="off"
				>
					<h1>Login</h1>
					<Grid>
						<TextField
							className="textfield"
							id="mail"
							label="Email"
							variant="outlined"
							color={'secondary'}
							onChange={(event) =>
								setEmail(event.target.value)
							}
						/>
						<TextField
							id="pass"
							label="Senha"
							type="password"
							variant="outlined"
							color={'secondary'}
							onChange={(event) =>
								setSenha(event.target.value)
							}
						/>
					</Grid>
					<button
						type="button"
						className="button"
						onClick={(e) => handleLogin(e)}
					>
						Entrar
					</button>

					{/* <Link to="/register" className="back-link">
						<FiLogIn
							size={16}
							color={'#E02041'}
						></FiLogIn>
						Não tenho cadastro
					</Link> */}
				</form>
			</section>
			<img
				src={medicalImg}
				alt="Medical"
				width="800"
				height="550"
			/>
		</div>
	);
}
