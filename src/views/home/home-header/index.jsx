import React from 'react';
import { closeNotice } from 'api/home';
import { Icon } from '@/common';
import close from '@/assets/img/home/close.png';
import './style.scss';

class HomeHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 打开业务管理对应的列表页
	handleOpenBusiness = (type) => {
		const w = window.open('about:blank');
		if (type === 'debtor') {
			w.location.href = '#/business/view/debtor';
		} else {
			w.location.href = '#/business/view';
		}
	};

	// 关闭添加债务人消息
	handleCloseDebtor = (type) => {
		const params = {
			type: type === 'debtor' ? 1 : 2,
		};
		// 1:首页低债务人数提醒(永久) 2:首页低业务提醒(永久) 3:首页监控日报提醒(当日)
		closeNotice(params).then((res) => {
			if (res.code === 200) {
				const { getHeaderData } = this.props;
				if (getHeaderData) {
					getHeaderData();
				}
			}
		}).catch();
	};

	render() {
		const { headerPropsData, headerPropsData: { displayObligorNotice } } = this.props;
		// const percentageBorrowers = headerPropsData && headerPropsData.mainObligorBusinessCount && headerPropsData.businessCount
		// 	&& (headerPropsData.mainObligorBusinessCount / headerPropsData.businessCount).toFixed(2) * 100;
		// const percentageBorrowers = 80;
		return (
			<div className="header-container">
				<div className="header-container-left">
					<div className="left-organization">
						<Icon type="icon-my-org" className="left-organization-icon" />
						<span className="left-organization-name">我的机构</span>
						<div className="left-organization-text">{headerPropsData ? headerPropsData.orgName : '-'}</div>
					</div>
				</div>

				<div className="header-container-right">

					<div className="right-organization">
						<Icon type="icon-home-user" className="right-organization-icon" style={{ color: '#3DBD7D' }} />
						<span className="right-organization-name">本级机构监控债务人数</span>
						<div className="right-organization-text cursor" onClick={() => this.handleOpenBusiness('debtor')}>
							<span className="right-organization-text-num">
								{headerPropsData ? headerPropsData.obligorCount : '-'}
							</span>
							名
						</div>
						 { displayObligorNotice ? (
							<div className="card-content-left-arrow" style={{ left: -57 }}>
								<div className="card-content-popover-content">
									<span>监控债务人数偏低，建议添加更多债务人</span>
									<img
										className="card-content-popover-content-close"
										src={close}
										alt="关闭按钮"
										onClick={() => this.handleCloseDebtor('debtor')}
									/>
								</div>
							</div>
						 ) : null}
					</div>

					<div className="horizontal-line" />
					<div className="right-organization">
						<Icon type="icon-business" className="right-organization-icon" style={{ color: '#FB8E3C' }} />
						<span className="right-organization-name">本级机构监控业务笔数</span>
						<div className="right-organization-text cursor" onClick={() => this.handleOpenBusiness('business')}>
							<span className="right-organization-text-num">
								{headerPropsData ? headerPropsData.businessCount : '-'}
							</span>
							笔
						</div>
						 {/* { displayBusinessNotice ? ( */}
						{/* <div className="card-content-left-arrow"> */}
						{/*	<div className="card-content-popover-content" style={{ width: '386px' }}> */}
						{/*		<span> */}
						{/*			{percentageBorrowers} */}
						{/*			%的业务只导入了借款人，建议导入保证人，便于形成业务画像 */}
						{/*		</span> */}
						{/*		<img */}
						{/*			className="card-content-popover-content-close" */}
						{/*			src={close} */}
						{/*			alt="关闭按钮" */}
						{/*			onClick={() => this.handleCloseDebtor('business')} */}
						{/*		/> */}
						{/*	</div> */}
						{/* </div> */}
						 {/* ) : null} */}
					</div>
					<div className="horizontal-line" />
					<div className="right-organization">
						<Icon type="icon-org" className="right-organization-icon" style={{ color: '#1C80E1' }} />
						<span className="right-organization-name">下级机构数</span>
						<div className="right-organization-text">
							<span className="right-organization-text-orgNum">
								{headerPropsData && headerPropsData.totalCount && headerPropsData.totalCount ? headerPropsData.totalCount - 1 : '-'}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HomeHeader;
