import React from 'react';
import { getRisk } from '@/utils/api/portrait-inquiry/enterprise/overview';
import ColumnarEcharts from '../../../common/columnarEcharts';
import getCount from '../../../common/getCount';

export default class BusinessRisk extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columnarData: [],
			columnarNum: null,
		};
	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		const { companyId, getRiskProfile } = this.props;
		const params = {
			companyId,
		};
		getRisk(params).then((res) => {
			if (res.code === 200) {
				const columnarData = res.data.businessRiskInfos;
				const columnarNum = getCount(columnarData);
				this.setState({
					columnarNum,
					columnarData,
				});
				getRiskProfile(columnarNum, 'BusinessRisk');
			}
		}).catch(() => {
		});
	};

	render() {
		const { columnarData, columnarNum } = this.state;

		return (
			<div>
				{
					columnarNum > 0 ? (
						<div>
							<div className="overview-container-title">
								<div className="overview-left-item" />
								<span className="container-title-num">
									{`${getCount(columnarData)} 条`}
								</span>
								<span className="container-title-name">经营风险信息</span>
							</div>
							<div className="overview-container-content">
								<ColumnarEcharts title="" Data={columnarData} id="BusinessRisk" />
							</div>
						</div>
					) : null
				}
			</div>
		);
	}
}
