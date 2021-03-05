/*!
 * selectSearch v1.2.3
 * 公共组件 selectSearch
 *
 * @author async
 * 2019.07.03
 */

import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'reactPropTypes';

import Portal from './portal';
import './index.scss';
import statusDown from '../../assets/img/home/status-down.jpg';
import statusUp from '../../assets/img/home/status-up.jpg';
// import { findInArray } from '@/utils/arrayOperation';
// 是否为IE
const _msieBrowser = /msie/i.test(navigator.userAgent);

// 通过class获取元素
const getContainer = (className) => {
	// console.log(className);
	if (className) {
		return window.$
			? window.$(`.${className}`)[0]
			: document.getElementsByClassName(className)[0];
	}
	return null;
};

// 获取元素的位置
const getPosition = (dom, parent) => {
	let top = dom.offsetTop; 		// 叠加父容器的上边距
	let left = dom.offsetLeft;
	let ele = dom;
	while (ele !== parent && ele !== null) {
		top += ele.offsetTop;
		left += ele.offsetLeft;
		ele = ele.offsetParent;
	}
	top += (dom.clientHeight + 5);
	return {
		top, left,
	};
};

// 获取option的默认值
const getOptionLabel = (props) => {
	if (props.defaultValue) {
		const list = Array.isArray(props.children) ? props.children : [props.children];
		for (let i = 0; i < list.length; i += 1) {
			if (list[i].props.value === props.defaultValue) {
				return list[i].props.label || list[i].props.children;
			}
		}
	}
	return '';
};

// Option 组件过滤方法
const getOptionChild = (children, props) => {
	const {
		inputValue, inputStatus, selectLabel, selectValue,
	} = props;
	const baseList = Array.isArray(children) ? children : [children];
	let resList = baseList;
	if (inputValue || inputStatus === 'input') {
		resList = [];
		baseList.forEach((item) => {
			const _item = item;
			const str = `${item.props.label || item.props.children}`;
			_item.props.selected = selectLabel === str || selectValue === item.props.value;
			if (new RegExp(inputValue).test(str) || selectValue === item.props.value) resList.push(_item);
		});
	}
	resList = resList.length > 0 ? resList : [{ disabled: true, props: { value: null, children: '无数据' } }];
	return resList;
};

// Option 组件
const Option = (props) => {
	const {
		children, onClick, getPopupContainerClassName, refInfo,
	} = props;
	const style = {
		top: refInfo.wrapPosition.top || 0,
		left: refInfo.wrapPosition.left || 0,
		width: refInfo.wrapWidth || 'auto',
	};
	if (getPopupContainerClassName) {
		style.position = 'absolute';
	}
	const child = getOptionChild(children, props);
	return (
		<div className="yc-select-option" style={style}>
			<div className="yc-select-option-wrapper">
				<div className="yc-select-option-list">
					{
						child.map((item) => {
							const option = item.props;
							const disabled = item.disabled || option.disabled;
							const _className = ['option-list'];
							if (disabled)_className.push('option-list-disabled');
							if (option.selected)_className.push('option-list-selected');
							return (
								<li
									className={_className.join(' ')}
									key={option.value}
									onClick={() => {
										if (!disabled) onClick(option);
									}}
								>
									{option.children}
									<div
										className="option-list-mask"
										data-search="option"
									/>
								</li>
							);
						})
					}
				</div>
			</div>
		</div>
	);
};

