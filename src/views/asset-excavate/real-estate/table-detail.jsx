import React from 'react';
import { Pagination } from 'antd';
import { getDynamicAsset } from 'api/dynamic';
import {
	Ellipsis, Spin, Table, LiItem,
} from '@/common';
import { toEmpty, timeStandard } from '@/utils';
import './style.scss';


const roleName = {
	0: '未知',
	1: '注销人',
	2: '权利人',
	3: '新权利人',
	4: '原权利人',
	5: '抵押人',
	6: '抵押权人',
	7: '被执行人',
	8: '申请执行人',
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

	shouldComponentUpdate(nextProps) {
		if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
			this.toGetData(1, nextProps);
		}
		return true;
	}

	toCreatALink=(str, row) => {
		if (row.obligorId) {
			const baseDom = `<a href="#/business/debtor/detail?id=${row.obligorId}" class="click-link" rel="noopener noreferrer" target="_blank">${row.obligorName}</a>`;
			const Reg = new RegExp(row.obligorName, 'g');
			return str.replace(Reg, baseDom);
		}
		return str;
	};

	getMatchReason=(reason, pushType, row) => {
		const { portrait } = this.props;
		if (reason) {
			try {
				let str = '';
				const _reason = JSON.parse(reason);
				const name = (_reason.filter(i => i.name))[0];
				const usedName = (_reason.filter(i => i.used_name))[0];
				if (pushType === 0) {
					const allDoc = portrait === 'business' && row.obligorName ? `全文匹配，匹配债务人为${row.obligorName}` : '全文匹配';
					const allStr = portrait === 'business' ? this.toCreatALink(allDoc, row) : allDoc;
					return <p dangerouslySetInnerHTML={{ __html: allStr }} />;
				} if (name || usedName) {
					if (name) str += name.hl.join('、');
					else str += usedName.hl.join('、');
				}
				if (str) {
					if (portrait === 'business')str = this.toCreatALink(str, row);
					return <p dangerouslySetInnerHTML={{ __html: str }} />;
				}
				return '-';
			} catch (e) {
				return '-';
			}
		}
		return '-';
	};

	toShowExtraField=(row = {}) => {
		const { portrait, type } = this.props;
		if (portrait !== 'business') {
			let roleNameData = [];
			if (type === 11001) {
				if (row.role && Array.isArray(row.role) && row.role.length > 0) {
					roleNameData = row.role.map(i => roleName[i]);
				} else {
					roleNameData = [roleName[row.role]];
				}
			}
			return (
				<React.Fragment>
					<li>
						<span className="list list-title align-justify">权证类型</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content-auto">
							<Ellipsis
								content={row.certificateType}
								tooltip
								width={200}
							/>
						</span>
						<span className="list list-title align-justify">权证号</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content-auto">
							<Ellipsis
								content={row.certificateNumber}
								tooltip
								width={200}
							/>
						</span>
					</li>
					<li>
						{
							type === 11001
								? (
									<>
										<span className="list list-title align-justify">债务人角色</span>
										<span className="list list-title-colon">:</span>
										<span className="list list-content-auto">
											<Ellipsis
												content={roleNameData.join(',')}
												tooltip
												width={200}
											/>
										</span>
									</>
								)
								: null
						}
						<span className="list list-title align-justify">不动产坐落</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content-auto">
							<Ellipsis
								content={row.realEstateLocated}
								tooltip
								width={200}
							/>
						</span>
					</li>
				</React.Fragment>
			);
		}
		return null;
	};

	toGetColumns = () => [
		{
			title: '主要信息',
			dataIndex: 'title',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-normal-bold" style={{ marginBottom: 2 }}>
						<Ellipsis content={toEmpty(value)} url={row.url} width={600} font={15} tooltip isSourceLink />
					</li>
					{this.toShowExtraField(row)}
				</div>
			),
		}, {
			title: '辅助信息',
			width: 360,
			render: (value, row) => (
				<div className="assets-info-content">
					<LiItem Li title="发布日期">{timeStandard(row.publishTime)}</LiItem>
				</div>
			),
		},
	];

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page, nextProps = {}) => {
		const {
			sourceType,
			// ignored
		} = nextProps;
		// const processString = ignored ? '0,3,6,9,15' : '';
		const { portrait, onCountChange, type } = this.props;
		// debtor_enterprise business
		const _sourceType = sourceType || type;
		const { api, params } = getDynamicAsset(portrait, {
			b: _sourceType === 11001 ? 11001 : 11002,
			e: _sourceType === 11001 ? 'matchExact' : 'matchBlurry',
		});
		this.setState({ loading: true });
		api.list({
			page: page || 1,
			num: 5,
			type: _sourceType === 11001 ? 1 : 2,
			// processString,
			...params,
		}).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
				if (onCountChange)onCountChange(res.data.total, _sourceType);
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
		const {
			dataSource, current, total, loading,
		} = this.state;
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
				{/** 历史拍卖信息 */}
			</div>
		);
	}
}
