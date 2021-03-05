import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import {
	Spin, Table, Ellipsis, LiItem,
} from '@/common';
import { w, timeStandard } from '@/utils';
import { PartyCrosswise } from '@/views/_common';
import './style.scss';

export default class TableIntact extends React.Component {
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

	toGetPortrait =() => {
		const { portrait } = this.props;
		return portrait === 'business';
	};

	toGetColumns=() => [
		{
			title: '信息',
			dataIndex: 'projectName',
			render: (text, row) => (
				<React.Fragment>
					<div className="assets-info-content">
						<li className="yc-public-normal-bold" style={{ marginBottom: 2, lineHeight: '20px' }}>
							<span className="list list-content" style={{ maxWidth: 300 }}>
								<Ellipsis content={w(row.landAddress)} url={row.url} tooltip font={15} width={300} isSourceLink />
							</span>
							{ row.landUse ? <span className="yc-case-reason text-ellipsis">{row.landUse || '-'}</span> : ''}
						</li>
						<LiItem Li>{w(row.administrativeRegion)}</LiItem>
						<li>
							<PartyCrosswise value={row.parties} land row={row} name="土地转让" type="transfer" linkDetail={this.toGetPortrait()} />
						</li>
						<li>
							<LiItem title="成交日期">{timeStandard(row.dealingTime)}</LiItem>
							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="面积">{w(row.landArea, { suffix: '公顷' })}</LiItem>
							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="使用年限">{w(row.landUsageTerm, { suffix: '年' })}</LiItem>
						</li>
					</div>
				</React.Fragment>
			),
		}, {
			title: '关联信息',
			width: 360,
			render: (text, row) => (
				<React.Fragment>
					<div className="assets-info-content">
						<LiItem Li>
							<span className="yc-purchasePrice-icon" />
							{w(row.transferPrice, { prefix: '转让价格：', suffix: '万元' })}
						</LiItem>
						<LiItem Li title="转让方式">{w(row.transferMode)}</LiItem>
					</div>
				</React.Fragment>
			),
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const { portrait } = this.props;
		const { api, params } = getDynamicAsset(portrait, {
			b: 10302,
			e: 'transfer',
		});
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			...params,
		}).then((res) => {
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
		}).catch(() => {
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
								pageSize={5}
								showQuickJumper
								current={current || 1}
								total={total || 0}
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
