import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminPage from '../components/dashboards/adminPage';
import LandingPage from '../components/landingPage'

export default function MainNavigation() {
	return (
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route path="/admin" component={AdminPage} />
		</Switch>
	);
}
