import 'date-fns';
import React, { useState, useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/medical.png';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import brLocale from 'date-fns/locale/pt-BR';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getListaAgendamentos } from '../../services/api';

export default function Agendamentos(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [rows, setRows] = useState([]);
	const [value, setValue] = useState('');
	const ongId = localStorage.getItem('ongId');
	const history = useHistory();
	const [selectedDate, setSelectedDate] = React.useState(
		new Date()
	);

	useEffect(() => {
		let json = { data: selectedDate };
		getListaAgendamentos(json).then((response) => {
			setRows(response.data.payload);
		});
	}, [selectedDate]);

	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Medical" />
					<p>
						Listar consultas marcadas por data do
						agendamento
					</p>
					<MuiPickersUtilsProvider
						utils={DateFnsUtils}
						locale={brLocale}
					>
						<KeyboardDatePicker
							className="datePicker"
							autoOk
							variant="inline"
							inputVariant="outlined"
							label="Data do agendamento"
							format="dd/MM/yyyy"
							value={selectedDate}
							InputAdornmentProps={{
								position: 'start',
							}}
							onChange={(date) =>
								handleDateChange(date)
							}
						/>
					</MuiPickersUtilsProvider>

					<Link to="/profile" className="back-link">
						<FiArrowLeft
							size={16}
							color={'#E02041'}
						></FiArrowLeft>
						Voltar para Home
					</Link>
				</section>
				<form noValidate>
					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										Horários
									</TableCell>
									<TableCell align="center">
										Nome do Cliente
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.length ? (
									rows.map((row) => (
										<TableRow key={row.name}>
											<TableCell
												component="th"
												scope="row"
												align="center"
											>
												{row.horario.replace(
													'.',
													':'
												)}
											</TableCell>
											<TableCell align="center">
												{row.nome}
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell align="right">
											Não há registros
										</TableCell>
										<TableCell align="left">
											a serem exibidos
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</form>
			</div>
		</div>
	);
}
