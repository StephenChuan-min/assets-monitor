import React from 'react';
import { Pagination, Tooltip } from 'antd';
import PropTypes from 'reactPropTypes';
import {
	Ellipsis, Icon, Spin, Table, Button,
} from '@/common';
import { floatFormat } from '@/utils/format';
import assets from '@/utils/api/portrait-inquiry/enterprise/assets';
import personalAssets from '@/utils/api/portrait-inquiry/personal/assets';
import { getQueryByName, toEmpty, timeStandard } from '@/utils';
import TableVersionModal from './tableVersionModal';

import './style.scss';

const { auction, blurry } = assets;
const { personalAuction } = personalAssets;

const AuctionInfo = (text, rowContent) => {
	const {
		court, consultPrice, start, currentPrice, initialPrice, status,
	} = rowContent;
	const auctionStatus = (s) => {
		let res = { text: '-', color: '#7D8699' };
		switch (s) {
		case 1: res = { text: '即将开始', color: '#FB8E3C' }; break;
		case 3: res = { text: '正在进行', color: '#45A1FF' }; break;
		case 5: res = { text: '已成交', color: '#3DBD7D' }; break;
		case 7: res = { text: '已流拍', color: '#7D8699' }; break;
		case 9: res = { text: '中止', color: '#7D8699' }; break;
		case 11: res = { text: '撤回', color: '#7D8699' }; break;
		default: res = { text: '-', color: '#7D8699' };
		}
		return res;
	};
	const result = auctionStatus(status);
	return (
		<div className="yc-assets-table-info">
			<li style={{ lineHeight: '20px' }}>
				<Icon type="icon-dot" style={{ fontSize: 12, color: result.color, marginRight: 2 }} />
				<span className="list list-content ">{result.text}</span>
			</li>
			<li className="table-info-list list-width-180">
				<span className="info info-title">处置机关：</span>
				{
					court ? (
						<Tooltip placement="top" title={court}>
							<span className="info info-content text-ellipsis list-width-120">{court}</span>
						</Tooltip>
					) : <span className="info info-content">未知</span>
				}
			</li>
			<li className="table-info-list ">
				<span className="info info-title">评估价：</span>
				<span className="info info-content">{consultPrice ? `${floatFormat(consultPrice.toFixed(2))} 元` : '未知'}</span>
			</li>
			<br />
			<li className="table-info-list list-width-180">
				<span className="info info-title">开拍时间：</span>
				<span className="info info-content">{timeStandard(start, '未知')}</span>
			</li>
			{
				{
					1: (
						<li className="table-info-list ">
							<span className="info info-title">起拍价：</span>
							<span className="info-content info-over">
								{initialPrice || initialPrice === 0 ? `${floatFormat(initialPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
					5: (
						<li className="table-info-list ">
							<span className="info info-title">成交价：</span>
							<span className="info-content info-over">
								{currentPrice || currentPrice === 0 ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
							</span>
						</li>
					),
				}[status] || (
					<li className="table-info-list ">
						<span className="info info-title">当前价：</span>
						<span className="info-content">
							{currentPrice || currentPrice === 0 ? `${floatFormat(currentPrice.toFixed(2))} 元` : '未知'}
						</span>
					</li>
				)
			}
			<br />

		</div>
	);
};

const toGetType = (ary) => {
	if (ary.length) {
		const res = [];
		ary.forEach((item) => {
			let typeName = '';
			switch (item.labelType) {
			case 1: typeName = '资产所有人'; break;
			case 2: typeName = '债权人'; break;
			case 3: typeName = '资产线索'; break;
				// case 4: typeName = '起诉人'; break;
			case 5: typeName = '竞买人'; break;
			default: typeName = '';
			}
			if (typeName) {
				if (!new RegExp(typeName).test(JSON.stringify(res))) res.push(typeName);
			}
		});
		//	1：资产所有人 2：债权人 3：资产线索 4：起诉人 5：竞买人
		return res.length ? res.join('、') : '-';
	}
	return '-';
};

class TableIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: '',
			current: 1,
			total: 0,
			loading: false,
			historyInfoModalVisible: false,
			historyInfoModalData: [],
		};
	}

	componentWillMount() {
		this.toGetData();
	}

	toGetColumns = hideReason => [
		{
			title: '拍卖信息',
			dataIndex: 'title',
			render: (value, row) => (
				<div className="assets-info-content">
					{
						hideReason ? (
							<React.Fragment>
								<li style={{ height: '20px' }} />
								<li style={{ lineHeight: '20px', height: 20 }}>
									{ toEmpty(row.title)
										? <Ellipsis content={row.title} url={row.url} tooltip width={600} font={15} className="yc-public-title-normal-bold" isSourceLink /> : '-' }
									{
										row.historyAuctions.length > 0 && (
											<Button onClick={() => this.historyInfoModal(row)}>
												<Icon type="icon-history" style={{ fontSize: 13, marginRight: 4 }} />
												查看历史拍卖信息
											</Button>
										)
									}
								</li>
							</React.Fragment>
						) : (
							<React.Fragment>
								<li style={{ lineHeight: '20px' }}>
									{ toEmpty(row.title)
										? <Ellipsis content={row.title} url={row.url} tooltip width={600} font={15} className="yc-public-title-normal-bold" isSourceLink /> : '-' }
									{
										row.historyAuctions.length > 0 && (
											<Button onClick={() => this.historyInfoModal(row)}>
												<Icon type="icon-history" style={{ fontSize: 13, marginRight: 4 }} />
												查看历史拍卖信息
											</Button>
										)
									}
								</li>
								<li>
									<span className="list list-title align-justify">匹配原因</span>
									<span className="list list-title-colon">:</span>
									<span className="list list-content">{toGetType(row.obligors)}</span>
								</li>
								<li>
									{ toEmpty(row.matchRemark)
										? <Ellipsis content={row.matchRemark} tooltip width={600} font={15} /> : '-' }
								</li>
							</React.Fragment>
						)
					}
				</div>
			),
		}, {
			title: '拍卖状况',
			width: 360,
			render: AuctionInfo,
		},
	];

	// 打开历史信息弹窗
	historyInfoModal = (value) => {
		this.setState({
			historyInfoModalVisible: true,
			historyInfoModalData: value,
		});
	};

	// 关闭历史信息弹窗
	handleCancel = () => {
		this.setState({
			historyInfoModalVisible: false,
		});
	};

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	// 查询数据methods
	toGetData=(page) => {
		const { portrait, type } = this.props;
		const params = portrait === 'personal' ? {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		} : {
			companyId: getQueryByName(window.location.href, 'id'),
		};
		this.setState({ loading: true });

		// 判断是个人还是企业
		// type 判断是精准匹配还是模糊匹配
		const commonAuction = portrait === 'personal' ? personalAuction : (type === 'exact' ? auction : blurry);

		commonAuction.list({
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
		const {
			dataSource, current, total, historyInfoModalData, loading, historyInfoModalVisible,
		} = this.state;
		const { hideReason } = this.props;
		return (
			<div className="yc-assets-auction">
				<Spin visible={loading}>
					<Table
						rowClassName={() => 'yc-assets-auction-table-row'}
						columns={this.toGetColumns(hideReason)}
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
				{historyInfoModalVisible && (
				<TableVersionModal
					onCancel={this.handleCancel}
					onOk={this.onOk}
					data={historyInfoModalData}
					historyInfoModalVisible={historyInfoModalVisible}
				/>
				)}
			</div>
		);
	}
}

TableIntact.propTypes = {
	hideReason: PropTypes.bool,
};

TableIntact.defaultProps = {
	hideReason: false,
};

export default TableIntact;
