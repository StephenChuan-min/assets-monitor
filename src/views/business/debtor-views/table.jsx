import React from 'react';
import { Modal, Form, message } from 'antd';
import { openPush, closePush } from '@/utils/api/debator';
import {
	Ellipsis, Icon, SelectedNum, Table,
} from '@/common';
import { SortVessel } from '@/common/table';
import isBreak from '../../../assets/img/business/status_shixin.png';
import beforeBreak from '../../../assets/img/business/status_cengshixin.png';

const { confirm } = Modal;

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ selectedRowKeys: nextProps.selectIds });
	}

	// 跳转详情
	detail = (row) => {
		console.log(row.id);
		const w = window.open('about:blank');
		w.location.href = `#/business/debtor/detail?id=${row.id}`;
	};

	commonPushState = (row) => {
		const { getData } = this.props;// 刷新列表
		const Api = row && row.pushState === 1 ? closePush : openPush;
		const params = {
			idList: [row.id],
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
		const content = row.openBusinessCount === 0 && row.pushState === 0 ? (
			<span>
				该债务人当前所有相关业务均为推送关闭状态，开启该债务人的推送将把
				<b style={{ fontWeight: 'bold', color: '#20242E' }}>全部相关业务推送状态置为开启</b>
				，确定要开启推送吗？
			</span>
		) : `点击确定，系统将${row.pushState === 1 ? '不再' : ''}为您推送本债务人相关的监控信息。`;
		const iconType = row.openBusinessCount === 0 ? 'exclamation-circle' : 'none';
		confirm({
			title: `确认${row.pushState === 1 ? '关闭' : '开启'}本债务人的推送功能吗?`,
			content,
			iconType,
			className: iconType === 'none' ? 'message-confirm-no-icon' : 'message-confirm-icon',
			onOk() {
				that.commonPushState(row);
			},
			onCancel() {},
		});
	};

	// 选择框
	onSelectChange=(selectedRowKeys) => {
		const { onSelect } = this.props;
		if (onSelect)onSelect(selectedRowKeys);

		this.setState({ selectedRowKeys });
	};

	render() {
		const { stateObj, manage } = this.props;
		const {
			onSortChange, sortField, sortOrder, selectIds,
		} = this.props;
		const sort = {
			sortField,
			sortOrder,
		};
		const columns = [{
			title: '债务人',
			dataIndex: 'obligorName',
			key: 'obligorName',
			width: 350,
			className: 'column-left20',
			render: (text, row) => (
				<div style={{ position: 'relative' }}>
					<Ellipsis
						content={row.obligorName}
						tooltip
						width={150}
						url
						obligorId={row.id}
						isBorrower={row.isBorrower}
						isBankruptcy={row.bankruptcyStatus}
						isLimitHeight={row.limitHeightStatus}
						isTable={row.isTable}
						regStatus={row.regStatus}
						bussinessStyle
					/>
					<span className="yc-item-break" style={{ marginLeft: 4 }}>
						{ row && row.dishonestStatus === 1 ? <img src={isBreak} alt="" /> : null }
						{ row && row.dishonestStatus === 2 ? <img src={beforeBreak} alt="" /> : null}
					</span>
				</div>
			),
		}, {
			title: '身份证号/统一社会信用代码',
			dataIndex: 'obligorNumber',
			key: 'obligorNumber',
			width: 250,
			render: text => (
				<p>{text || '-'}</p>
			),
		},
		{
			title: '当前业务',
			dataIndex: 'businessCount',
			key: 'businessCount',
			width: 100,
			className: 'column-center',
			render(text) {
				if (text === '0' || !text) {
					return <div>0</div>;
				}
				return <p>{text}</p>;
			},
		}, {
			title: <SortVessel field="ASSET_TOTAL" onClick={onSortChange} {...sort}>相关资产</SortVessel>,
			dataIndex: 'assetTotal',
			key: 'assetTotal',
			width: 100,
			className: 'column-center',
			render: text => ((text === '0' || !text) ? '0' : text),
		}, {
			title: <SortVessel field="RISK_TOTAL" onClick={onSortChange} {...sort}>相关风险</SortVessel>,
			dataIndex: 'riskTotal',
			key: 'riskTotal',
			width: 100,
			className: 'column-center',
			render: text => ((text === '0' || !text) ? '0' : text),
		}, {
			title: '推送状态',
			dataIndex: 'pushState',
			key: 'pushState',
			width: 100,
			render: text => (
				<React.Fragment>
					{
							text === 1 ? (
								<span>
									<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 3 }} />
									开启
								</span>
							) : (
								<span>
									<Icon type="icon-dot" style={{ fontSize: 12, color: '#bcc1cc', marginRight: 3 }} />
									关闭
								</span>
							)
						}
				</React.Fragment>

			),
		}, {
			title: '操作',
			key: 'operation',
			className: 'column-center',
			width: 150,
			render: (text, row) => (
				<span>
					<span className="yc-table-text-link" onClick={() => this.detail(row)}>查看</span>
					{
						!global.isProxyLimit && (
							<React.Fragment>
								<span className="ant-divider" />
								<span className="yc-table-text-link" onClick={() => this.handlePut(row)}>{row.pushState === 1 ? '关闭推送' : '开启推送'}</span>
							</React.Fragment>
						)
					}
				</span>
			),
		}];
		const { selectedRowKeys } = this.state;
		const rowSelection = manage ? {
			rowSelection: {
				selectedRowKeys,
				onChange: this.onSelectChange,
			},
		} : null;
		return (
			<React.Fragment>
				{selectIds && selectIds.length > 0 ? <SelectedNum num={selectIds.length} /> : null}
				<Table
					{...rowSelection}
					rowKey={record => record.id}
					columns={columns}
					dataSource={stateObj.dataList}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {
					}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
