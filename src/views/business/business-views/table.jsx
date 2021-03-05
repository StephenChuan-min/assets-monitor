import React from 'react';
import { Modal, message } from 'antd';
import {
	openPush, // 打开推送
	closePush, // 关闭推送
	postDelete, // 删除一条记录
} from '@/utils/api/business';
import {
	Ellipsis, Icon, LiItem, Spin, Table,
} from '@/common';
import { timeStandard, linkBusiness } from '@/utils';
import { SortVessel } from '@/common/table';

const { confirm } = Modal;

export default class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reqLoading: false,
		};
	}

	// 删除一条业务
	showDeleteConfirm = (row) => {
		const { getData, stateObj } = this.props; // 刷新列表
		const that = this;
		const { selectedRowKeys } = stateObj;
		confirm({
			title: '确认删除选中业务吗?',
			content: '点击确认删除，业务相关债务人的所有数据(除已完成的数据外)将被清空，无法恢复，请确认是否存在仍需继续跟进的数据',
			iconType: 'exclamation-circle',
			className: 'business-delete-modal',
			onOk() {
				const params = {
					id: row.id,
				};
				const start = new Date().getTime(); // 获取接口响应时间
				that.setState({
					reqLoading: true,
				});
				return postDelete(params).then((res) => {
					if (res.code === 200) {
						if (!global.GLOBAL_MEIE_BROWSER) {
							const now = new Date().getTime();
							const latency = now - start;
							setTimeout(res.data, latency);
						}
						if (stateObj && selectedRowKeys && selectedRowKeys.length > 0) {
							selectedRowKeys.forEach((i, index) => {
								if (i === row.id) {
									selectedRowKeys.splice(index, 1);
								}
							});
						}
						message.success(res.message);
						getData();
					}
					that.setState({
						reqLoading: false,
					});
				}).catch(() => {
					that.setState({
						reqLoading: false,
					});
				});
			},
			onCancel() {},
		});
	};

	// 添加推送状态
	commonPushState = (row) => {
		const { getData } = this.props;// 刷新列表
		const Api = row && row.pushState === 1 ? closePush : openPush;
		const params = {
			id: row.id,
		};
		const start = new Date().getTime(); // 获取接口响应时间
		return Api(params).then((res) => {
			if (res.code === 200) {
				if (!global.GLOBAL_MEIE_BROWSER) {
					const now = new Date().getTime();
					const latency = now - start;
					setTimeout(res.data, latency);
				}
				message.success(`${row.pushState === 1 ? '关闭成功' : '开启成功'}`);
				getData();
			} else if (res.code === 9003) {
				message.error(res.message);
			}
		});
	};

	// 关闭, 开启推送
	handlePut = (row) => {
		const that = this;
		confirm({
			title: `确认${row.pushState === 1 ? '关闭' : '开启'}本条业务的推送功能吗?`,
			content: `点击确定，系统将${row.pushState === 1 ? '不再' : ''}为您推送本条业务相关的监控信息。`,
			iconType: 'none',
			className: 'message-confirm-no-icon',
			onOk() {
				that.commonPushState(row);
			},
			onCancel() {},
		});
	};

	// 获取column设置
	getColumns = () => {
		const { openPeopleModal } = this.props;
		const { onSortChange, sortField, sortOrder } = this.props;
		const sort = {
			sortField,
			sortOrder,
		};
		return [{
			title: '业务编号',
			dataIndex: 'caseNumber',
			key: 'caseNumber',
			width: 100,
			className: 'column-left20',
			render: text => text || '-',
		}, {
			title: '借款人',
			dataIndex: 'obligorName',
			key: 'obligorName',
			width: 190,
			render: (text, { obligorName, obligorId = '', obligorNumber }) => (
				<div className="assets-info-content yc-space-nowrap">
					<LiItem Li title="借款人" titleStyle={{ width: 36 }}>
						<Ellipsis content={obligorName} tooltip width={150} url obligorId={obligorId} />
					</LiItem>
					<LiItem Li title="证件号" titleStyle={{ width: 36 }}>{obligorNumber || '-'}</LiItem>
				</div>
			),
		}, {
			title: '负责人/机构',
			dataIndex: 'orgName',
			key: 'orgName',
			width: 135,
			render: text => text || '-',
		},
		{
			title: '担保人',
			dataIndex: 'guarantorCount',
			key: 'guarantorCount',
			width: 68,
			className: 'column-center',
			render: (text, row) => ((text === '0' || !text) ? '0'
				: <span className="yc-table-text-link" onClick={() => openPeopleModal(row.id)}>{text}</span>),
		}, {
			title: <SortVessel field="ASSET_TOTAL" onClick={onSortChange} {...sort}>相关资产</SortVessel>,
			dataIndex: 'assetTotal',
			key: 'assetTotal',
			width: 90,
			className: 'column-center',
			render: text => ((text === '0' || !text) ? '0' : text),
		}, {
			title: <SortVessel field="RISK_TOTAL" onClick={onSortChange} {...sort}>相关风险</SortVessel>,
			dataIndex: 'riskTotal',
			key: 'riskTotal',
			width: 90,
			className: 'column-center',
			render: text => ((text === '0' || !text) ? '0' : text),
		}, {
			title: '上传信息',
			dataIndex: 'uploadName',
			key: 'uploadName',
			width: 150,
			render: (text, { uploadName, uploadTime }) => (
				<div className="assets-info-content yc-space-nowrap">
					<LiItem Li title="上传人员" titleStyle={{ width: 48 }}>
						<Ellipsis content={uploadName} tooltip width={100} />
					</LiItem>
					<LiItem Li title="上传时间" titleStyle={{ width: 48 }}>
						{timeStandard(uploadTime, '--', 'yyyy-MM-dd hh:mm')}
					</LiItem>
				</div>
			),
		}, {
			title: '推送状态',
			dataIndex: 'pushState',
			key: 'pushState',
			width: 80,
			render: value => [
				<Icon type="icon-dot" style={{ fontSize: 12, color: value === 1 ? '#3DBD7D' : '#bcc1cc', marginRight: 3 }} />,
				<span>{value === 1 ? '开启' : '关闭'}</span>,
			],
		}, {
			title: '操作',
			key: 'operation',
			width: 135,
			className: 'column-center',
			render: (text, row) => [
				linkBusiness(row.id, '查看'),
				<React.Fragment>
					{
					!global.isProxyLimit && (
					<React.Fragment>
						<span className="ant-divider" />
						<span className="yc-table-text-link" onClick={() => this.handlePut(row)}>{row.pushState === 1 ? '关闭推送' : '开启推送'}</span>
						<span className="ant-divider" />
						<span className="yc-table-text-link" onClick={() => this.showDeleteConfirm(row)}>删除</span>
					</React.Fragment>
					)
					}
				</React.Fragment>,
			],
		}];
	};

	render() {
		const { stateObj, rowSelection } = this.props;
		const { reqLoading } = this.state;
		return (
			<React.Fragment>
				<Spin visible={reqLoading} modal text="正在删除中，请稍后..." />
				<Table
					rowSelection={stateObj.openRowSelection ? rowSelection : null}
					bordered={false}
					rowKey={record => JSON.stringify(record)}
					columns={this.getColumns()}
					dataSource={stateObj.dataList}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
				/>
			</React.Fragment>
		);
	}
}
