import React from 'react';
import { overviewBankruptcy, businessOverviewBankruptcy } from '@/utils/api/professional-work/overview';
import TimeLine from '@/views/portrait-inquiry/common/timeLine';
import { Spin } from '@/common';
import getCount from '@/views/portrait-inquiry/common/getCount';
import './style.scss';

export default class Bankruptcy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			timeLineData: [],
			detail: [],
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
		const api = portrait === 'business' ? businessOverviewBankruptcy : overviewBankruptcy;
		this.setState({ loading: true });
		api(params).then((res) => {
			if (res.code === 200) {
				const timeLineData = res.data.yearDistributions;
				const allNum = getCount(timeLineData);
				getAssetProfile(allNum, 'Bankruptcy');
				this.setState({
					loading: false,
					detail: res.data.detail || [],
					timeLineData, // 年份分布
				});
			} else {
				this.setState({ loading: false });
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	handleOnClick = (value) => {
		if (value) {
			const w = window.open('about:blank');
			w.location.href = `#/business/debtor/detail?id=${value}`;
		}
	};

	render() {
		const { timeLineData, loading, detail } = this.state;
		const { portrait } = this.props;
		const isBusiness = portrait === 'business';
		const hasDetail = Array.isArray(detail) && detail.length > 0;
		return (
			<div>
				{
					getCount(timeLineData) > 0
						? (
							<Spin visible={loading}>
								<div className="overview-container-title">
									<div className="overview-left-item" />
									<span className="container-title-num">
										{`${getCount(timeLineData)} 条`}
									</span>
									<span className="container-title-name">破产重组信息</span>
								</div>

								{hasDetail && isBusiness ? (
									<div style={{ marginBottom: '12px', fontSize: '12px', marginLeft: '10px' }}>
										涉及企业：
										{hasDetail && detail.map((item, index) => {
											const key = item.obligorId;
											return (
												<span key={key} className="click-link" onClick={() => this.handleOnClick(item.obligorId)}>
													{item.obligorName}
													{detail.length - index !== 1 && '、'}
												</span>
											);
										})}
									</div>
								) : null}

								<div className="overview-container-content">
									{getCount(timeLineData) > 0 && <TimeLine title="年份分布" Data={timeLineData} id="ChattelMortgage" />}
								</div>
							</Spin>
						) : null}
			</div>
		);
	}
}
