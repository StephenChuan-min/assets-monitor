import React from 'react';
import { Tooltip } from 'antd';
import { parseQuery } from '@/utils';
import Badge from '../badge';
import './style.scss';

const toGetDefaultActive = (source, field, defaultCurrent, hashUrl) => {
	const { hash } = window.location;
	if (source && source.length > 0) {
		if (hashUrl) {
			const toTest = path => new RegExp(path.replace(/\/\*/, '')).test(hash);
			const res = source.filter(i => toTest(i.path));
			if (res.length > 1) return res[1].id;
			return res[0].id;
		}
		if (field) {
			const res = parseQuery(hash)[field];
			const r = (Number.isNaN(res * 1) ? res : Number(res)) || -100;
			return ((source.filter(item => item.id === r)[0]) || {}).id || source[0].id;
		}
		return defaultCurrent || source[0].id;
	}
	return defaultCurrent;
};
const numUnit = val => (val > 10000 ? `${(val / 10000).toFixed(1)}万` : val);

class SimpleTab extends React.Component {
	constructor(props) {
		super(props);
		const {
			source, field, defaultCurrent, hashUrl,
		} = props;
		const active = toGetDefaultActive(source, field, defaultCurrent, hashUrl) || props.defaultCurrent;
		this.state = {
			active,
		};
		this.active = active;
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
		const { onChange } = this.props;
		const {
			source, field, defaultCurrent, hashUrl,
		} = this.props;
		const res = toGetDefaultActive(source, field, defaultCurrent, hashUrl);
		if (res !== active) {
			this.setState({ active: res });
			this.active = res;
			if (onChange)onChange(res);
		}
	};

	onClick=(item) => {
		if (!item.disabled) {
			const { onChange } = this.props;
			this.setState({ active: item.id });
			this.active = item.id;
			if (onChange)onChange(item.id, item);
		}
	};

	render() {
		const {
			rightRender, source, prefix, type, symbol, suffix, borderBottom,
		} = this.props;
		let symbolAry = ['（', '）'];
		if (symbol === 'none')symbolAry = [' ', ''];
		if (symbol === '1')symbolAry = ['「', '」'];

		const { active } = this.state;
		return (
			<div className={`yc-tabs-wrapper yc-tabs-simple yc-tabs-simple-${type || 'warning'} ${borderBottom ? ' bottom-line' : ''}`}>
				<ul>
					{prefix || ''}
					{source && source.map(item => (
						<li
							className={`${active === item.id ? 'yc-tabs-active' : 'yc-tabs-un-active'} yc-tabs-li${item.disabled ? ' yc-tabs-disabled' : ''}`}
							onClick={() => this.onClick(item)}
						>
							<div className="yc-tabs-active-line" />
							{
								item.tooltip ? (
									<Tooltip placement="top" title={item.tooltip}>
										<span>
											<Badge dot={item.dot}>
												{ item.showNumber ? `${item.name}${symbolAry[0]}${numUnit(item.number)}${symbolAry[1]}` : item.name}
											</Badge>
										</span>
									</Tooltip>
								) : (
									<Badge dot={item.dot}>
										{ item.showNumber ? `${item.name}${symbolAry[0]}${numUnit(item.number)}${symbolAry[1]}` : item.name}
									</Badge>
								)
							}
						</li>
					))}
					{suffix || ''}
					<div style={{ clear: 'both' }} />
				</ul>
				<div className="yc-tabs-right">
					{ rightRender ? rightRender() : '' }
				</div>
			</div>
		);
	}
}

SimpleTab.toGetDefaultActive = toGetDefaultActive;
export default SimpleTab;
