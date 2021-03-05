import React from 'react';
import { Modal } from 'antd';
import { brokenCount } from 'api/professional-work/business/risk';
import { Spin, Tabs, Button } from '@/common';
import BrokenVersion from '@/views/risk-monitor/broken-record/table-version';
import BrokenList from '@/views/business/detail/table-version/broken-list';
import { toGetNumber, requestAll } from '@/utils/promise';
import { getHrefQuery, toGetModuleHeight as toH } from '@/utils';

export default class Subrogation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sourceType: toGetNumber(props.data, 20401) ? 20401 : 20402,
			config: [
				{
					id: 20401,
					name: '列入',
					number: toGetNumber(props.data, 20401),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20401),
				},
				{
					id: 20402,
					name: '已移除',
					number: toGetNumber(props.data, 20402),
					showNumber: true,
					disabled: !toGetNumber(props.data, 20402),
				}],
			brokenInfo: {
				status: props.portrait === 'business',
				loading: true,
				once: 0,
				yet: 0,
			},
			modalInfo: {
				visible: false,
				title: '',
			},
		};
	}

	componentDidMount() {
		const { brokenInfo } = this.state;
		const businessId = getHrefQuery('id');
		if (brokenInfo.status) {
			requestAll([{
				api: brokenCount['20403'].count({ businessId }),
				info: { id: 20403 },
			}, {
				api: brokenCount['20404'].count({ businessId }),
				info: { id: 20404 },
			}]).then((res) => {
				this.setState({
					brokenInfo: Object.assign({}, brokenInfo, {
						loading: false,
						yet: res[0].data,
						once: res[1].data,
					}),
				});
			});
		}
	}

	onSourceType=(val) => {
		const { sourceType } = this.state;
		if (sourceType !== val) {
			this.setState({ sourceType: val });
		}
	};

	toShowList=(count, field) => {
		const { modalInfo } = this.state;
		if (!count) return;
		this.setState({
			modalInfo: Object.assign({}, modalInfo, {
				visible: true,
				type: field === 'yet' ? 1 : 2,
				title: field === 'yet' ? '已失信债务人列表' : '曾失信债务人列表',
			}),
		});
	};


	handleCancel=() => {
		const { modalInfo } = this.state;
		this.setState({
			modalInfo: Object.assign({}, modalInfo, { visible: false }),
		});
	};

	render() {
		const {
			config, sourceType, brokenInfo: b, modalInfo: m,
		} = this.state;
		const { id, portrait, data } = this.props;
		const h = toH(sourceType, toGetNumber(data, sourceType), portrait);
		const params = {
			portrait,
			sourceType,
			loadingHeight: h,
		};
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<Tabs.Simple
					borderBottom
					onChange={this.onSourceType}
					source={config}
					symbol="none"
					defaultCurrent={sourceType}
					prefix={(
						<div className="yc-tabs-simple-prefix" style={{ width: 120 }}>
							<span>失信列表</span>
						</div>
					)}
					suffix={(
						<div className="yc-tabs-suffix-dishonest" style={{ display: b.status ? '' : 'none' }}>
							<Spin simple visible={b.loading} text="loading...">
								<div className="dishonest-count">
									<span className={b.yet && 'yc-table-text-link'} onClick={() => this.toShowList(b.yet, 'yet')}>{`已失信债务人：${b.yet}`}</span>
									<span className={b.once && 'yc-table-text-link'} onClick={() => this.toShowList(b.once, 'once')}>{`曾失信债务人：${b.once}`}</span>
								</div>
							</Spin>
						</div>
					)}
				/>
				<div className="inquiry-public-table">
					<BrokenVersion {...params} />
				</div>
				<Modal
					visible={m.visible}
					maskClosable={false}
					onCancel={this.handleCancel}
					title={m.title}
					footer={(
						<div style={{ textAlign: 'center' }}>
							<Button type="primary" size="large" onClick={this.handleCancel} style={{ width: 100 }}>关 闭</Button>
						</div>
          )}
				>
					<BrokenList type={m.type} />
				</Modal>
			</div>
		);
	}
}
