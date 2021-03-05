import React, { PureComponent } from 'react';
import PropTypes from 'reactPropTypes';
import { Button } from 'antd';
import { navigate } from '@reach/router';
import DynamicTab from '../components/tab-checked';
import RingEcharts from '../components/ring-echarts';
import './style.scss';

let newAssetTotalNumArray = [];
let newRiskTotalNumArray = [];
// let clearAsset = false;
// let clearRisk = false;
// let clearAssetNum = false;
// let clearRiskNum = false;
// const ringMap = new Map([
// 	['资产拍卖', ['资产拍卖', 1]],
// 	['土地信息', ['土地信息', 2]],
// 	['无形资产', ['无形资产', 3]],
// 	['动产抵押', ['动产抵押', 4]],
// 	['股权质押', ['股权质押', 5]],
// 	['代位权', ['代位权', 6]],
// 	['招投标', ['招投标', 11]],
// 	['破产重组', ['破产重组', 7]],
// 	['失信记录', ['失信记录', 8]],
// 	['涉诉信息', ['涉诉信息', 9]],
// 	['经营风险', ['经营风险', 10]],
// 	['金融资产', ['金融资产', 12]],
// 	['查/解封资产', ['查/解封资产', 14]],
// 	['限制高消费', ['限制高消费', 13]],
// 	['default', ['资产拍卖', 1]],
// ]);

const urlMap = new Map([
	['资产拍卖', '/monitor?process=1'],
	['土地信息', '/monitor/land'],
	['无形资产', '/monitor/intangible'],
	['代位权', '/monitor/subrogation'],
	['股权质押', '/monitor/pledge'],
	['动产抵押', '/monitor/mortgage'],
	['查/解封资产', '/monitor/seizedUnblock'],
	['金融资产', '/monitor/financial'],
	['招投标', '/monitor/tender'],
	['在建工程', '/monitor/construct'],
	['不动产登记', '/monitor/realEstate'],
	['车辆信息', '/monitor/car'],
	['破产重组', '/risk/bankruptcy'],
	['失信记录', '/risk/broken'],
	['限制高消费', '/risk/limitHight'],
	['涉诉信息', '/risk/info'],
	['经营风险', '/risk/operation'],
	['default', '/'],
]);

