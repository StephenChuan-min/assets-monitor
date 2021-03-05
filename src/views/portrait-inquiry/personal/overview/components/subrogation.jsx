import React from 'react';
import { Tooltip } from 'antd';
import { Icon, Spin } from '@/common';
import { getQueryByName } from '@/utils';
import { getSubrogation } from '@/utils/api/portrait-inquiry/personal/overview';
import ColumnarEcharts from '../../../common/columnarEcharts';
import RingEcharts from '../../../common/ringEcharts';
import TimeLine from '../../../common/timeLine';
import getCount from '../../../common/getCount';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allNum: 0,
			columnarData: [],
			RingData: [],
			timeLineData: [],
		};
		this.info = {
			obligorName: getQueryByName(window.location.href, 'name'),
			obligorNumber: getQueryByName(window.location.href, 'num'),
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const params = this.info;
		const { getAssetProfile } = this.props;
		this.setState({ loading: true });
		getSubrogation(params).then((res) => {
			if (res.code === 200) {
				const timeLineData = res.data.subrogationInfo.yearDistributions;
				const columnarData = res.data.subrogationInfo.caseReasons;
				const RingData = res.data.subrogationInfo.caseTypes;
				const allNum = res.data.subrogationInfo.count;
				getAssetProfile(allNum, 'Subrogation', false);
				this.setState({
					allNum,
					RingData,
					columnarData,
					timeLineData,
					loading: false,
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	render() {
		const {
			columnarData, RingData, timeLineData, loading, allNum,
		} = this.state;

		return (
			<div>
				<div>
					{
						columnarData && RingData && getCount(timeLineData) > 0 && getCount(columnarData) > 0 && RingData && getCount(RingData) > 0 && (
						<Spin visible={loading}>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${allNum || '-'} 条`}
								</span>
								<span className="container-title-name">
									代位权信息 (裁判文书)
									<Tooltip placement="top" title="债务人作为原告起诉他人的案件">
										<span><Icon type="icon-question" style={{ fontSize: 14, marginLeft: 5 }} /></span>
									</Tooltip>
								</span>
							</div>
							<div className="overview-container-content">
								{timeLineData && getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="subrogation" />}
								{columnarData && getCount(columnarData) > 0 && <ColumnarEcharts title="案由分布" Data={columnarData} id="subrogation" />}
								{RingData && getCount(RingData) > 0 && <RingEcharts title="案件类型分布" Data={RingData} id="subrogation" customColorArray={['#45A1FF', '#4DCAC9', '#FCD44A', '#F2657A']} />}
							</div>
						</Spin>
						)
					}
				</div>
			</div>
		);
	}
}