/* 基础模块 InputSearch */
class selectSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: props.defaultValue,
			selectLabel: getOptionLabel(props),
			inputValue: '',
			inputStatus: props.defaultValue ? 'entered' : 'empty',
			iconStatus: 'down',
			visible: false,
		};
		// inputStatus 三种情况：1.未输入[empty] 2.已输入[entered] 3.需淡化[input],4.输入中[enter]
		// iconStatus 三种情况：1.down 2.up 3.clear

		this.refInfo = {
			input: '',
			wrapper: '',
			wrapWidth: '',
			wrapPosition: {},
		};
	}

	componentDidMount() {
		const body = document.getElementsByTagName('body')[0];
		window._addEventListener(body, 'click', this.onBodyClick);
		window._addEventListener(this.refInfo.input, (_msieBrowser ? 'keyup' : 'input'), this.onChange);
	}

	componentWillReceiveProps(nextProps) {
		// console.log('nextProps:', nextProps.value);

		if (nextProps.value) {
			this.setState({
				inputStatus: 'entered',
				selectLabel: nextProps.value,
			});
		}
	}

	componentDidUpdate() {
		const { inputStatus } = this.state;
		if (inputStatus === 'input' && document.activeElement !== this.refInfo.input) {
			this.refInfo.input.focus();
		}
	}


	componentWillUnmount() {
		window._removeEventListener(document.getElementsByTagName('body')[0], 'click', this.onBodyClick);
		window._removeEventListener(this.refInfo.input, (_msieBrowser ? 'keyup' : 'input'), this.onChange);
	}

	// 刷新获取元素位置和高度
	toCalculate=() => {
		const { wrapper } = this.refInfo;
		const { getPopupContainerClassName } = this.props;
		this.refInfo = {
			input: '',
			wrapper: '',
			wrapWidth: '',
			wrapPosition: {},
		};
		this.refInfo.wrapWidth = wrapper.clientWidth + 2;
		this.refInfo.wrapPosition = getPosition(wrapper, getContainer(getPopupContainerClassName));
	};

	// 聚焦 input【focus】
	toInputFocus=() => {
		const { input } = this.refInfo;
		input.value = '';
		this.setState({
			inputStatus: 'input',
			iconStatus: 'up',
			inputValue: '',
			visible: true,
		});
		this.toCalculate();
	};

	// 获取 wrapper 的className
	toWrapperClassName = (inputStatus) => {
		if (inputStatus === 'empty' || inputStatus === 'entered') return '';
		return 'yc-select-focus yc-select-active';
	};

	// body添加的鉴听事件
	onBodyClick=(e) => {
		const { visible, selectLabel, selectValue } = this.state;
		const { onBlur } = this.props;
		// e.stopImmediatePropagation();
		if (visible) {
			let option = '';
			if (window.$) {
				option = window.$(e.srcElement).attr('data-search');
			} else {
				option = e.target.dataset.search;
			}
			// console.log('option:', option);
			if (option === 'icon-mask') return null;
			if (option !== 'option' && option !== 'input') {
				this.setState({
					visible: false,
					iconStatus: 'down',
					inputStatus: selectLabel ? 'entered' : 'empty',
				});
				if (onBlur)onBlur(selectValue);
			}
		}
		return null;
	};

	// input Focus 方法
	onFocus=(e) => {
		const { onFocus } = this.props;
		if (onFocus) { onFocus(e); }
	};

	// input 变化的方法
	onChange=(e) => {
		const { onSearch } = this.props;
		const inputValue = e.target.value;
		// console.log('onChange');
		this.setState({
			inputStatus: inputValue ? 'enter' : 'input',
			inputValue,
		});
		onSearch(inputValue);
	};

	// 列表点击后的结果
	handleOptionClick =(item) => {
		const { onChange, onBlur } = this.props;
		this.setState({
			selectLabel: item.label || item.children,
			selectValue: item.value,
			inputStatus: 'entered',
			iconStatus: 'down',
			visible: false,
		});
		if (onChange) { onChange(item.value); }
		if (onBlur) { onBlur(item.value); }
	};

	// icon 点击监听后的结果
	handleSelectIcon=() => {
		// console.log('onSelectIcon:', event);
		const { clear, onBlur } = this.props;
		const { input } = this.refInfo;
		const { selectLabel, visible, selectValue } = this.state;
		if (visible) {
			if (input.value && clear) {
				this.toInputFocus();
			} else {
				this.setState({
					visible: false,
					iconStatus: 'down',
					inputStatus: selectLabel ? 'entered' : 'empty',
				});
				if (onBlur)onBlur(selectValue);
			}
		} else {
			this.toInputFocus();
		}
	};

	// icon 点击后 当clear为真时
	handleSelectIconClear =() => {
		const { onChange, onBlur } = this.props;
		this.setState({
			selectLabel: '',
			selectValue: '',
			iconStatus: 'down',
			inputStatus: 'empty',
			inputValue: '',
		});
		onChange(null);
		onBlur('');
	};

	render() {
		const {
			selectValue, selectLabel, inputStatus, iconStatus, visible, inputValue,
		} = this.state;

		const {
			children, className, placeholder, getPopupContainerClassName, clear, style,
		} = this.props;

		const info = {
			refInfo: this.refInfo,
			children,
			getPopupContainerClassName,
			inputStatus,
			inputValue,
			selectLabel,
			selectValue,
		};

		// console.log('inputSlelec:', info);
		const _placeholder = selectLabel || placeholder || '请输入';
		const wrapperClassName = this.toWrapperClassName(inputStatus);
		const Container = getContainer(getPopupContainerClassName);

		return (
			<div className={`yc-select-wrapper ${className || ''}`} style={style}>
				<div className="yc-select">
					<div
						className={`yc-select-content-wrapper ${wrapperClassName}`}
						ref={e => this.refInfo.wrapper = e}
					>
						{/* clear 按钮 是否显示 */}
						<div
							className="yc-select-selection-icon_clear"
							style={(selectLabel || inputValue) && clear ? { display: 'block' } : { display: 'none' }}
							onClick={e => this.handleSelectIconClear(e)}
						>
							<Icon type="cross-circle" />
							<div className="yc-select-icon-mask" data-search="icon-mask" />
						</div>
						<div
							className="yc-select-selection_icon"
							onClick={e => this.handleSelectIcon(e)}
						>
							{{
								down: <img src={statusDown} alt="" />,
								up: <img src={statusUp} alt="" />,
							}[iconStatus]}
							<div className="yc-select-icon-mask" data-search="icon-mask" />
						</div>

						<div className="yc-select-selection_content">
							<div
								unselectable="unselectable"
								className={`yc-select-selection_placeholder yc-select-placeholder_${inputStatus}`}
								onClick={this.toInputFocus}
								data-search="mask"
							>
								<span>{_placeholder}</span>
							</div>
							<div
								className="yc-select-selection_input"
								style={(inputStatus === 'empty' || inputStatus === 'entered') ? { display: 'none' } : { display: 'block' }}
							>
								<input
									ref={e => this.refInfo.input = e}
									type="text"
									className="yc-select-input"
									onFocus={e => this.onFocus(e)}
									data-search="input"
								/>
							</div>
						</div>

					</div>
					<Portal visible={visible} Container={Container}>
						<Option {...info} onClick={this.handleOptionClick} />
					</Portal>

				</div>
			</div>

		);
	}
}

selectSearch.propTypes = {
	style: PropTypes.obj,
	// 是否添加style样式
	clear: PropTypes.bool,
	// 是否增加清除按钮
	onBlur: PropTypes.func,
	// 选择框失焦事件
	onSearch: PropTypes.func,
	// 选择框Input输入时变化
	onChange: PropTypes.func,
	// 选择框列表，选择后返回
	getPopupContainerClassName: PropTypes.string,
	// 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。
	placeholder: PropTypes.string,
	// 选择框默认文字
	className: PropTypes.string,
	// 选择框的样式
	children: PropTypes.element,
	// 选择框默认值
	defaultValue: PropTypes.string,
};

selectSearch.defaultProps = {
	style: {},
	clear: false,
	onBlur: () => {},
	onChange: () => {},
	onSearch: () => {},
	getPopupContainerClassName: null,
	placeholder: 'Select a option',
	className: null,
	children: null,
	defaultValue: '',
};

selectSearch.Option = prop => <div>{prop.children}</div>;

export default selectSearch;
