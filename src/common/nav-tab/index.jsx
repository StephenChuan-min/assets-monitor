import React from 'react';
import { navigate } from '@reach/router';
import Icon from '@/common/icon';
import './style.scss';

const Item = (props) => {
	const {
		title, active, icon, img, selectImg, onClick,
	} = props;
	const className = active ? 'nt-item nt-item_active' : 'nt-item';
	const imgUrl = active ? (selectImg || img) : img;
	return (
		<div className={className} onClick={onClick}>
			<div className="nt-item-icon">
				{ icon ? <Icon type={icon} /> : (img && <img src={imgUrl} alt="" />) }
			</div>
			<div className="nt-item-span">
				<span>{title}</span>
			</div>
			<div className="active-status" />
		</div>
	);
};

export default class NavTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: this.toGetDefaultCurrent(),
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

	onHashChange =() => {
		const { current } = this.state;
		const _current = this.toGetDefaultCurrent();
		if (_current !== current) {
			this.setState({
				current: _current,
			});
		}
	};

	toGetDefaultCurrent=() => {
		const { source = [] } = this.props;
		const { hash } = window.location;
		if (source.length) {
			let _current = '';
			let _default = '';
			source.forEach((i) => {
				if (i.root) _default = i.id;
				if (new RegExp(i.url.replace('/*', '')).test(hash) && !i.root) {
					_current = i.id;
				}
			});
			return _current || _default || source[0].id;
		}
		return null;
	};

	onClick=(item) => {
		const { current } = this.state;
		const { id } = item;
		if (current !== id) {
			this.setState({ current: id });
			navigate(item.url.replace('/*', ''));
		}
	};

	render() {
		const { current } = this.state;
		const { source = [], noLine, suffix } = this.props;
		const _source = source.filter(i => i.status);
		const _current = _source.length > 1 ? current : null;
		return [
			<div className={`yc-nav-tab-wrapper${_current ? '' : ' yc-nav-single'}`}>
				<span>
					<div className="nt-content">
						{_source.map(i => <Item active={_current === i.id} {...i} key={i.id} onClick={() => this.onClick(i)} />)}
					</div>
				</span>
				<div className="nt-suffix">{suffix && suffix}</div>
			</div>,
			noLine ? null : <div className="yc-nav-tab-line" />,
		];
	}
}
