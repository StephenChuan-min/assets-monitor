import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import message from '@/utils/api/message/message';
import { markRead } from '@/utils/api/message';
import TablePledge from '@/views/asset-excavate/equity-pledge/table';
import { Spin } from '@/common';

class EquityPledge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false,
			obligorId: props.obligorId,
			total: props.total,
			current: 1,
			page: 1,
			num: 5,
		};
	}

	componentDidMount() {
		this.toGetData();
	}

	componentWillReceiveProps(nextProps) {
		const { obligorId } = this.props;
		if (nextProps.obligorId !== obligorId) {
			this.setState({
				obligorId: nextProps.obligorId,
			}, () => {
				this.toGetData();
			});
		}
	}

	// 请求获取数据
	toGetData = () => {
		const { stationId } = this.props;
		const { page, num, obligorId } = this.state;
		const reg = new RegExp(10501);
		const api = message.filter(item => reg.test(item.dataType))[0].list;
		const params = {
			obligorId,
			stationId,
			page,
			num,
		};
		this.setState({
			loading: true,
		});
		api(params).then((res) => {
			if (res.code === 200) {
				this.setState({
					dataSource: res.data.list,
					current: res.data.page,
					total: res.data.total,
					loading: false,
				});
			}
		}).catch((err) => {
			this.setState({
				loading: false,
			});
			console.log('err === ', err);
		});
	};

	// 表格变化，刷新表格
	onRefresh = (data, type) => {
		const { dataSource } = this.state;
		const { index } = data;
		const _dataSource = dataSource;
		_dataSource[index][type] = data[type];
		this.setState({
			dataSource: _dataSource,
		});
	};

	// 行点击事件
	toRowClick = (record, index) => {
		const { id, isRead } = record;
		if (!isRead) {
			markRead({ id }).then((res) => {
				if (res.code === 200) {
					this.onRefresh({ id, isRead: !isRead, index }, 'isRead');
				}
			});
		}
	};

	// 监听table翻页
	onPageChange = (val) => {
		this.setState({
			page: val,
		}, () => {
			this.toGetData();
		});
	};

	render() {
		const { id, title } = this.props;
		const {
			dataSource, total, loading, current,
		} = this.state;
		const tableProps = {
			current,
			noSort: true,
			dataSource,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			isShowPagination: total > 5,
			pageSize: 5,
			total,
		};
		return (
			<React.Fragment>
				<div className="messageDetail-table-title" id={id}>
					{title}
					<span className="messageDetail-table-total">{total}</span>
				</div>
				<div className="messageDetail-table-container">
					<Spin visible={loading}>
						<TablePledge {...tableProps} />
					</Spin>
				</div>
			</React.Fragment>
		);
	}
}

EquityPledge.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	total: PropTypes.number,
	// eslint-disable-next-line react/forbid-prop-types
	obligorId: PropTypes.any,
	stationId: PropTypes.number,
};

EquityPledge.defaultProps = {
	id: 'message-equityPledge',
	title: '股权质押',
	total: 0,
	obligorId: undefined,
	stationId: 0,
};

export default EquityPledge;
