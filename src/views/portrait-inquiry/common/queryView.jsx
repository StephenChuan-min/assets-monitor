import React from 'react';
import { message, Radio, Icon } from 'antd';
import { navigate } from '@reach/router';
import { Button, Icon as Iconfont, Input } from '@/common';
import { clearEmpty, getQueryByName } from '@/utils';
import { inquiryCheck } from '../inquiry-check';

export default class QueryView extends React.Component {
	constructor(props) {
		super(props);
		const res = this.toGetQueryValue();
		this.state = {
			obligorType: props.type || res.type || 1,
			obligorName: res.name || '',
			obligorNumber: res.num || '',
			loading: false,
		};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
		this.onClick();
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.handleQuery();
				document.activeElement.blur();
			}
		}
	};


	toGetQueryValue=() => {
		const { href } = window.location;
		const type = Number(getQueryByName(href, 'type'));
		const name = getQueryByName(href, 'name');
		const num = getQueryByName(href, 'num');
		return { type, name, num };
	};

	onHandleChange = (e, field) => {
		const { obligorType } = this.state;
		const value = typeof e === 'object' ? e.target.value : e;
		if (field === 'obligorType' && obligorType !== value) {
			this.setState({
				[field]: value,
				obligorName: '',
				obligorNumber: '',
			});
		} else {
			this.setState({ [field]: value });
		}
	};

	/* 一键查询债务人画像 */
	handleQuery=() => {
		const { onQuery } = this.props;
		const { obligorType: type, obligorName: name, obligorNumber: number } = this.state;
		if (type === 1) {
			if (!name) {
				message.error('请输入债务人名称');
			} else if (name.length < 2) {
				message.error('债务人名称请至少输入两个字');
			} else {
				navigate(`/inquiry/list?type=1&name=${name.trim()}`);
				if (onQuery) {
					onQuery(clearEmpty({
						type,
						name,
						number,
					}));
				}
			}
		} else if (type === 2) {
			if (!name || !number) {
				message.error('债务人名称 或 债务人证件号 不能为空！');
			} else if (name.length < 2) {
				message.error('债务人名称请至少输入两个字');
			} else if (number.length < 7) {
				message.error('个人债务人证件号不得小于7位');
			} else if (!name && !number) {
				message.error('请输入债务人名称及证据号');
			} else if (name && number) {
				this.setState({ loading: true });
				// eslint-disable-next-line radix
				const _dd = Number.parseInt(Math.random() * 1000);
				inquiryCheck(`/inquiry/personal?type=2&name=${name.trim()}&num=${number.trim()}&dd=${_dd}`, 2)
					.then(() => {
						global.PORTRAIT_INQUIRY_AFFIRM = false;
						this.setState({ loading: false });
					})
					.catch(() => {
						this.setState({ loading: false });
					});
			}
			// if (name && number) {
			// 	navigate(`/inquiry/personal?type=2&name=${name}&num=${number}`);
			// 	window.location.reload(); // 退出登录刷新页面
			// } else if (!name || !number)message.error('债务人名称 或 债务人证件号 不能为空！');
			// else if (name.length < 2) message.error('债务人名称请至少输入两个字');
			// else if (number.length < 7) message.error('个人债务人证件号不得小于7位');
			// else message.error('请输入债务人名称及证据号');
		}
	};

	onClick=() => {
		const { onQuery } = this.props;
		const { obligorType, obligorName, obligorNumber } = this.state;
		if (onQuery) {
			onQuery({
				type: obligorType,
				name: obligorName,
				number: obligorNumber,
			});
		}
	};

	render() {
		const {
			obligorType, obligorName, obligorNumber, loading,
		} = this.state;
		return (
			<div className="yc-inquiry-common">
				<div className="yc-query-item" style={{ height: 34, paddingTop: 7 }}>
					<span className="yc-query-item-title">债务人类型：</span>
					<Radio.Group onChange={e => this.onHandleChange(e, 'obligorType')} value={obligorType}>
						<Radio key="a" value={1}>企业</Radio>
						<Radio key="b" value={2}>个人</Radio>
					</Radio.Group>
				</div>
				<div className="yc-query-item yc-query-item-text1">
					<Input
						clear
						title={[
							<Iconfont type="icon-symbol-star" style={{ fontSize: 10, color: '#FB5A5C' }} />,
							' 债务人名称',
						]}
						size="large"
						style={{ width: 350 }}
						placeholder="请输入债务人名称"
						titleWidth={100}
						maxLength="40"
						onChange={e => this.onHandleChange(e, 'obligorName')}
						value={obligorName}
					/>
				</div>
				{
					obligorType === 2 ? (
						<div className="yc-query-item yc-query-item-text2">
							<Input
								clear
								title={[
									<Iconfont type="icon-symbol-star" style={{ fontSize: 10, color: '#FB5A5C' }} />,
									' 债务人证件号',
								]}
								size="large"
								placeholder="请输入债务人证件号"
								titleWidth={100}
								maxLength="18"
								style={{ width: 350 }}
								onChange={e => this.onHandleChange(e, 'obligorNumber')}
								value={obligorNumber}
							/>
						</div>
					) : null
				}
				<div className="yc-query-item" style={{ float: 'right', marginRight: 0 }}>
					<Button type="primary" style={{ width: 100 }} size="large" onClick={this.handleQuery} disabled={loading}>
						{loading && <Icon type="loading" style={{ marginRight: 8 }} />}
						<span style={{ fontSize: 14, letterSpacing: 1 }}>查询</span>
					</Button>
				</div>
			</div>
		);
	}
}