class DynamicUpdate extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			typeNum: 0,
			assetObligorIdNum: 0,
			riskObligorIdNum: 0,
			RingEchartsObj: {},
		};
	}

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		const {
			assetPropsData, riskPropsData, AssetImportantReminderObligorIdList, RiskImportantReminderObligorIdList,
		} = nextProps;
		if (assetPropsData && assetPropsData.assetDataArray && assetPropsData.assetDataArray.length !== 0) {
			newAssetTotalNumArray = JSON.parse(JSON.stringify(assetPropsData && assetPropsData.assetDataArray));
		}
		if (riskPropsData && riskPropsData.riskDataArray && riskPropsData.riskDataArray.length !== 0) {
			newRiskTotalNumArray = JSON.parse(JSON.stringify(riskPropsData && riskPropsData.riskDataArray));
		}
		if (AssetImportantReminderObligorIdList) {
			const newAssetImportantReminderObligorIdList = AssetImportantReminderObligorIdList.filter(i => i !== 0);
			const newAssetImportantReminderObligorIdListNum = new Set([...newAssetImportantReminderObligorIdList]).size;
			this.setState(() => ({
				assetObligorIdNum: newAssetImportantReminderObligorIdListNum,
			}));
		}

		if (RiskImportantReminderObligorIdList) {
			const newRiskImportantReminderObligorIdList = RiskImportantReminderObligorIdList.filter(i => i !== 0);
			const newRiskImportantReminderObligorIdListNum = new Set([...newRiskImportantReminderObligorIdList]).size;
			this.setState(() => ({
				riskObligorIdNum: newRiskImportantReminderObligorIdListNum,
			}));
		}
	}

	// 获取资产挖掘或者风险信息的总数
	getTotal = (arr) => {
		const newArr = arr && arr.filter(i => i !== null);
		if (newArr.length === 0) { return null; }
		let total = 0;
		newArr.forEach((i) => {
			total += i.count;
		});
		return total;
	};

	// 动态更新的类型
	getDynamicType = (val) => {
		const { RingEchartsObj } = this.state;
		// console.log('getDynamicType RingEchartsObj === ', RingEchartsObj);
		const { selected } = RingEchartsObj;
		if (selected) {
			Object.getOwnPropertyNames(selected).forEach((key) => {
				selected[key] = true;
			});
		}
		// clearAsset = true;
		// clearRisk = true;
		// clearAssetNum = true;
		// clearRiskNum = true;
		this.setState(() => ({
			typeNum: val,
			// clear: true,
			RingEchartsObj,
		}));
	};

	// 点击图例的分类
	getRingEchartsType = (val) => {
		// this.setState(() => ({
		// 	RingEchartsObj: val,
		// }));
		// console.log('urlMap.get(val)', urlMap.get(val.name));
		const { timeType } = this.props;
		const w = window.open('about:blank');
		if (urlMap.get(val.name).includes('?')) {
			w.location.href = `#${urlMap.get(val.name)}&timeHorizon=${timeType}`;
		} else {
			w.location.href = `#${urlMap.get(val.name)}?timeHorizon=${timeType}`;
		}
	};

	// 手动跳转页面
	handleNavigate = () => {
		navigate('/business/view');
	};


	/*	// 关闭显示重要信息标准弹窗
	handleCancel = () => {
		this.setState({
			showModal: false,
		});
	}; */

	render() {
		const {
			typeNum, RingEchartsObj, assetObligorIdNum, riskObligorIdNum,
		} = this.state;

		const { assetPropsData, riskPropsData } = this.props;
		const hasAssetPropsData = Object.keys(assetPropsData).length !== 0;
		const hasRiskPropsData = Object.keys(riskPropsData).length !== 0;
		const lessAssetNum = hasAssetPropsData && assetPropsData.totalNum < 3 && assetPropsData.totalNum > 0;
		const lessRiskNum = hasRiskPropsData && riskPropsData.totalNum < 3 && riskPropsData.totalNum > 0;
		const assetPropsDataArray = hasAssetPropsData && assetPropsData.assetDataArray;
		const riskPropsDataArray = hasRiskPropsData && riskPropsData.riskDataArray;

		let assetArrNum = (newAssetTotalNumArray);
		let riskArrNum = (newRiskTotalNumArray);

		const params = {
			getDynamicType: this.getDynamicType,
			assetTotalNum: hasAssetPropsData ? assetPropsData.totalNum : 0,
			riskTotalNum: hasRiskPropsData ? riskPropsData.totalNum : 0,
		};
		const assetParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: assetPropsDataArray,
		};

		const riskParams = {
			getRingEchartsType: this.getRingEchartsType,
			Data: riskPropsDataArray,
		};
		if (Object.keys(RingEchartsObj).length !== 0) {
			assetArrNum = hasAssetPropsData && assetPropsData.assetDataArray;
			riskArrNum = hasRiskPropsData && riskPropsData.riskDataArray;
		}
		return (
			<div className="seven-update-container">
				<DynamicTab {...params} />
				{typeNum === 0 && (
					<div className="seven-update-content">
						{hasAssetPropsData && assetPropsData.totalNum !== 0 ? (
							<div className="seven-update-content-title">
								<div className="seven-update-content-title-item" />
								<div className="seven-update-content-title-name" style={{ marginTop: 20 }}>
									新增
									<span className="seven-update-content-title-num">{assetArrNum && this.getTotal(assetArrNum)}</span>
									条资产线索

									{/*		<span className="seven-update-content-title-addNum">
										<span className="seven-update-content-title-addNum-icon" />
										<span className="seven-update-content-title-addNum-text">
											<span className="seven-update-content-title-addNum-text-bold">
												{assetObligorIdNum}
											</span>
											名债务人有资产信息更新
										</span>
									</span> */}
								</div>
								<RingEcharts id="assetAuction" {...assetParams} title="资产挖掘" />
								{lessAssetNum && (
									<div className="seven-update-content-title-noNum">
										数据太少？建议
										<span className="seven-update-content-title-noNum-findMore" onClick={() => this.handleNavigate('/business/view')}>去导入更多债务人</span>
										，以匹配更多价值信息
									</div>
								)}
							</div>
						) : (
							<div className="detail-container-noData">
								<div className="detail-container-noData-allImg" style={{ height: 160, width: 270 }} />
								<span className="detail-container-noData-text">暂未匹配到新的资产信息，建议去导入更多债务人，以匹配更多价值信息</span>
								<div>
									<Button onClick={this.handleNavigate} type="primary" style={{ width: 180, height: 34, marginTop: '20px' }}>导入更多债务人</Button>
								</div>
							</div>
						)}
					</div>
				)}

				{typeNum === 1 && (
					<div className="seven-update-content">

						{hasRiskPropsData && riskPropsData.totalNum !== 0 ? (
							<div className="seven-update-content-title">
								<div className="seven-update-content-title-item" />
								<div className="seven-update-content-title-name" style={{ marginTop: 20 }}>
									新增
									<span className="seven-update-content-title-num">{riskArrNum && this.getTotal(riskArrNum)}</span>
									条风险信息
									{/* <span className="seven-update-content-title-addNum">
										<span className="seven-update-content-title-addNum-icon" />
										<span className="seven-update-content-title-addNum-text">
											<span className="seven-update-content-title-addNum-text-bold">
												{riskObligorIdNum}
											</span>
											名债务人有风险信息更新
										</span>
									</span> */}
								</div>
								<RingEcharts id="assetAuction" {...riskParams} title="风险参考" />
								{lessRiskNum && (
									<div className="seven-update-content-title-noNum">
										数据太少？建议
										<span className="seven-update-content-title-noNum-findMore" onClick={() => this.handleNavigate('/business/view')}>去导入更多债务人</span>
										，以匹配更多价值信息
									</div>
								)}
							</div>
						) : (
							<div className="detail-container-noData">
								<div className="detail-container-noData-allImg" style={{ height: 160, width: 270 }} />
								<span className="detail-container-noData-text">暂未匹配到新的风险信息，建议去导入更多债务人，以匹配更多价值信息</span>
								<div>
									<Button onClick={this.handleNavigate} type="primary" style={{ width: 180, height: 34, marginTop: '20px' }}>导入更多债务人</Button>
								</div>
							</div>
						)}
					</div>
				)}

			</div>
		);
	}
}

DynamicUpdate.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	AssetImportantReminderList: PropTypes.array,
	// eslint-disable-next-line react/forbid-prop-types
	assetPropsData: PropTypes.array,
	// eslint-disable-next-line react/forbid-prop-types
	riskPropsData: PropTypes.array,
};

DynamicUpdate.defaultProps = {
	AssetImportantReminderList: [],
	assetPropsData: [],
	riskPropsData: [],
};

export default DynamicUpdate;
