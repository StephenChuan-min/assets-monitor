import React from 'react';
import {
	Button, Form, message, Tooltip,
} from 'antd';
import { navigate } from '@reach/router';
import { DatePicker, Input, timeRule } from '@/common';
import { generateUrlWithParams, objectKeyIsEmpty } from '@/utils';
import close from '@/assets/img/icon/close.png';
import add from '@/assets/img/icon/icon_add.png';
import './style.scss';

const createForm = Form.create;
const _style1 = { width: 116 };

class LAWSUITS extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			startTime: undefined,
			endTime: undefined,
			type: 1,
			plaintiff: [
				{
					name: '',
					id: 1,
				},
			],
			defendant: [
				{
					name: '',
					id: 1,
				},
			],
		};
	}

	componentDidMount() {
		window._addEventListener(document, 'keyup', this.toKeyCode13);
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
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 切换信息类型
	changeType = (type) => {
		switch (type) {
		case 1:
			this.setState({
				type,
			});
			break;
		case 2:
			this.setState({
				type,
			});
			break;
		default:
			break;
		}
	};

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const {
			startTime, endTime, plaintiff, defendant, type,
		} = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		fildes.startLarq = startTime;
		fildes.endLarq = endTime;
		fildes.type = type;
		fildes.plaintiff0 = plaintiff[0] ? plaintiff[0].name : undefined;
		fildes.plaintiff1 = plaintiff[1] ? plaintiff[1].name : undefined;
		fildes.plaintiff2 = plaintiff[2] ? plaintiff[2].name : undefined;
		fildes.defendant0 = defendant[0] ? defendant[0].name : undefined;
		fildes.defendant1 = defendant[1] ? defendant[1].name : undefined;
		fildes.defendant2 = defendant[2] ? defendant[2].name : undefined;
		console.log(fildes, type);
		// 判断是否为空对象,非空请求接口
		if (!objectKeyIsEmpty(fildes)) {
			// 将值传到URL
			navigate(generateUrlWithParams('/search/detail/lawsuits', fildes));
		} else {
			message.error('请至少输入一个搜索条件');
		}
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		this.setState({
			startTime: undefined,
			endTime: undefined,
			plaintiff: [
				{
					name: '',
					id: 1,
				},
			],
			defendant: [
				{
					name: '',
					id: 1,
				},
			],
		});

		resetFields('');
	};

	handlePlaintiff = (e, id) => {
		const { plaintiff } = this.state;
		if (plaintiff && plaintiff.length > 0) {
			plaintiff.forEach((i, index) => {
				if (i.id === id) {
					plaintiff[index].name = e.trim();
				}
			});
			this.setState({
				plaintiff,
			});
		}
	};

	addPlaintiff = () => {
		const { plaintiff } = this.state;
		plaintiff.push({
			name: '',
			id: plaintiff.length + 1,
		});
		this.setState({
			plaintiff,
		});
	};

	// 删除
	deletePlaintiff = (id) => {
		let { plaintiff } = this.state;
		plaintiff = plaintiff.filter(key => key.id !== id);
		// console.log(id);
		// Todo  array.map 修改原数据
		// eslint-disable-next-line no-param-reassign
		plaintiff.map((item, index) => (item.id = index + 1));
		this.setState({
			plaintiff,
		});
	};

	handleDefendant = (e, id) => {
		const { defendant } = this.state;
		if (defendant && defendant.length > 0) {
			defendant.forEach((i, index) => {
				if (i.id === id) {
					defendant[index].name = e.trim();
				}
			});
			this.setState({
				defendant,
			});
		}
	};

	addDefendant = () => {
		const { defendant } = this.state;
		defendant.push({
			name: '',
			id: defendant.length + 1,
		});
		this.setState({
			defendant,
		});
	};

	// 删除
	deleteDefendant = (id) => {
		let { defendant } = this.state;
		defendant = defendant.filter(key => key.id !== id);
		// console.log(id);
		// Todo  array.map 修改原数据
		// eslint-disable-next-line no-param-reassign
		defendant.map((item, index) => (item.id = index + 1));

		this.setState({
			defendant,
		});
	};

	render() {
		const {
			plaintiff, defendant,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		return (
			<div className="yc-tabs-data" style={{ padding: '0 22px' }}>
				<div className="yc-tabs-items">
					{plaintiff.map(item => (
						<div key={item.id} className="item" style={{ 'margin-right': 16 }}>
							<Input
								title="原告"
								value={item.name}
								placeholder="个人/企业名称"
								onChange={e => this.handlePlaintiff(e, item.id)}
								maxLength="40"
							/>
							{plaintiff.length > 1 ? (
								<Tooltip placement="top" title="删除">
									<img
										alt=""
										className="close"
										src={close}
										onClick={() => this.deletePlaintiff(item.id)}
									/>
								</Tooltip>
							) : null}
						</div>
					))}
					{plaintiff.length > 2 ? (
						<span style={{ 'margin-top': 8, display: 'inline-block', color: '#FB5A5C' }}>
							最多添加3个
						</span>
					) : (
						<Tooltip placement="top" title="添加">
							<img
								alt=""
								style={{
									'margin-top': 8, cursor: 'pointer', width: 16, height: 16,
								}}
								src={add}
								onClick={() => this.addPlaintiff()}
							/>
						</Tooltip>
					)}
				</div>
				<div className="yc-tabs-items">
					{defendant.map(item => (
						<div className="item" style={{ 'margin-right': 16 }}>
							<Input
								key={item.id}
								title="被告"
								maxLength="40"
								value={item.name}
								placeholder="姓名/公司名称"
								onChange={e => this.handleDefendant(e, item.id)}
							/>
							{defendant.length > 1 ? (
								<Tooltip placement="top" title="删除">
									<img
										alt=""
										className="close"
										src={close}
										onClick={() => this.deleteDefendant(item.id)}
									/>
								</Tooltip>
							) : null}
						</div>
					))}
					{defendant.length > 2 ? (
						<span style={{ 'margin-top': 8, display: 'inline-block', color: '#FB5A5C' }}>
							最多添加3个
						</span>
					) : (
						<Tooltip placement="top" title="添加">
							<img
								alt=""
								style={{
									'margin-top': 8, cursor: 'pointer', width: 16, height: 16,
								}}
								src={add}
								onClick={() => this.addDefendant()}
							/>
						</Tooltip>
					)}
				</div>
				<div className="yc-tabs-items">
					<div className="item" style={{ 'margin-right': 16 }}>
						<Input
							title="起诉法院"
							placeholder="法院名称"
							maxLength="20"
							{...getFieldProps('court', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ 'margin-right': 16 }}>
						<Input
							title="案号"
							maxLength="40"
							placeholder="案件编号"
							{...getFieldProps('ah', { getValueFromEvent: e => e.trim() })}
						/>
					</div>
					<div className="item" style={{ 'margin-right': 0, width: 316 }}>
						<span>日期选择：</span>
						<DatePicker
							placeholder="开始日期"
							size="large"
							style={_style1}
							{...getFieldProps('uploadTimeStart', {
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										startTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('uploadTimeEnd'))}
							allowClear
						/>
						<span style={{ margin: '0 2px ' }}>至</span>
						<DatePicker
							placeholder="结束日期"
							size="large"
							style={_style1}
							{...getFieldProps('uploadTimeEnd', {
								onChange: (value, dateString) => {
									console.log(value, dateString);
									this.setState({
										endTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('uploadTimeStart'))}
							allowClear
						/>
					</div>
				</div>
				{/* <div className="others">
					<span>信息类型：</span>
					<span>
						<Button
							size="large"
							type="ghost"
							style={{ 'margin-right': 16 }}
							className={checkedType === 1 ? 'yc-checked-btn' : null}
							onClick={() => this.changeType(1)}
						>
							{checkedType === 1 ? <img src={checkoutIcon} alt="" /> : ''}
							立案信息
						</Button>
					</span>
					<Button
						size="large"
						type="ghost"
						className={checkedType === 2 ? 'yc-checked-btn' : null}
						onClick={() => this.changeType(2)}
					>
						{checkedType === 2 ? <img src={checkoutIcon} alt="" /> : ''}
						开庭公告
					</Button>
				</div> */}
				<div className="btn">
					<Button
						type="primary"
						size="large"
						className="yc-high-search"
						onClick={this.search}
					>
						搜索
					</Button>
					<Button onClick={this.queryReset} type="ghost" size="large">
						重置搜索条件
					</Button>
				</div>
			</div>
		);
	}
}
export default createForm()(LAWSUITS);
export const Name = 'LAWSUITS';
