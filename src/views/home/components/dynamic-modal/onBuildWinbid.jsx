import React from 'react';
import { Modal, Button } from 'antd';
import {
	Ellipsis, LiItem, Spin, Table,
} from '@/common';
import { Attentions } from '@/common/table';
import { toThousands } from '@/utils/changeTime';
import { WinbidApi } from 'api/assets/construct';

export default class OnBuildWinbid extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [], // 列表数据
			loading: false,
			columns: [
				{
					title: '中标日期',
					dataIndex: 'winningTime',
					width: 110,
					render: text => <span>{text || '-'}</span>,
				},
				{
					title: <span style={{ marginLeft: 10 }}>中标单位</span>,
					width: 200,
					dataIndex: 'id',
					render: (text, row) => (
						<React.Fragment>
							{
								row.parties.map(item => (
									<Ellipsis
										content={item.obligorName}
										url={item.obligorId ? `#/business/debtor/detail?id=${item.obligorId}` : ''}
										tooltip
									/>
								))
							}
						</React.Fragment>
					),
				},
				{
					title: '中标类型',
					width: 90,
					dataIndex: 'biddingType',
					render: text => <span>{text}</span>,
				},
				{
					title: '中标信息',
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
								<LiItem Li auto title="招标方式" style={{ display: 'inline-block', width: 160 }} titleStyle={{ color: '#7D8699', width: 80 }}>{row.biddingMode || '-'}</LiItem>
								<LiItem Li auto title="中标金额" style={{ display: 'inline-block', width: 220, marginLeft: 20 }} titleStyle={{ color: '#7D8699', width: 80 }}>{`${row.winningPrice > 0 ? `${toThousands(row.winningPrice)}元` : '-'}`}</LiItem>
							</div>
						</div>
					),
				},
				{
					title: '更新日期',
					dataIndex: 'gmtModified',
					width: 90,
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
							api={row.isAttention ? WinbidApi.unAttention : WinbidApi.attention}
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
		const { onBuildWinbidVisible } = this.props;
		return (
			<Modal
				title="匹配详情-在建工程"
				width={1100}
				style={{ height: 320 }}
				visible={onBuildWinbidVisible}
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
