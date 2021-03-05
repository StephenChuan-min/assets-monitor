import React from 'react';
import { parseQuery } from '@/utils';
import Badge from '../badge';
import Simple from './simple';
import './style.scss';

// 获取默认路由 选中
const toGetDefaultActive = (source, field) => {
	const { hash } = window.location;
	let res = '';
	if (field) {
		return Number(parseQuery(hash)[field]) || source[0].id;
	}
	source.forEach((item) => {
		if (new RegExp(item.url).test(hash)) {
			res = item.id;
		}
	});
	return res || source[0].id;
};

// 数值超过10000，加单位
const numUnit = val => (val > 10000 ? `${(val / 10000).toFixed(1)}万` : val);


class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: props.defaultCurrent || toGetDefaultActive(props.source, props.field),
		};
	}

	componentWillMount() {
		this.onHashChange();
	}

	componentDidMount() {
		window._addEventListener(window, 'hashchange', this.onHashChange);
	}

	componentWillUnmount() {
		window._removeEventListener(window, 'hashchange', this.onHashChange);
	}

	onHashChange=() => {
		const { active } = this.state;
		const { source, field } = this.props;
		const _result = toGetDefaultActive(source, field);
		// 当_result > active时请求
		if (_result !== active && this.toSetActive) {
			this.toSetActive(_result);
		}
	};

	toSetActive=(active) => {
		const { onActive } = this.props;
		this.setState({ active });
		if (onActive)onActive(active);
	};

	render() {
		const {
			simple, rightRender, onChange, source, number,
		} = this.props;
		const { active } = this.state;
		const { prefix } = this.props;
		return (
			<div className={`yc-tabs-wrapper ${simple ? 'yc-tabs-simple' : 'yc-tabs-normal'}`}>
				<ul>
					{prefix || ''}
					{source.map(item => (
						<li
							className={`${active === item.id ? 'yc-tabs-active' : 'yc-tabs-un-active'} yc-tabs-li`}
							onClick={() => {
								this.toSetActive(item.id);
								if (onChange)onChange(item);
							}}
						>
							<div className="yc-tabs-active-line" />
							<Badge dot={item.dot}>
								{number || item.showNumber ? `${item.name}「${numUnit(item.number)}」` : item.name}
							</Badge>
						</li>
					))}
				</ul>
				<div className="yc-tabs-right">
					{ rightRender ? rightRender() : '' }
				</div>

			</div>
		);
	}
}
Tabs.Simple = Simple;
export default Tabs;
