import React from 'react';
import { Pagination } from 'antd';
import { getDynamicRisk } from 'api/dynamic';
import {
	Ellipsis, Icon, Spin, Table, LiItem,
} from '@/common';
import { toEmpty, getHrefQuery, timeStandard } from '@/utils';


const toGetIdentityType = (value) => {
	/* 1：违法人 2：法人 3：财务 */
	if (value === 1) return '作为违法人';
	if (value === 2) return '作为法人';
	if (value === 3) return '作为财务';
	return '';
};
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

	toShowExtraField = (row, source = {}) => {
		const { portrait } = this.props;
		if (portrait === 'business') {
			return source.party && source.party.map(i => (
				<LiItem
					Li
					title="当事人"
					suffix={i.identityStr && <span className="yc-case-reason text-ellipsis">{i.identityStr}</span>}
				>
					<Ellipsis content={i.party} obligorId={i.obligorId} tooltip width={250}	/>
				</LiItem>
			));
		}
		return null;
	};

	toShowIdentityType = (row) => {
		const { parties = [] } = row;
		const id = getHrefQuery('id');
		const res = {
			showTaxpayer: true,
			showTaxpayerDebtor: true,
			identityType: '',
			identityTypePartyStr: [],
		};
		const party = parties.map((i) => {
			const r = i;
			if (i.identityType === 1) res.showTaxpayer = false;
			if (i.obligorId) res.identityType = i.identityType;
			r.party = r.name <= 4 ? `${r.name + r.idNumber && `(${r.idNumber})`}` : r.name;
			r.identityStr = toGetIdentityType(r.identityType);
			if (i.obligorId === Number(id)) {
				if (i.identityType === 1) res.showTaxpayerDebtor = false;
				else {
					res.identityTypePartyStr.push(r.identityStr);
				}
			}
			return r;
		});
		if (party.length) res.party = party;
		return res;
	};

	toGetColumns = () => {
		const { portrait } = this.props;
		return ([
			{
				title: '主要信息',
				dataIndex: 'property',
				render: (value, row) => {
					const { caseNature: ca, illegalFacts: ill, punish } = row;
					const source = this.toShowIdentityType(row);
					return (
						<div className="assets-info-content">
							<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
								<Ellipsis content={toEmpty(ca || value)} tooltip width={600} font={15} auto />
								{toGetIdentityType(row.identityType) && portrait === 'personal'
									? <span className="yc-case-reason text-ellipsis">{toGetIdentityType(row.identityType)}</span> : ''}
								{(portrait === 'debtor_personal' && source.identityTypePartyStr.length)
									? source.identityTypePartyStr.map(i => <span className="yc-case-reason text-ellipsis" style={{ marginRight: 0 }}>{i}</span>) : ''}
							</li>
							{this.toShowExtraField(row, source)}
							<LiItem title="违法事实" Li><Ellipsis content={toEmpty(ill)} width={601} tooltip /></LiItem>
							<LiItem title="处罚情况" Li><Ellipsis content={toEmpty(punish)} width={600} tooltip /></LiItem>
						</div>
					);
				},
			}, {
				title: '辅助信息',
				width: 360,
				render: (value, row) => {
					const source = this.toShowIdentityType(row);
					const taxpayer = (row.taxpayers || []).join('、');
					return (
						<div className="assets-info-content">
							<li style={{ height: 24 }}>
								{
									portrait === 'personal' && [
										<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 5 }} />,
										<Ellipsis content={`纳税人：${row.offender || '-'}`} tooltip width={240} />,
									]
								}
								{
									portrait === 'business' && taxpayer && source.showTaxpayer && [
										<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 5 }} />,
										<Ellipsis content={`纳税人：${taxpayer || '-'}`} tooltip width={240} />,
									]
								}
								{
									portrait === 'debtor_personal' && taxpayer && source.showTaxpayerDebtor && [
										<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 5 }} />,
										<Ellipsis content={`纳税人：${taxpayer || '-'}`} tooltip width={240} />,
									]
								}
							</li>
							<LiItem title="发布日期" Li>{timeStandard(row.publishDate) || '-'}</LiItem>
						</div>
					);
				},
			},
		]);
	};

	// 当前页数变化
	onPageChange = (val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData = (page) => {
		const { portrait, option } = this.props;
		const { api, params } = getDynamicRisk(portrait, option || {
			b: 30501,
			e: 'tax',
			p: 'personalTax',
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
