import React from 'react';
import { navigate } from '@reach/router';
import { message } from 'antd';
import {
	notify, // 消息提醒
	isRead, // 标记已读
} from '@/utils/api/inform';
import { Icon, Spin } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import './style.scss';

export default class HeaderMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [],
			loading: false,
		};
	}

	componentDidMount() {
		const { rule } = this.props;
		if (rule && rule.menu_sy) {
			this.informCenter();
		}
	}

	informCenter = () => {
		const { getNoticeNum } = this.props;
		const params = {
			isRead: false,
		};
		this.setState({
			loading: true,
		});
		notify(params).then((res) => {
			if (res.code === 200) {
				getNoticeNum(res.data.total);
				this.setState({
					dataList: res.data.list,
					loading: false,
				});
			} else {
				this.setState({
					loading: false,
				});
			}
		});
	};

	skip = (item) => {
		const { obligorId, id, operateType } = item;
		const params = {
			idList: [id],
		};
		console.log(obligorId, operateType, '跳转');

		// 资产跟进提醒 tab切换为跟进中 带入拍卖信息标题
		if (operateType === 'newAuctionProcessAlert') {
			const { title } = JSON.parse(item.extend);
			const w = window.open('about:blank');
			w.location.href = `#/monitor?process=3&id=${obligorId}${title ? `&title=${title}` : ''}`;
		}
		// 拍卖状态变更  tab切换为全部 带入拍卖信息标题
		if (operateType === 'auctionStatusChangeAlert') {
			const { title } = JSON.parse(item.extend);
			const w = window.open('about:blank');
			w.location.href = `#/monitor?process=3&id=${obligorId}${title ? `&title=${title}` : ''}`;
		}
		// 列入失信名单 || 失信状态移除
		if (operateType === 'dishonestAdd' || operateType === 'dishonestRemove') {
			const w = window.open('about:blank');
			w.location.href = `#/business/debtor/detail?id=${
				obligorId
			}`;
		}
		// 监控日报
		if (operateType === 'monitorReport') {
			if (JSON.parse(item.extend) && JSON.parse(item.extend).total > 200) {
				const w = window.open('about:blank');
				w.location.href = '#/info/monitor';
			} else {
				const w = window.open('about:blank');
				w.location.href = `#/messageDetail?stationId=${
					id
				}`;
			}
		}
		isRead(params).then((res) => {
			if (res.code === 200) {
				this.informCenter();
				window.location.reload(); // 实现页面重新加载/
				// message.success(res.message);
				console.log('成功');
			} else {
				message.warning(res.message);
			}
		});
	};

	// all
	allRead = () => {
		const { dataList } = this.state;
		if (dataList.length > 0) {
			isRead({}).then((res) => {
				if (res.code === 200) {
					this.informCenter();
					window.location.reload(); // 实现页面重新加载/
				} else {
					message.warning(res.message);
				}
			});
		}
	};

	render() {
		const { dataList, loading } = this.state;

		return (
			<div
				className="yc-header-message"
				onClick={(e) => {
					e.stopPropagation(); // 防止冒泡
				}}
			>
				<div className="yc-header-title">
					<div className="yc-station-box">
						<span>消息</span>
						<span onClick={this.allRead} className="yc-station-btn">全部标为已读</span>
					</div>
				</div>
				<Spin visible={loading}>

					<div className="yc-station-list">
						{dataList && dataList.length > 0 ? dataList.map(item => (
							<div key={item.id} className="yc-station-item" onClick={() => this.skip(item)}>
								{item.isRead === false && (
								<Icon
									type="icon-dot"
									style={{
										fontSize: 12, color: 'red', position: 'absolute', top: '10px', left: '8px',
									}}
								/>
								)}
								<div className="yc-station-item-title">
									{item.title}
									<span className="yc-station-item-brief">{formatDateTime(item.createTime)}</span>
								</div>
								<div className="yc-station-item-content">
									<span dangerouslySetInnerHTML={{ __html: item.content }} />
									，
									{
										item.operateType === 'monitorReport' && JSON.parse(item.extend).total > 200 && <span>点击前往“信息监控”查看</span>
									}
									{
										item.operateType === 'monitorReport' && JSON.parse(item.extend).total <= 200 && <span>点击查看日报详情</span>
									}
									{
										item.operateType !== 'monitorReport' && <span>点击查看</span>
									}
								</div>
							</div>
						)) : (
							<div className="notice-station-wrapper">
								<div className="notice notice-station-img" />
								<span className="notice-text">
									暂无新消息，已读信息请至
									<a
										onClick={() => {
											navigate('/message');
										}}
										target="_blank"
									>
										消息中心
									</a>
									查看
								</span>
							</div>
						)}
					</div>
					<div className="yc-station-box-center">
						<a onClick={() => {
							navigate('/message');
						}}
						>
							查看全部
						</a>
					</div>
				</Spin>

			</div>
		);
	}
}
