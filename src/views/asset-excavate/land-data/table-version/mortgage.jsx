import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import {
	Ellipsis, LiItem, Spin, Table,
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
							<span className="list list-content text-ellipsis" style={{ maxWidth: 300 }}>
								<Ellipsis content={row.landAddress} url={row.url} tooltip width={300} font={14} isSourceLink />
							</span>
							{ row.landUse ? <span className="yc-case-reason text-ellipsis">{row.landUse}</span> : ''}
						</li>
						<LiItem Li cotStyle={{ minWidth: 500 }}>{w(row.administrativeRegion)}</LiItem>
						<li>
							<PartyCrosswise value={row.parties} row={row} name="土地抵押" type="mortgage" land linkDetail={this.toGetPortrait()} />
						</li>
						<li>
							<LiItem title="登记日期">{timeStandard(row.startTime)}</LiItem>
							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="面积">{w(row.landArea, { suffix: '公顷' })}</LiItem>
							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="评估金额">{w(row.consultPrice, { suffix: '万元' })}</LiItem>
							<span className="list-split" style={{ height: 16 }} />
							<LiItem title="土地使用权证号" cotStyle={{ width: 200 }}>
								<Ellipsis content={w(row.landUseCertificateNumber)} tooltip width={200} />
							</LiItem>
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
						<li>
							<span className="list list-content">
								<span className="yc-purchasePrice-icon" />
								{w(row.mortgageAmount, { prefix: '抵押金额：', suffix: '万元' })}
							</span>
						</li>
						<li>
							<span className="list list-title align-justify">抵押面积</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">
								{w(row.mortgageArea, { suffix: '公顷' })}
							</span>
						</li>
						<li>
							<span className="list list-title align-justify">土地他项权证号</span>
							<span className="list list-title-colon">:</span>
							<Ellipsis content={w(row.otherObligeeCertificateNumber)} customColor="#20242E" tooltip width={180} />
						</li>
						<li>
							<span className="list list-title align-justify">登记结束日期</span>
							<span className="list list-title-colon">:</span>
							<span className="list list-content">
								<span className="list list-content">{timeStandard(row.endTime)}</span>
							</span>
						</li>
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
			b: 10303,
			e: 'landMortgage',
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
