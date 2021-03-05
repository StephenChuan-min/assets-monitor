import React from 'react';
import { Modal, Button } from 'antd';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import { toThousands } from '@/utils/changeTime';
import { UnderwayApi } from 'api/assets/construct';

const roleMap = new Map([
	[0, '未知'],
	[1, '中标单位'],
	[2, '勘察单位'],
	[3, '建设单位'],
	[4, '施工单位'],
	[5, '监理单位'],
	[6, '设计单位'],
	[7, '发包单位'],
	[8, '承包单位'],
	[9, '中标候选人'],
	[10, '招标人'],
	[11, '工程总承包单位'],
	[null, '未知'],
]);


export default class OnBuildUnderway extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '发证日期',
					dataIndex: 'issuingTime',
					render: text => <span>{text || '-'}</span>,
				},
				{
					title: <span style={{ marginLeft: 10 }}>施工单位</span>,
					width: 370,
					dataIndex: 'id',
					render: (text, row) => (
						<React.Fragment>
							{
								row.parties.map(item => (
									<Ellipsis
										prefixContent={Array.isArray(item.role) && item.role.length > 0 ? item.role.map((it, index) => `${roleMap.get(it)}${index === item.role.length - 1 ? '：' : '，'}`) : roleMap.get(item.role)}
										content={item.obligorName}
										url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
										auto
										tooltip
									/>
								))
							}
						</React.Fragment>
					),
				},
				{
					title: '施工许可证信息',
					dataIndex: 'title',
					render: (text, row) => (
						<div className="assets-info-content">
							<Ellipsis
								width={480}
								content={text}
								url={row.url}
								tooltip
								isSourceLink
							/>
							<div>
								{
									row.contractPrice && <LiItem Li auto title="合同金额" titleStyle={{ color: '#7D8699', width: 68 }}>{`${row.contractPrice > 0 ? `${toThousands(row.contractPrice)}元` : '-'}`}</LiItem>
								}
								{
									row.projectPeriod && <LiItem Li auto title="合同工期" titleStyle={{ color: '#7D8699', width: 68 }}>{row.projectPeriod || '-'}</LiItem>
								}
								{
									row.projectLocation ? <LiItem Li auto title="项目所在地" titleStyle={{ color: '#7D8699', width: 68 }}>{row.projectLocation}</LiItem> : null
								}
							</div>
						</div>
					),
				},
				{
					title: '更新日期',
					dataIndex: 'gmtModified',
					render: text => <span>{text}</span>,
				},
				{
					title: '操作',
					width: 60,
					unNormal: true,
					className: 'tAlignCenter_important',
					render: (text, row, index) => (
						<Attentions
							text={text}
							row={row}
							onClick={this.onRefresh}
							api={row.isAttention ? UnderwayApi.unAttention : UnderwayApi.attention}
							index={index}
						/>
					),
				}],
		};
	}

	componentDidMount() {
		const { dataSource } = this.props;
		this.setState(() => ({
			dataSource,
		}));
	}

	// 表格发生变化
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = [...dataSource];
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	handleCancel = () => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { columns, dataSource, loading } = this.state;
		const { onBuildUnderwayVisible } = this.props;
		return (
			<Modal
				title="匹配详情-在建工程"
				width={1100}
				style={{ height: 320 }}
				visible={onBuildUnderwayVisible}
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
			</Modal>
		);
	}
}
