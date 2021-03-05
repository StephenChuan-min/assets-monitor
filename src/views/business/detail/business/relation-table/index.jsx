import React from 'react';
import { Icon, Ellipsis } from '@/common';
// import { linkDetail } from '@/utils';
import isBreak from '@/assets/img/business/status_shixin.png';
import beforeBreak from '@/assets/img/business/status_cengshixin.png';
import '../../table-version/overview/portrait/business-related/style.scss';
import { Modal, message, Table } from 'antd';
import { openPush, closePush } from '@/utils/api/debator';
import NoContent from '@/common/noContent';
import '../../table-version/overview/portrait/style.scss';

const { confirm } = Modal;

export default class RelationTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [{
				title: '相关人名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 350,
				render: (text, row) => (
					<div style={{ position: 'relative' }}>
						{/* {row.obligorId ? linkDetail(row.obligorId, text) : text} */}
						<Ellipsis
							content={row.obligorName}
							tooltip
							width={150}
							url
							obligorId={row.obligorId}
							isLimitHeight={row.limitHeightStatus}
							isTable={row.isTable}
							isBankruptcy={row.bankruptcy}
							isBorrower={row.isBorrower}
							regStatus={row.regStatus}
							bussinessStyle
						/>
						<span className="yc-item-break" style={{ marginLeft: 4 }}>
							{
								row && row.dishonestStatus === 1 ? <img style={{ width: '28px' }} src={isBreak} alt="" /> : null
							}
							{
								row && row.dishonestStatus === 2 ? <img style={{ width: '28px' }} src={beforeBreak} alt="" /> : null
							}
						</span>
						{/* {row.limitConsumption ? <span className="business-related-tag limit-height">已限高</span> : null} */}
						{/* {row.bankruptcy */}
						{/*	? <span className="business-related-tag bankruptcy-reorganization">破产/重整风险</span> : null} */}
					</div>
				),
			}, {
				title: '证件号/统一社会信用代码',
				dataIndex: 'obligorNumber',
				key: 'obligorNumber',
				width: 250,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '角色',
				dataIndex: 'roleText',
				key: 'roleText',
				width: 100,
			}, {
				title: '相关资产',
				dataIndex: 'assetTotal',
				key: 'assetTotal',
				width: 100,
			}, {
				title: '相关风险',
				dataIndex: 'riskTotal',
				key: 'riskTotal',
				width: 100,
			}, {
				title: '推送状态',
				key: 'obligorPushType',
				dataIndex: 'obligorPushType',
				width: 100,
				render(text) {
					return (
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
					);
				},
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
									<span className="yc-table-text-link" onClick={() => this.handlePut(row)}>{row.obligorPushType === 1 ? '关闭推送' : '开启推送'}</span>
								</React.Fragment>
							)
						}

					</span>
				),
			}],
		};
	}

	// 跳转详情
	detail = (row) => {
		console.log(row.obligorId);
		const w = window.open('about:blank');
		w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
	};

	commonPushState = (row) => {
		const { getData } = this.props;// 刷新列表
		const Api = row && row.obligorPushType === 1 ? closePush : openPush;
		const params = {
			idList: [row.obligorId],
		};
		const start = new Date().getTime(); // 获取接口响应时间
		return Api(params).then((res) => {
			if (res.code === 200) {
				if (!global.GLOBAL_MEIE_BROWSER) {
					const now = new Date().getTime();
					const latency = now - start;
					setTimeout(res.data, latency);
				}
				message.success(`${row.obligorPushType === 1 ? '关闭成功' : '开启成功'}`);
				getData();
			} else if (res.code === 9003) {
				message.error(res.message);
			}
		});
	};

	// 关闭, 开启推送
	handlePut = (row) => {
		const that = this;
		const content = row.openBusinessCount === 0 && row.obligorPushType === 0 ? (
			<span>
				该债务人当前所有相关业务均为推送关闭状态，开启该债务人的推送将把
				<b style={{ fontWeight: 'bold', color: '#20242E' }}>全部相关业务推送状态置为开启</b>
				，确定要开启推送吗？
			</span>
		) : `点击确定，系统将${row.obligorPushType === 1 ? '不再' : ''}为您推送本债务人相关的监控信息。`;
		const iconType = row.openBusinessCount === 0 ? 'exclamation-circle' : 'none';
		confirm({
			title: `确认${row.obligorPushType === 1 ? '关闭' : '开启'}本债务人的推送功能吗?`,
			content,
			iconType,
			className: iconType === 'none' ? 'message-confirm-no-icon' : 'message-confirm-icon',
			onOk() {
				that.commonPushState(row);
			},
			onCancel() {},
		});
	};

	render() {
		const { columns } = this.state;
		const { dataSource } = this.props;
		return (
			<div className="yc-portrait-container">
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">业务相关人列表</span>
				</div>
				<div className="overview-container-content" style={{ padding: '0 20px' }}>
					<Table
						scroll={dataSource.length > 10 ? { y: 440 } : {}}
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						className="table"
						locale={{ emptyText: <NoContent font="暂未添加业务相关人" /> }}
					/>
				</div>
			</div>
		);
	}
}
