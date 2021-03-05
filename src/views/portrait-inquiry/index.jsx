import React from 'react';
import Router from '@/utils/Router';
import Inquiry from './inquriy-view';
import InquiryList from './inquiry-list';
import Enterprise from './enterprise';
import Personal from './personal';
// import Stock from './stock-right';
import './style.scss';

export default class DefaultRouter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="yc-portrait-inquiry">
				<Router>
					<Inquiry rule={1} path="/*" />
					<InquiryList rule={2} path="/inquiry/list/*" />
					<Enterprise rule={3} path="/inquiry/enterprise/*" />
					<Personal rule={4} path="/inquiry/personal/*" />
					{/* <Stock rule={5} path="/inquiry/stock/*" /> */}
				</Router>
			</div>
		);
	}
}
