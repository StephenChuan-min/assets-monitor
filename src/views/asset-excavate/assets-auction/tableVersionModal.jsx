import React from 'react';
import { Modal, Timeline } from 'antd';
import { Ellipsis, Spin } from '@/common';
import { toThousands } from '@/utils/changeTime';

const status = (value) => {
	switch (value) {
	case 1: return '即将开始';
	case 3: return '正在进行';
	case 5: return '已成交';
	case 7: return '已流拍';
	case 9: return '中止';
	case 11: return '撤回';
	default: return '-';
	}
};

const statusPrice = (value) => {
	switch (value) {
	case 1: return '起拍价: ';
	case 5: return '成交价: ';
	case 3:
	case 7:
	case 9:
	case 11: return '当前价: ';
	default: return '-';
	}
};

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
	}


	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { loading } = this.state;
		const { historyInfoModalVisible, data, customStyle } = this.props;
		const parsingTitle = (data.title || '').replace(/^【([^】])*】/, '');
		return (
			<Modal title="历史拍卖信息" width={880} style={customStyle ? { 'max-height': 650, top: '19%' } : { 'max-height': 650 }} visible={historyInfoModalVisible} footer={null} onCancel={this.handleCancel}>
				<Spin visible={loading}>
					<div className="yc-history-content">
						<div className="yc-history-title">{data.parsingTitle || parsingTitle || data.title || '-'}</div>
						<div className="yc-history-item">
							<span>
								<span className="yc-history-label">评估价：</span>
								{`${toThousands(data.consultPrice)} 元`}
							</span>
							<div className="yc-table-line" />
							<span>
								<span className="yc-history-label">处置单位：</span>
								{data.court || '-'}
							</span>
						</div>
						<div className="yc-Timeline-content">
							<Timeline>
								{
									data && (data.historyAuctions || data.historyAuction).map(item => (
										<Timeline.Item>
											<div className="yc-Timeline-item TimelineName">{item.round ? item.round : '拍卖轮次未公示'}</div>
											<div className="yc-Timeline-label">
												<span className="yc-item-label">
													<span className="yc-history-label">拍卖结果：</span>
													{status(item.status)}
												</span>
												<div className="yc-table-line" />
												<span className="yc-item-label">
													<span className="yc-history-label">{statusPrice(item.status)}</span>
													{item.status === 1 ? `${toThousands(item.initialPrice)} 元` : `${toThousands(item.currentPrice)} 元`}
												</span>
												<div className="yc-table-line" />
												<span className="yc-item-label">
													<span className="yc-history-label">拍卖时间：</span>
													{item.start}
												</span>
											</div>
											<div className="yc-Timeline-item TimelineUrl">
												{/* <a href={item.url} target="_blank" rel="noopener noreferrer" className="yc-table-text-link"> */}
												{/*	{item.url} */}
												{/* </a> */}
												<Ellipsis isSourceLink content={item.url} url={item.url} />
											</div>
										</Timeline.Item>
									))
								}
							</Timeline>
						</div>
					</div>

				</Spin>
			</Modal>
		);
	}
}
