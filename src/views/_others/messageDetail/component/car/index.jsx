import React, { Component } from 'react';
import PropTypes from 'reactPropTypes';
import message from '@/utils/api/message/message';
import { markRead } from '@/utils/api/message';
import TableMortgage from '@/views/asset-excavate/car/table';
import { Spin } from '@/common';

class Car extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			total: props.total,
			page: 1,
			num: 5,
			loading: false,
			obligorId: props.obligorId,
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

	// 请求监控日报详情页数据
	toGetData = () => {
		const { stationId } = this.props;
		const { page, num, obligorId } = this.state;
		const reg = new RegExp(11601);
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

	render() {
		const {
			id, title,
		} = this.props;
		const {
			dataSource, loading, current, total,
		} = this.state;
		const tableProps = {
			current,
			noSort: true,
			dataSource,
			onPageChange: this.onPageChange,
			onRefresh: this.onRefresh,
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
						<TableMortgage {...tableProps} />
					</Spin>
				</div>
			</React.Fragment>
		);
	}
}

Car.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	total: PropTypes.number,
	obligorId: PropTypes.number,
	stationId: PropTypes.number,
};

Car.defaultProps = {
	id: 'message-intangible',
	title: '车辆信息',
	total: 0,
	obligorId: null,
	stationId: 0,
};

export default Car;
