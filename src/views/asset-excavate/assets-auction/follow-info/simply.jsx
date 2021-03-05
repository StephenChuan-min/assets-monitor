import React from 'react';
import { Steps, Modal } from 'antd';
import { processList } from 'api/monitor-info/assets-follow';
import { Button, Spin } from '@/common';
import { floatFormat } from '@/utils/format';
import './style.scss';

// step的描述内容
export const StepDesc = (props) => {
	const {
		recovery, expend, content, remindingTime, remindType, remindMobiles,
	} = props;
	// 提醒方式(1-系统消息、2-短信/邮件、3-系统+短信/邮件
	const remindTypeContent = (type) => {
		if (type === 1) return '系统消息';
		if (type === 2) return '短信/邮件';
		if (type === 3) return '系统+短信/邮件';
		return null;
	};
	const remindMobilesContent = (function methods(data) {
		if (data) {
			return (JSON.parse(data).map(item => item.name)).join(',');
		}
		return null;
	}(remindMobiles));

	return (
		<div className="font-desc">
			{
				recovery || expend ? (
					<li>
						{recovery ? `收入金额/元：${recovery !== -1 ? floatFormat(recovery.toFixed(2)) : '-'}；  ` : null}
						{expend ? `支出金额/元：${expend !== -1 ? floatFormat(expend.toFixed(2)) : '-'} ；` : null}
					</li>
				) : null
			}
			{
				content ? `备注：${content}` : null
			}
			{
				remindingTime || remindType ? (
					<li>
						{remindingTime ? `提醒日期：${new Date(remindingTime * 1000).format('yyyy-MM-dd (早上9点)')}； ` : null}
						{remindType ? `提醒方式：${remindTypeContent(remindType)}${remindMobilesContent ? `(${remindMobilesContent})` : ''}` : ''}
					</li>
				) : null
			}
		</div>
	);
};

// process 的 状态转移
export const ProcessTran = (type) => {
// （6-跟进中、9-已完成、12-已忽略、15-已放弃）
	if (type === 6 || type === 3) return '跟进中';
	if (type === 9) return '已完成';
	if (type === 12) return '已忽略';
	if (type === 15) return '已放弃';
	return null;
};

export default class SimplyFollow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			source: [],
		};
	}

	componentDidMount() {
		const { id } = this.props;
		this.toGetInfoList(id);
	}

	toGetInfoList = (id) => {
		if (id) {
			processList({ id }).then((res) => {
				const { data, code } = res;
				if (code === 200) {
					this.setState({
						source: data,
						loading: false,
					});
				} else {
					this.setState({
						source: [],
						loading: false,
					});
				}
			}).catch(() => {
				this.setState({
					source: [],
					loading: false,
				});
			});
		}
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		if (onCancel)onCancel();
	};

	render() {
		const { loading, source } = this.state;
		return (
			<Modal
				visible
				maskClosable={false}
				onCancel={this.handleCancel}
				title="跟进记录"
				footer={(
					<div style={{ textAlign: 'center' }}>
						<Button type="primary" size="large" onClick={this.handleCancel} style={{ width: 100 }}>关 闭</Button>
					</div>
				)}
			>
				<div className="yc-follow-list">
					<Spin visible={loading} minHeight={100}>
						{
						source.length ? (
							<Steps direction="vertical" size="small" className="follow-list-step">
								{
									source.map(item => (
										<Steps.Step
											status="process"
											title={([
												<span className="font-title">{item.username}</span>,
												<span className={`list-step-title-mark-status mark-status-${item.process}`}>{ProcessTran(item.process)}</span>,
												<span className="list-step-title-mark-time">
													{item.updateTime ? new Date(item.updateTime * 1000).format('yyyy-MM-dd hh:mm:ss') : ''}
												</span>,
											])}
											icon="clock-circle"
											description={<StepDesc {...item} />}
										/>
									))
								}
							</Steps>
						) : <div>暂无跟进记录</div>
					}
					</Spin>
				</div>
			</Modal>
		);
	}
}
