import React from 'react';
import Router from '@/utils/Router';
import Open from './open';

export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Router>
				<Open path="/account" />
			</Router>
		);
	}
}
