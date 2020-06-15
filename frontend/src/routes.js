import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon/index';
//import Register from './pages/Register/index';
import Profile from './pages/Profile/index';
import Agendamentos from './pages/Agendamentos/index';

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Logon}></Route>
				{/* <Route path="/register" component={Register}></Route> */}
				<Route path="/profile" component={Profile}></Route>
				<Route
					path="/agendamentos"
					component={Agendamentos}
				></Route>
			</Switch>
		</BrowserRouter>
	);
}
