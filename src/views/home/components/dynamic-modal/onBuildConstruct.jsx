import React from 'react';
import { Modal, Button } from 'antd';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import { toThousands } from '@/utils/changeTime';
import { ConstructApi } from 'api/assets/construct';

const projectTypeMap = new Map([
	[1, '建筑工程'],
	[2, '装饰工程'],
	[3, '市政道路工程'],
	[4, '其他'],
	[0, '未知'],
]);

export default class OnBuildConstruct extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: <span style={{ marginLeft: 10 }}>建设单位</span>,
					width: 290,
					dataIndex: 'id',
					render: (text, row) => (
						<React.Fragment>
							<div style={{ marginLeft: 10 }}>
								{
									row.parties.map(item => (
										<Ellipsis
											content={item.obligorName || '-'}
											url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
											tooltip
										/>
									))
								}
							</div>
						</React.Fragment>
					),
				},
				{
					title: '工程类型',
					dataIndex: 'projectType',
					render: text => <span>{projectTypeMap.get(text) || '-'}</span>,
				},
				{
					title: '项目信息',
					width: 496,
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
								<LiItem Li auto title="建设性质" style={{ display: 'inline-block', width: 160 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.nature || '-'}</LiItem>
								<LiItem Li auto title="总投资" style={{ display: 'inline-block', width: 200, marginLeft: 40 }} titleStyle={{ color: '#7D8699', width: 80 }}>
									{`${row.totalInvestment > 0 ? `${toThousands(row.totalInvestment)}元` : '-'}`}
								</LiItem>
							</div>
							<div>
								{
									row.approvalTime && <LiItem Li auto title="立项批复日期" style={{ display: 'inline-block', width: 160 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.approvalTime || '-'}</LiItem>
								}
								{
									row.planBeginTime && <LiItem Li auto title="计划开工日期" style={{ display: 'inline-block', width: 160, marginLeft: 40 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.planBeginTime || '-'}</LiItem>
								}
								<LiItem Li auto title="计划开工日期" style={{ display: 'inline-block', width: 160, marginLeft: 40 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.planBeginTime || '-'}</LiItem>
							</div>
							{
								row.projectLocation && <LiItem Li title="项目所在地" style={{ width: 372 }} titleStyle={{ color: '#7D8699', width: 80 }} cotStyle={{ maxWidth: 274 }}>{row.projectLocation || '-'}</LiItem>
							}
						</div>
					),
				},
				{
					title: '更新日期',
					dataIndex: 'gmtModified',
					render: text => <span>{text || '-'}</span>,
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
							api={row.isAttention ? ConstructApi.unAttention : ConstructApi.attention}
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
		const { onBuildConstructVisible } = this.props;
		return (
			<Modal
				title="匹配详情-在建工程"
				width={1100}
				style={{ height: 320 }}
				visible={onBuildConstructVisible}
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
