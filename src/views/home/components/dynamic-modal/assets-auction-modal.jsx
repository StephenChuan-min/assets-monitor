import React from 'react';
import { Modal, message } from 'antd';
import { followSingle, unFollowSingle } from 'api/monitor-info/assets';
import { processSave } from '@/utils/api/monitor-info/assets-follow';
import { Spin, Table, Button } from '@/common';
import { Attentions } from '@/common/table';
import { AssetsInfo, AuctionInfo, MatchingReason } from '@/views/asset-excavate/assets-auction/tableComponents';
import { floatFormat } from '@/utils/format';
import FollowModel from '@/views/asset-excavate/assets-auction/follow-info';
import TableVersionModal from '@/views/asset-excavate/assets-auction/tableVersionModal';
import '@/views/asset-excavate/assets-auction/style.scss';

// 忽略操作
const handleIgnore = (row, index, onRefresh) => {
	Modal.confirm({
		title: '确认忽略本条推送信息吗？',
		content: '点击确定，本条推送信息将被标记为忽略。',
		iconType: 'exclamation-circle',
		style: { top: '29%' },
		onOk() {
			processSave({ monitorId: row.id, process: 12 }, true).then((res) => {
				if (res.code === 200) {
					message.success('操作成功！');
					onRefresh({ id: row.id, process: 12, index }, 'process');
				}
			});
		},
		onCancel() {},
	});
};

export default class DetailModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			source: {},
			historyInfoModalVisible: false,
			historyInfoModalData: {},
			loading: false,
			dataSource: [],
			columns: [
				{
					title: '业务信息',
					width: '23%',
					render: (text, row, index, noMatching, asset = true) => AssetsInfo(text, row, index, noMatching, asset),
				}, {
					title: '匹配原因',
					dataIndex: 'reason',
					width: '33%',
					render: MatchingReason,
				}, {
					title: '拍卖信息',
					width: '33%',
					render: (text, row) => AuctionInfo(text, row, this.toOpenHistory),
				}, {
					title: '操作',
					width: '11%',
					unNormal: true,
					className: 'tAlignCenter_important yc-assets-auction-action',
					render: (text, row, index) => {
						const { recovery, process } = row;
						const event = {
							onClick: () => this.toFollowClick(row, index),
						};
						return (
							<React.Fragment>
								{recovery > 0 ?	(
									<div className="auction-recovery">
										追回金额
										{floatFormat(recovery).length > 12 ? <br /> : '：'}
										{`${floatFormat(recovery)}元`}
									</div>
								) : ''}
								{{
									0: (
										<React.Fragment>
											<Button className="auction-button" type="ghost-other" title="跟进" {...event} />
											<br />
											<Button className="auction-button" title="忽略" onClick={() => handleIgnore(row, index, this.onRefresh)} />
										</React.Fragment>
									),
									3: <Button className="auction-button" type="ghost-ing" title="跟进中" {...event} />,
									6: <Button className="auction-button" type="ghost-ing" title="跟进中" {...event} />,
									9: <Button className="auction-button" type="ghost-done" title="已完成" {...event} />,
									12: (
										<React.Fragment>
											<Button className="auction-button" type="ghost-other" title="跟进" {...event} />
											<br />
											<Button className="auction-button" type="ghost-ing" title="已忽略" disabled />
										</React.Fragment>
									),
									15: <Button className="auction-button" type="ghost-abort" title="已放弃" {...event} />,
								}[process] || null }
								<Attentions
									text={text}
									row={row}
									onClick={this.onRefresh}
									index={index}
									api={row.isAttention ? unFollowSingle : followSingle}
									single
								/>
							</React.Fragment>
						);
					},
				}],
		};
	}

	componentDidMount() {
		const { dataSource } = this.props;
		this.setState(() => ({
			dataSource,
		}));
	}


	// 跟进点击效果
	toFollowClick=(source, index) => {
		const _source = source;
		_source.index = index;
		this.setState({
			visible: true,
			source: _source,
		});
	};

	// 点击历史拍卖信息
	toOpenHistory=(source = {}) => {
		this.setState({
			historyInfoModalVisible: true,
			historyInfoModalData: source,
		});
	};

	// 表格发生变化
	onRefresh=(data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = [...dataSource];
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const {
			dataSource, columns, loading, visible, historyInfoModalVisible, historyInfoModalData, source,
		} = this.state;
		const { assetAuctionModalVisible } = this.props;
		return (
			<Modal
				title="匹配详情-资产拍卖"
				width={1100}
				style={{ height: 320 }}
				visible={assetAuctionModalVisible}
				footer={null}
				onCancel={this.handleCancel}
				wrapClassName="vertical-center-modal"
			>
				<div className="yc-assets-auction">

					<Spin visible={loading}>
						<Table
							scroll={dataSource.length > 8 ? { y: 440 } : {}}
							columns={columns}
							dataSource={dataSource}
							pagination={false}
							className="table"
							rowClassName={() => 'yc-assets-auction-table-row'}
						/>
						<div style={{ width: '100%', textAlign: 'center' }}>
							<Button onClick={this.handleCancel} type="primary" className="dynamic-modal-btn">关闭</Button>
						</div>
					</Spin>
					{
						visible ? (
							<FollowModel
								visible={visible}
								source={source}
								onClose={() => this.setState({ visible: false })}
								onRefresh={this.onRefresh}
							/>
						)
							: null
					}
					{historyInfoModalVisible && (
						<TableVersionModal
							onCancel={() => this.setState({ historyInfoModalVisible: false })}
							onOk={() => this.setState({ historyInfoModalVisible: false })}
							data={historyInfoModalData}
							historyInfoModalVisible={historyInfoModalVisible}
							customStyle
							wrapClassName="vertical-center-modal"
						/>
					)}
				</div>
			</Modal>
		);
	}
}
