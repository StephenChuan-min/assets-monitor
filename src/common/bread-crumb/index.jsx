import React from 'react';
import { navigate } from '@reach/router';
import './style.scss';


export default class BreadCrumb extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onClick=(e, i) => {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		navigate(i.link);
	};

	render() {
		const {
			suffix, className, style, font, list = [], line,
		} = this.props;
		const classList = ['yc-bread-crumb'];
		if (className) classList.push(className);
		const _style = Object.assign({}, style, font ? { fontSize: font || 14 } : {});
		const { length } = list || [];
		return [
			<div className={classList.join(' ')} style={_style}>
				{
					list.map((i, index) => {
						if (index + 1 === length) {
							return <span className="crumb-last">{i.name}</span>;
						}
						return [
							(i.link ? <a className="crumb-link" onClick={e => this.onClick(e, i)}>{i.name}</a>
								: <span className="crumb-normal">{i.name}</span>),
							<span className="bread-crumb-delimiter">/</span>,
						];
					})
				}
				{suffix || ''}
			</div>,
			line ? <div className="yc-line" /> : null,
		];
	}
}
