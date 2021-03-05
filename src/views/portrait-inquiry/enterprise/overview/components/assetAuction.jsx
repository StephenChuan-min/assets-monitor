import React from 'react';
import { Spin } from '@/common';
import { getAuction } from '@/utils/api/portrait-inquiry/enterprise/overview';
import TagSide from '@/views/portrait-inquiry/common/checkBtn';
import ColumnarEcharts from '../../../common/columnarEcharts';
import RingEcharts from '../../../common/ringEcharts';

const auctionResultsMAp = new Map([
	[1, '即将开始'],
	[3, '正在进行'],
	[5, '已成交'],
	[7, '已流拍'],
	[9, '中止'],
	[11, '撤回'],
]);

const roleDistributionsMap = new Map([
	[1, '资产所有人'],
	[2, '债权人/起诉人'],
	[3, '资产线索'],
	[5, '竞买人'],
]);

// bidding 竞价  investment 招商 publicity 公示
function getTypeName(arr, mapType) {
	const typeNameArr = [];
	arr.forEach((i) => {
		if (mapType === 'result') {
			typeNameArr.push({ ...i, type: auctionResultsMAp.get(i.type) });
		} else {
			typeNameArr.push({ ...i, type: roleDistributionsMap.get(i.type) });
		}
	});
	return typeNameArr;
}

export default class AssetAuction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			accurate: {},
			blurry: {},
			selectType: '',
			columnarData: [],
			RingData: [],
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId, getAssetProfile } = this.props;
		this.setState({
			loading: true,
		});
		const params = {
			companyId,
		};
		getAuction(params).then((res) => {
			const accurate = res.data.auctionInfos.filter(i => i.type === 1)[0];
			const blurry = res.data.auctionInfos.filter(i => i.type === 2)[0];
			if (res.code === 200) {
				this.setState({
					columnarData: getTypeName(accurate.roleDistributions, 'role'),
					RingData: getTypeName(accurate.count > 0 ? accurate.auctionResults : blurry.auctionResults, 'result'),
					accurate,
					blurry,
					selectType: res.data.auctionInfos.filter(i => i.type === 1)[0].count > 0 ? 'accurate' : 'blurry',
					loading: false,
				});
				getAssetProfile(res.data.auctionInfos.filter(i => i.type === 1)[0].count, 'AssetAuction');
			} else {
				this.setState({ loading: false });
			}
		})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	// accurate： 精准匹配， blurry： 模糊匹配
	checkTime = (selectType) => {
		const { accurate, blurry } = this.state;
		if (selectType === 'accurate') {
			this.setState({
				selectType,
				columnarData: getTypeName(accurate.roleDistributions, 'role'),
				RingData: getTypeName(accurate.auctionResults, 'result'),
			});
		} else if (selectType === 'blurry') {
			this.setState({
				selectType,
				RingData: getTypeName(blurry.auctionResults, 'result'),
			});
		}
	};

	render() {
		const {
			columnarData, RingData, selectType, loading, accurate, blurry,
		} = this.state;
		// accurate： 精准匹配， blurry： 模糊匹配
		return (
			<div>
				{
					(accurate.count || blurry.count) > 0 && (
					<Spin visible={loading}>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{`${accurate.count + blurry.count} 条`}
							</span>
							<span className="container-title-name">资产拍卖</span>
						</div>
						<div className="overview-container-content">
							<div style={{ marginBottom: 20 }}>
								<TagSide
									content="精准匹配"
									num={accurate.count}
									onClick={() => {
										if (accurate.count > 0) {
											this.checkTime('accurate');
										}
									}}
									tag={selectType === 'accurate' ? 'yc-tag-active' : ''}
								/>
								<TagSide
									content="模糊匹配"
									num={blurry.count}
									onClick={() => {
										if (blurry.count > 0) {
											this.checkTime('blurry');
										}
									}}
									tag={selectType === 'blurry' ? 'yc-tag-active' : ''}
								/>
							</div>
							{
								selectType === 'accurate' && (
								<div style={{ marginBottom: 20 }}>
									<ColumnarEcharts title="角色分布" Data={columnarData} id="assetAuction" />
								</div>
								)
							}
							<RingEcharts title="拍卖结果分布" Data={RingData} id="assetAuction" customColorArray={['#45A1FF', '#4DCAC9', '#59C874', '#FCD44A', '#F2657A', '#965EE3']} />
						</div>
					</Spin>
					)
				}
			</div>
		);
	}
}
