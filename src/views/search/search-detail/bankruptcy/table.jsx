import React from 'react';
import { Form, Tooltip } from 'antd';
import { Table,Ellipsis } from '@/common';
import { formatDateTime } from '@/utils/changeTime';
import order from '@/assets/img/icon/icon_arrow.png';
import RegisterModal from '@/views/risk-monitor/bankruptcy/registerModal';
import { linkDom } from '@/utils';

// 获取表格配置
const columns = (props, openRegisterModalFunc) => {
	const { Sort, SortTime } = props;
	// 含操作等...
	return [
		{
			title: (
				<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
					发布日期
					{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
					{Sort === 'DESC' && <span className="sort th-sort-down" />}
					{Sort === 'ASC' && <span className="sort th-sort-up" />}
				</div>),
			dataIndex: 'publishDate',
			key: 'publishDate',
			width: 120,
			className: 'firstTitle',
			render(text, row) {
				return (
					<div className="table-column">
						{formatDateTime(row.publishDate, 'onlyYear') || '-'}
					</div>
				);
			},
		},
		{
			title: '破产重组企业',
			dataIndex: 'brcompanyname',
			key: 'brcompanyname',
			width: 250,
			render(text) {
				return (
					<div>
						{
							text && text.length > 18
								? (
									<Tooltip placement="topLeft" title={text}>
										<p>{`${text.substr(0, 18)}...`}</p>
									</Tooltip>
								)
								: <p>{text || '-'}</p>
						}
					</div>
				);
			},
		}, {
			title: '受理法院',
			dataIndex: 'court',
			key: 'court',
			width: 250,
			render(text, row) {
				return (
					<div className="table-column">
						{row.court || '-'}
					</div>
				);
			},
		}, {
			title: '标题',
			dataIndex: 'title',
			key: 'title',
			// width: 360,
			render(text, row) {
				if (row.url) {
					return (
						// <span>{text ? linkDom(row.url, text) : '-'}</span>
						<div>{text ? <Ellipsis content={text} url={row.url} isSourceLink tooltip /> : '-'}</div>
					);
				}
				return (
					<span className="click-link" onClick={() => openRegisterModalFunc(row)}>{text || '-'}</span>
				);
			},
		},
	];
};

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerModalVisible: false,
			rowObj: {},
		};
	}

	// 打开立案弹框
	openRegisterModal = (rowObj) => {
		// console.log(rowObj);
		this.setState({
			registerModalVisible: true,
			rowObj,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			registerModalVisible: false,
		});
	};

	render() {
		const { dataList } = this.props;
		const { registerModalVisible, rowObj } = this.state;
		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					dataSource={dataList.length > 0 && dataList}
					columns={columns(this.props, this.openRegisterModal)}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {
						// if (!record.children) {
						// 	const w = window.open('about:blank');
						// 	w.location.href = '#/monitor';
						// }
					}}
				/>
				{registerModalVisible && (
					<RegisterModal
						onCancel={this.onCancel}
						onOk={this.onOk}
						rowObj={rowObj}
						registerModalVisible={registerModalVisible}
						type="information"
					/>
				)}
			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
