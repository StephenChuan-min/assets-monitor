import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import { markRead } from '@/utils/api/message';
import TableTender from '@/views/asset-excavate/tender-bid/table';
import message from '@/utils/api/message/message';
import { Spin } from '@/common';

class Bidding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			loading: false,
			obligorId: props.obligorId,
			page: 1,
			num: 5,
			total: props.total,
			current: 1,
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

	// 请求监控日报详情数据
	toGetData = () => {
		const { stationId } = this.props;
		const { page, num, obligorId } = this.state;
		const reg = new RegExp(10401);
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

	// 监听页脚变化
	onPageChange = (val) => {
		this.setState({
			page: val,
		}, () => {
			this.toGetData();
		});
	};

	// 表格变化，刷新表格
	onRefresh=(data, type) => {
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

	render() {
		const { id, title } = this.props;
		const {
			dataSource, total, loading, current,
		} = this.state;
		const tableProps = {
			current,
			total,
			noSort: true,
			dataSource,
			onRefresh: this.onRefresh,
			onPageChange: this.onPageChange,
			isShowPagination: total > 5,
			pageSize: 5,
		};
		return (
			<React.Fragment>
				<div className="messageDetail-table-title" id={id}>
					{title}
					<span className="messageDetail-table-total">{total}</span>
				</div>
				<div className="messageDetail-table-container">
					<Spin visible={loading}>
						<TableTender {...tableProps} />
					</Spin>
				</div>
			</React.Fragment>
		);
	}
}

Bidding.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	total: PropTypes.number,
	// eslint-disable-next-line react/forbid-prop-types
	obligorId: PropTypes.any,
	stationId: PropTypes.number,
};

Bidding.defaultProps = {
	id: 'message-tender',
	title: '招投标',
	total: 0,
	obligorId: undefined,
	stationId: 0,
};
export default Bidding;
