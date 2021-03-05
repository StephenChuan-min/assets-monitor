import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import { Spin, Table, Ellipsis } from '@/common';
import { timeStandard } from '@/utils';
import './index.scss';

export default class TableVersion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toGetColumns = () => [
		{
			title: '拍卖信息',
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li style={{ marginBottom: 2, lineHeight: '20px' }}>
						{
							row.dataType === 2 ? row.title ? (
								// eslint-disable-next-line react/jsx-no-target-blank
								<a target="_blank" style={{ fontWeight: 600 }} className="click-link" href={`#/judgement?urlType=seizedUnblock&sourceId=${row.sourceId}&pid=${row.pid}&title=${row.title}`}>
									{row.title}
								</a>
							) : '-' : null
						}
						 {/* { */}
						{/* row.dataType === 2 ? 	( */}
						{/*	// eslint-disable-next-line react/jsx-no-target-blank */}
						{/*	<a target="_blank" style={{ fontWeight: 600 }} className="click-link" href={`#/judgement?urlType=seizedUnblock&sourceId=${row.sourceId}&pid=${row.pid}&title=${row.title}`}> */}
						{/*		{row.dataType === 2 ? row.title : `${row.information || row.address || '-'}`} */}
						{/*	</a> */}
						{/* ) : <span>{row.dataType === 2 ? row.title : `${row.information || row.address || '-'}`}</span> */}
						 {/* } */}
						{
							row.dataType === 1 ? row.url !== '' && row.sourceId !== 10760 ? (
								<div>
									{/* {linkDom(row.url, row.information || row.address, '_blank', '', '', '')} */}
									<Ellipsis url={row.url} content={row.information || row.address} isSourceLink />
								</div>
							) : (
								<span>
									{row.information || row.address || '-'}
								</span>
							) : null
						}
					</li>
				</div>
			),
		},
		{
			title: '其他信息',
			width: 300,
			dataIndex: 'caseNumber',
			render: (value, row) => (
				<div className="assets-info-content">
					<li>
						<span className="list list-title align-justify">关联案号</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 180 }}>{value || '-'}</span>
					</li>
					<li>
						<span className="list list-title align-justify">执行法院</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court}</span>
					</li>
				</div>
			),
		},
		{
			title: '关联信息',
			dataIndex: 'caseNumber',
			width: 250,
			render: (value, row) => (
				<div className="assets-info-content">
					{
						row.dataType === 2 ? (
							<React.Fragment>
								<li>
									<span className="list list-title align-justify">判决日期</span>
									<span className="list list-title-colon">:</span>
									<span className="list list-content">{timeStandard(row.judementTime)}</span>
								</li>
								<li>
									<span className="list list-title align-justify">发布日期</span>
									<span className="list list-title-colon">:</span>
									<span className="list list-content">{timeStandard(row.publishTime)}</span>
								</li>
							</React.Fragment>
						) : null
					}
					{
						row.dataType === 1 ? (
							<React.Fragment>
								<li>
									<span className="list list-title align-justify">查封日期</span>
									<span className="list list-title-colon">:</span>
									<span className="list list-content">{timeStandard(row.sealUpTime)}</span>
								</li>
								<li>
									<span className="list list-title align-justify">解封日期</span>
									<span className="list list-title-colon">:</span>
									<span className="list list-content">{timeStandard(row.unsealingTime)}</span>
								</li>
							</React.Fragment>
						) : null
					}
				</div>
			),
		},
	];

	// 当前页数变化
	onPageChange = (val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData = (page) => {
		const { portrait, condition } = this.props;
		const { api, params } = getDynamicAsset(portrait, condition || {
			b: 10901,
		});
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			...params,
		})
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						dataSource: res.data.list,
						current: res.data.page,
						total: res.data.total,
						loading: false,
					});
				} else {
					this.setState({
						dataSource: '',
						current: 1,
						total: 0,
						loading: false,
					});
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	render() {
		const { dataSource, current, total } = this.state;
		const { loading } = this.state;
		const { loadingHeight } = this.props;
		return (
			<div className="yc-assets-auction ">
				<Spin visible={loading} minHeight={(current > 1 && current * 5 >= total) ? '' : loadingHeight}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns()}
						dataSource={dataSource}
						showHeader={false}
						pagination={false}
					/>
					{dataSource && dataSource.length > 0 && (
						<div className="yc-table-pagination">
							<Pagination
								showQuickJumper
								current={current || 1}
								total={total || 0}
								pageSize={5}
								onChange={this.onPageChange}
								showTotal={totalCount => `共 ${totalCount} 条信息`}
							/>
						</div>
					)}
				</Spin>
			</div>
		);
	}
}
