import React from 'react';
import { overviewRisk, businessOverviewRisk } from '@/utils/api/professional-work/overview';
import ColumnarEcharts from '@/views/portrait-inquiry/common/columnarEcharts';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
// import NoContent from '@/common/noContent';

export default class BusinessRisk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			columnarData: [],
			columnarNum: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const {
			businessId, obligorId, portrait, getAssetProfile,
		} = this.props;
		const params = portrait === 'business' ? { businessId, type: 2 } : { obligorId, type: 2 };
		const api = portrait === 'business' ? businessOverviewRisk : overviewRisk;
		this.setState({ loading: true });
		api(params).then((res) => {
			if (res.code === 200) {
				const columnarData = [];
				columnarData.push({ count: res.data.abnormal, typeName: '经营异常' });
				columnarData.push({ count: res.data.tax, typeName: '税收违法' });
				columnarData.push({ count: res.data.punishment, typeName: '行政处罚' });
				columnarData.push({ count: res.data.change, typeName: '工商变更' });
				columnarData.push({ count: res.data.illegal, typeName: '严重违法' });
				columnarData.push({ count: res.data.epb, typeName: '环保处罚' });
				// const columnarData = res.data.businessRiskInfos;
				const columnarNum = getCount(columnarData);
				getAssetProfile(columnarNum, 'BusinessRisk');
				this.setState({
					columnarNum,
					columnarData,
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
		const { columnarData, loading, columnarNum } = this.state;
		return (
			<div>
				<Spin visible={loading}>
					{columnarData && columnarNum > 0 ? (
						<div>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${getCount(columnarData)} 条`}
								</span>
								<span className="container-title-name">经营风险信息</span>
							</div>
							<div className="overview-container-content" style={{ marginLeft: '-20px' }}>
								<ColumnarEcharts title="" Data={columnarData} id="BusinessRisk" />
							</div>
						</div>
					) : null}
				</Spin>
			</div>
		);
	}
}
