import React from 'react';
import { Modal, Button } from 'antd';
import {
	Ellipsis, Spin, Table, Tooltip,
} from '@/common';
import { Attentions, SortVessel } from '@/common/table';
import { timeStandard } from '@/utils';
import Api from 'api/monitor-info/limit-consumption';
import { postFollow, postUnFollow } from 'api/monitor-info/real-estate';
import RegisterModal from '../../../risk-monitor/bankruptcy/registerModal';
import './comStyle.scss';
import accurate from 'img/icon/icon-jinzhun.png';

const announcementEnum = {
	1: '注销公告',
	2: '遗失公告',
	3: '继承公告',
	4: '首次登记公告',
	5: '作废公告',
	6: '转移登记公告',
	7: '变更/更正公告',
	8: '其他公告',
	0: '未知',
};
export default class LimitHeightModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			registerModalVisible: false,
			rowObj: {},
			columns: [
				{
					title: '发布日期',
					dataIndex: 'publishTime',
					width: 110,
					render: (text, row) => (
						<React.Fragment>
							{row.matchType === 1 ? <img src={accurate} alt="" className="yc-assets-info-img" /> : null}
							<span>{text}</span>
						</React.Fragment>
					),
				}, {
					title: '关联债务人',
					dataIndex: 'obligorName',
					width: 210,
					render: (text, row) => (
						<React.Fragment>
							{
								row.matchType === 1 ? (
									<div className="yc-assets-table-info">
										<li className="table-info-list">
											<span className="info info-title">权利人：</span>
											<Ellipsis
												content={text}
												width={168}
												url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}
												tooltip
											/>
										</li>
									</div>
								) : (
									<Ellipsis
										content={text}
										width={170}
										url={row.obligorId ? `/#/business/debtor/detail?id=${row.obligorId}` : ''}
										tooltip
									/>
								)
							}


						</React.Fragment>

					),
				}, {
					title: '公告类型',
					dataIndex: 'announcementType',
					width: 190,
					render: text => <p>{announcementEnum[text]}</p>,
				}, {
					title: '公告内容',
					width: 310,
					dataIndex: 'vehicleNumber',
					render: (text, row) => (
						<div className="yc-assets-table-info">
							{
								row.title || row.url ? (
									// <Tooltip placement="top" title={row.title}>
									// 	<a
									// 		className="table-info-title text-ellipsis click-link"
									// 		href={row.url}
									// 		target="_blank"
									// 		rel="noopener noreferrer"
									// 	>
									// 		{row.title || row.url}
									// 	</a>
									// </Tooltip>
									<Ellipsis url={row.url} content={row.title} isSourceLink tooltip />
								) : <div className="table-info-title ">-</div>
							}
							{
								row.certificateType ? (
									<li className="table-info-list" style={{ width: 310 }}>
										<span className="info info-title">权证类型：</span>
										<span className="info info-content text-ellipsis " style={{ maxWidth: 237 }}>{row.certificateType}</span>
									</li>
								) : null
							}
							{
								row.certificateNumber ? (
									<li className="table-info-list " style={{ width: 310 }}>
										<span className="info info-title">权证号：</span>
										<span className="info info-content" style={{ maxWidth: 237 }}>{row.certificateNumber}</span>
									</li>
								) : null

							}
							{
								row.realEstateLocated ? (
									<li className="table-info-list" style={{ width: 310 }}>
										<span className="info info-title" style={{ verticalAlign: 'top' }}>不动产坐落：</span>
										<span className="info info-content" style={{ maxWidth: 237 }}>{row.realEstateLocated}</span>
									</li>
								) : null
							}

						</div>
					),
				}, {
					title: global.Table_CreateTime_Text,
					dataIndex: 'gmtModified',
					width: 110,
					render: text => timeStandard(text) || '-',
				}, {
					title: '操作',
					width: 55,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? postUnFollow : postFollow}
							index={index}
						/>
					),
				}],
		};
	}

	componentDidMount() {
		const { dataSource } = this.props;	console.log('dataSource',dataSource)

		this.setState(() => ({
			dataSource,
		}));
	}

	// 表格发生变化
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = [...dataSource];
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 打开立案弹框
	openRegisterModal = (rowObj) => {
		// console.log(rowObj);
		this.setState({
			registerModalVisible: true,
			rowObj,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			registerModalVisible: false,
		});
	};

	// 关闭弹窗
	handleCancel = () => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const {
			columns, dataSource, loading, registerModalVisible, rowObj,
		} = this.state;
		const { realEstateModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-不动产登记"
				width={1100}
				style={{ height: 320 }}
				visible={realEstateModalVisible}
				footer={null}
				onCancel={this.handleCancel}
				wrapClassName="vertical-center-modal"
			>
				<Spin visible={loading}>
					<Table
						scroll={dataSource.length > 8 ? { y: 440 } : {}}
						columns={columns}
						dataSource={dataSource}
						pagination={false}
						className="table"
					/>
					<div style={{ width: '100%', textAlign: 'center' }}>
						<Button onClick={this.handleCancel} type="primary" className="dynamic-modal-btn">关闭</Button>
					</div>
				</Spin>
				{registerModalVisible && (
					<RegisterModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						rowObj={rowObj}
						registerModalVisible={registerModalVisible}
					/>
				)}
			</Modal>
		);
	}
}
