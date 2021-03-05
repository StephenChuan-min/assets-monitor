import React from 'react';
import { businessOverviewConstruct, overviewConstruct } from '@/utils/api/professional-work/overview';
import RingEcharts from '@/views/portrait-inquiry/common/ringEcharts';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import TagSide from '@/views/portrait-inquiry/common/checkBtn';
import getCount from '@/views/portrait-inquiry/common/getCount';

const projectTypeMap = new Map([
	[0, '未知'],
	[1, '建筑工程'],
	[2, '装饰工程'],
	[3, '市政道路工程'],
	[4, '其他'],
]);

function getTypeName(arr) {
	const typeNameArr = [];
	arr.forEach((i) => {
		typeNameArr.push({ ...i, typeName: projectTypeMap.get(i.projectType), count: i.projectTypeCount });
	});
	return typeNameArr;
}

export default class Construct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectType: '',
			constructArray: [],
			winbidArray: [],
			underwayArray: [],
			constructNum: 0,
			winbidNum: 0,
			underwayNum: 0,
			RingData: [],
			timeLineData: [],
			RingDataNum: 0,
			timeLineDataNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			businessId, obligorId, getAssetProfile, portrait,
		} = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		const api = portrait === 'business' ? businessOverviewConstruct : overviewConstruct;
		let constructArray = []; // 建设单位数据
		let winbidArray = []; // 中标单位数据
		let underwayArray = []; // 施工单位数据
		let constructNum = 0; // 建设单位总数数量
		let winbidNum = 0; // 中标单位总数
		let underwayNum = 0; // 施工单位总数
		api(params).then((res) => {
			if (res.code === 200) {
				const { obligorUnitTypeVOList } = res.data;
				obligorUnitTypeVOList.forEach(((item) => {
					if (item.obligorUnitType === 1) {
						constructArray = item;
						constructNum = item.obligorUnitCount;
					} else if (item.obligorUnitType === 2) {
						winbidArray = item;
						winbidNum = item.obligorUnitCount;
					} else {
						underwayArray = item;
						underwayNum = item.obligorUnitCount;
					}
				}));
				getAssetProfile(constructNum + winbidNum + underwayNum, 'Construct');
				// construct 建设  winbid 中标单位 underway 施工单位
				if (constructNum > 0) {
					this.setState({
						selectType: 'construct',
						RingData: getTypeName(constructArray.projectInfoTypeVoList),
						timeLineData: constructArray.yearDistributions,
						RingDataNum: getCount(constructArray.projectInfoTypeVoList, 'projectTypeCount'),
						timeLineDataNum: getCount(constructArray.yearDistributions),
					});
				} else if (winbidNum > 0) {
					this.setState({
						selectType: 'winbid',
						RingData: getTypeName(winbidArray.projectInfoTypeVoList),
						timeLineData: winbidArray.yearDistributions,
						RingDataNum: getCount(winbidArray.projectInfoTypeVoList, 'projectTypeCount'),
						timeLineDataNum: getCount(winbidArray.yearDistributions),
					});
				} else {
					this.setState({
						selectType: 'underway',
						RingData: getTypeName(underwayArray.projectInfoTypeVoList),
						timeLineData: underwayArray.yearDistributions,
						RingDataNum: getCount(underwayArray.projectInfoTypeVoList, 'projectTypeCount'),
						timeLineDataNum: getCount(underwayArray.yearDistributions),
					});
				}
				this.setState({
					constructArray,
					winbidArray,
					underwayArray,
					constructNum,
					winbidNum,
					underwayNum,
				});
			}
		}).catch(() => {
			// this.setState({ loading: false });
		});
	};

	checkTime = (selectType) => {
		const { constructArray, winbidArray, underwayArray } = this.state;
		if (selectType === 'construct') {
			this.setState({
				selectType,
				RingData: getTypeName(constructArray.projectInfoTypeVoList),
				timeLineData: constructArray.yearDistributions,
				RingDataNum: getCount(constructArray.projectInfoTypeVoList, 'projectTypeCount'),
				timeLineDataNum: getCount(constructArray.yearDistributions),
			});
		} else if (selectType === 'winbid') {
			this.setState({
				selectType,
				RingData: getTypeName(winbidArray.projectInfoTypeVoList),
				timeLineData: winbidArray.yearDistributions,
				RingDataNum: getCount(winbidArray.projectInfoTypeVoList, 'projectTypeCount'),
				timeLineDataNum: getCount(winbidArray.yearDistributions),
			});
		} else if (selectType === 'underway') {
			this.setState({
				selectType,
				RingData: getTypeName(underwayArray.projectInfoTypeVoList),
				timeLineData: underwayArray.yearDistributions,
				RingDataNum: getCount(underwayArray.projectInfoTypeVoList, 'projectTypeCount'),
				timeLineDataNum: getCount(underwayArray.yearDistributions),
			});
		}
	};

	render() {
		const { portrait } = this.props;
		const {
			RingData, timeLineData, selectType, constructNum, winbidNum, underwayNum, RingDataNum, timeLineDataNum,
		} = this.state;
		return (
			<div>
				{timeLineDataNum > 0 || RingDataNum > 0 ? (
					<div>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{constructNum || winbidNum || underwayNum ? `${constructNum + winbidNum + underwayNum} 条` : '-'}
							</span>
							<span className="container-title-name">
								在建工程
							</span>
						</div>
						<div className="overview-container-content">
							{portrait !== 'debtor_personal' && (
								<div style={{ marginBottom: 20 }}>
									<TagSide
										content="建设单位"
										num={constructNum}
										onClick={() => {
											if (constructNum > 0) {
												this.checkTime('construct');
											}
										}}
										tag={selectType === 'construct' ? 'yc-tag-active' : ''}
									/>
									<TagSide
										content="中标单位"
										num={winbidNum}
										onClick={() => {
											if (winbidNum > 0) {
												this.checkTime('winbid');
											}
										}}
										tag={selectType === 'winbid' ? 'yc-tag-active' : ''}
									/>
									<TagSide
										content="施工单位"
										num={underwayNum}
										onClick={() => {
											if (underwayNum > 0) {
												this.checkTime('underway');
											}
										}}
										tag={selectType === 'underway' ? 'yc-tag-active' : ''}
									/>
								</div>
							)}
							<div style={{ marginBottom: 20 }} />
							{RingDataNum > 0 && <RingEcharts title="工程类型分布" Data={RingData} id="constructCharts" customColorArray={['#1C80E1', '#45A1FF', '#59C874', '#FCD44A', '#FB8E3C']} />}
							{timeLineDataNum > 0 && selectType !== 'construct' && <TimeLine title="年份分布" Data={timeLineData} id="constructTimeLine" />}
						</div>
					</div>
				) : null }
			</div>
		);
	}
}
