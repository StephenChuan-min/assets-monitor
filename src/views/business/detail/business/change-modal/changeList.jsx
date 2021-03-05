import React from 'react';
import {
	Modal, message, Tooltip,
} from 'antd';
import { businessChange } from '@/utils/api/business';
import { Spin, Table } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import { getQueryByName } from '@/utils';
import './style.scss';

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		const ycTooltip = value => (
			<span>
				{
				value && value.length > 16
					? (
						<Tooltip placement="topLeft" title={value}>
							<span>
								{`${value.substr(0, 16)}...`}
							</span>
						</Tooltip>
					)
					: (
						<span>
							{value || '-'}
						</span>
					)
			}
			</span>
		);

		const toGetReasonList = (reason) => {
			try {
				if (typeof JSON.parse(reason) === 'object') {
					const _reason = JSON.parse(reason);
					const JSONArray = [];

					if (_reason.name && _reason.name.length > 0) {
						const nameObj = {
							name: _reason.name,
						};
						JSONArray.push(nameObj);
					}
					if (_reason.number) {
						const numberObj = {
							number: _reason.number,
						};
						JSONArray.push(numberObj);
					}
					if (_reason.role_text) {
						const roleObj = {
							role: _reason.role_text,
						};
						JSONArray.push(roleObj);
					}
					if (JSONArray && JSONArray.length > 0) {
						ycTooltip();

						return JSONArray.map(item => (
							<div>
								{item.name
									? (
										<div>
											<span className="change-modal-label">债务人</span>
											<span className="change-modal-colon">:</span>
											<span className="change-modal-name">
												{
													item.name && item.name.length > 5
														? (
															<Tooltip placement="topLeft" title={item.name}>
																<span>
																	{`${item.name.substr(0, 5)}...`}
																</span>
															</Tooltip>
														)
														: (
															<span>
																{item.name || '-'}
															</span>
														)
												}
											</span>
										</div>
									) : null}
								{item.number
									? (
										<div>
											<span className="change-modal-label">证件号</span>
											<span className="change-modal-colon">:</span>
											<span className="change-modal-name">
												{
													item.number && item.number.length > 10
														? (
															<Tooltip placement="topLeft" title={item.number}>
																<span>
																	{`${item.number.substr(0, 10)}...`}
																</span>
															</Tooltip>
														)
														: (
															<span>
																{item.number || '-'}
															</span>
														)
												}
											</span>
										</div>
									) : null}
								{item.role
									? (
										<div>
											<span className="change-modal-label">角色</span>
											<span className="change-modal-colon">:</span>
											<span className="change-modal-name">
												{
													item.role && item.role.length > 5
														? (
															<Tooltip placement="topLeft" title={item.role}>
																<span>
																	{`${item.role.substr(0, 5)}...`}
																</span>
															</Tooltip>
														)
														: (
															<span>
																{item.role || '-'}
															</span>
														)
												}
											</span>
										</div>
									) : null}
							</div>
						));
					}
				} else {
					return reason && reason !== 'null' ? reason : '-';
				}
			} catch (e) {
				return reason && reason !== 'null' ? reason : '-';
			}
			return false;
		};
		this.state = {
			changeDataList: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '变更时间',
					dataIndex: 'updateTime',
					key: 'updateTime',
					width: 150,
					render: text => (
						<p style={{ position: 'relative' }}>
							{text && text !== 0 ? formatDateTime(text) : '-'}
						</p>
					),
				},
				{
					title: '	变更项',
					dataIndex: 'changeItem',
					key: 'changeItem',
					width: 150,
					render: text => <p>{text || '-'}</p>,
				},
				{
					title: '变更前',
					dataIndex: 'beforeContent',
					key: 'beforeContent',
					width: 180,
					render: text => (
						<div>{text && text.length > 0 ? toGetReasonList(text) : '-'}</div>
					),
				},
				{
					title: '变更后',
					dataIndex: 'afterContent',
					key: 'afterContent',
					width: 180,
					render: text => (
						<div>{text && text.length > 0 ? toGetReasonList(text) : '-'}</div>
					),
				},
				{
					title: '变更人',
					dataIndex: 'username',
					key: 'username',
					render: text => <p>{text || '-'}</p>,
				},
			],
		};
	}

	componentDidMount() {
		this.getChangeData();
	}

	getChangeData = (value) => {
		const { hash } = window.location;
		const userId = getQueryByName(hash, 'id');
		this.setState({
			loading: true,
		});
		const params = {
			num: 10000,
			// page: 1,
			...value,
		};
		businessChange(userId, params).then((res) => {
			if (res && res.data) {
				this.setState({
					changeDataList: res.data.list,
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};


	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { columns, changeDataList, loading } = this.state;
		const { changeListModalVisible } = this.props;
		return (
			<Modal title="变更记录" width={880} style={{ 'max-height': 650 }} visible={changeListModalVisible} footer={null} onCancel={this.handleCancel} className="change-modal">
				<Spin visible={loading}>
					<Table
						scroll={changeDataList.length > 8 ? { y: 440 } : {}}
						dataSource={changeDataList}
						columns={columns}
						style={{ width: '100%' }}
						pagination={false}
						onRowClick={(record) => {
							console.log(record);
						}}
					/>
				</Spin>
			</Modal>
		);
	}
}
