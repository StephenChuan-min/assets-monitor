import React, { PureComponent } from 'react';
import { message } from 'antd';
import { selfTree } from '@/utils/api/home';
import { toThousands } from '@/utils/changeTime';
import { Icon, Spin } from '@/common';
import TableTree from './tableTree';
import './style.scss';

const api = { selfTree };
// 根据金额判断金额字体
const moneyLength = (value) => {
	const numLength = value && String(value).length;
	let size = 24;
	if (numLength > 16) {
		size = 22;
	} else if (numLength > 18) {
		size = 20;
	} else if (numLength > 20) {
		size = 18;
	} else if (numLength > 24) {
		size = 14;
	}
	return size;
};

class HomeRouter extends PureComponent {
	constructor(props) {
		super(props);
		document.title = '机构管理-机构统计';
		this.state = {
			orgDetail: null,
			tree: null,
			errorLoading: false,
		};
	}

	componentWillMount() {
		this.getData();
	}


	// 获取消息列表
	getData = () => {
		this.setState({
			errorLoading: true,
		});
		api.selfTree().then((res) => {
			if (res && res.code === 200) {
				this.setState({
					orgDetail: res.data.orgDetail,
					tree: res.data.tree,
					errorLoading: false,
					data: res.data,
				});
			} else {
				this.setState({
					errorLoading: false,
				});
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({
				errorLoading: false,
			});
		});
	};

	render() {
		const {
			orgDetail, tree, errorLoading, data,
		} = this.state;
		const { rule } = this.props;
		return (
			<div className="statistics-container">
				<Spin visible={errorLoading}>
					<div className="statistics-container-header">
						<div className="statistics-container-header-left">
							资产拍卖数据使用情况统计
						</div>
						<div className="statistics-container-header-right">
							<div className="right-statistics">
								<span className="right-statistics-ownerName">
									我的机构
									<span style={{ color: '#7D8699', marginLeft: '10px', fontSize: '12px' }}>帐号所在机构</span>
								</span>
								<div className="right-statistics-ownerName-text">
									{orgDetail ? orgDetail.name : '-'}
								</div>
							</div>
							<div className="horizontal-line" />
							<div className="right-statistics">
								<Icon type="icon-org" className="right-statistics-icon" style={{ color: '#1C80E1' }} />
								<span className="right-statistics-name">下级机构数</span>
								<div className="right-statistics-text">
									<span className="right-statistics-text-num">
										{orgDetail ? orgDetail.totalCount - 1 : '-'}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="statistics-container-content">
						<div className="statistics-container-content-title">
							<div className="statistics-container-content-title-item" />
							总体情况统计
							<span className="statistics-container-content-title-remark"> 包括本机构及子机构 </span>
						</div>

						<div className="statistics-container-content-left-item">
							<Icon type="icon-business" className="statistics-container-content-left-item-icon" style={{ color: '#1C80E1' }} />
							<div className="statistics-container-content-left-item-text">
								未跟进信息数 (条)
							</div>
							<div className="statistics-container-content-left-item-num">
								<span style={{ fontWeight: 500 }}>{tree ? tree.monitorUnfollowedCount : '-'}</span>
								<div className="statistics-container-content-left-item-num-distribution">
									<span className="statistic-distribution-name">
										其他状态分布：
									</span>
									<span className="statistic-distribution-text">
										跟进中
										<span className="statistic-distribution-text-normal">{tree ? tree.monitorFollowedCount : '-'}</span>
									</span>
									<span className="statistic-distribution-line" />
									<span className="statistic-distribution-text">
										已完成
										<span className="statistic-distribution-text-normal">{tree ? tree.monitorDoneCount : '-'}</span>
									</span>
									<span className="statistic-distribution-line" />
									<span className="statistic-distribution-text">
										全部
										<span className="statistic-distribution-text-normal">{tree ? tree.monitorTotalCount : '-'}</span>
									</span>
								</div>
							</div>
						</div>

						<div className="statistics-container-content-right-item">
							<div className="right-statistics">
								<Icon type="icon-home-user" className="right-statistics-icon" style={{ color: '#3DBD7D' }} />
								<span className="right-statistics-name">总监控债务人数 (名)</span>
								<div className="right-statistics-text">
									<span className="right-statistics-text-num">
										{tree ? tree.obligorCount : '-'}
									</span>
								</div>
							</div>
						</div>
						<div className="statistics-container-content-right-item" style={{ borderRight: 0, minWidth: '320px', fontSize: '14px' }}>
							<div className="right-statistics">
								<Icon type="icon-money" className="right-statistics-icon" style={{ color: '#FB8E3C' }} />
								<span className="right-statistics-name">追回总金额 (元)</span>
								<div className="right-statistics-text">
									<span className="right-statistics-text-num" style={tree ? { fontSize: moneyLength(tree.recovery) } : {}}>
										{tree ? toThousands(tree.recovery) : '-'}
									</span>
								</div>
							</div>
						</div>
						<div className="statistics-container-content-title" style={{ marginTop: '40px' }}>
							<div className="statistics-container-content-title-item" />
							分机构统计
						</div>
						<div className="statistics-tree-container">
							<TableTree rule={rule} tree={tree && tree} data={data} />
						</div>
					</div>
				</Spin>
			</div>
		);
	}
}

export default HomeRouter;
