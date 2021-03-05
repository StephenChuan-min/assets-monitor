import React from 'react';
import TagSide from '@/views/portrait-inquiry/common/checkBtn';
import { getConstruct } from '@/utils/api/portrait-inquiry/enterprise/overview';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';
import getCount from '../../../common/getCount';

const projectTypeMap = new Map([
	[0, '未知'],
	[1, '建筑工程'],
	[2, '装饰工程'],
	[3, '市政道路工程'],
	[4, '其他'],
]);

// construct 建设  winbid 中标单位 underway 施工单位
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
		const { companyId, getAssetProfile } = this.props;
		const params = {
			companyId,
		};
		getConstruct(params).then((res) => {
			if (res.code === 200) {
				const constructArray = res.data.obligorUnitTypeVOList.filter(i => i.obligorUnitType === 1)[0]; // 建设单位
				const winbidArray = res.data.obligorUnitTypeVOList.filter(i => i.obligorUnitType === 2)[0]; // 中标单位
				const underwayArray = res.data.obligorUnitTypeVOList.filter(i => i.obligorUnitType === 3)[0]; // 施工单位

				const constructNum = constructArray.obligorUnitCount; // 建设单位总数数量
				const winbidNum = winbidArray.obligorUnitCount; // 中标单位总数
				const underwayNum = underwayArray.obligorUnitCount; // 施工单位总数

				const allNum = constructNum + winbidNum + underwayNum;
				getAssetProfile(allNum, 'Construct');

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
			} else {
				// this.setState({ loading: false });
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
		const {
			RingData, timeLineData, selectType, constructArray, winbidArray, underwayArray, constructNum, winbidNum, underwayNum, RingDataNum, timeLineDataNum,
		} = this.state;
		return (
			<div>
				{timeLineDataNum > 0 || RingDataNum > 0 ? (
					<div>
						<div className="overview-container-title">
							<div className="overview-left-item" />
							<span className="container-title-num">
								{constructArray.obligorUnitCount || winbidArray.obligorUnitCount || underwayArray.obligorUnitCount ? `${constructArray.obligorUnitCount + winbidArray.obligorUnitCount + underwayArray.obligorUnitCount} 条` : '-'}
							</span>
							<span className="container-title-name">
								在建工程
							</span>
						</div>
						<div className="overview-container-content">
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
							{RingDataNum > 0 && <RingEcharts title="工程类型分布" Data={RingData} id="constructCharts" customColorArray={['#1C80E1', '#45A1FF', '#59C874', '#FCD44A', '#FB8E3C']} />}
							{timeLineDataNum > 0 && selectType !== 'construct' && <TimeLine title="年份分布" Data={timeLineData} id="constructTimeLine" />}
						</div>
					</div>
				) : null }
			</div>
		);
	}
}
