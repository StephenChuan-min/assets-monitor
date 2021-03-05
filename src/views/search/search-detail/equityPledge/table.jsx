import React from 'react';
import { Form } from 'antd';
import { Ellipsis, Table } from '@/common';
import order from '@/assets/img/icon/icon_arrow.png';

class EquityPledgeView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			Sort, dataList, SortTime,
		} = this.props;
		const columns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{ '登记日期' }
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'regDate',
				key: 'regDate',
				width: 122,
				className: 'firstTitle',
				render: (text, row) => (
					<span>{row.regDate || '-'}</span>
				),
			}, {
				title: '出质人',
				dataIndex: 'pledgorList',
				key: 'pledgorList',
				width: 241,
				render: (text, row) => row.pledgorList && row.pledgorList.length > 0 && row.pledgorList.map(item => (
					<Ellipsis content={item.pledgor || '-'} tooltip width={230} />
				)),
			}, {
				title: '质权人',
				dataIndex: 'pledgeeList',
				key: 'pledgeeList',
				width: 241,
				render: (text, row) => row.pledgeeList && row.pledgeeList.length > 0 && row.pledgeeList.map(item => (
					<Ellipsis content={item.pledgee || '-'} tooltip width={230} />
				)),
			}, {
				title: '出质详情',
				dataIndex: 'projectName',
				key: 'projectName',
				render: (text, rowContent) => (
					<React.Fragment>
						<div className="assets-info-content">
							<li>
								<span className="list list-title align-justify " style={{ width: 72 }}>股权标的企业</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">
									<Ellipsis content={rowContent.companyName} tooltip width={250} />
								</span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 72 }}>登记编号</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{rowContent.regNumber || '-'}</span>
							</li>
							<li>
								<span className="list list-title align-justify" style={{ width: 72 }}>出质股权数额</span>
								<span className="list list-title-colon">:</span>
								<span className="list list-content">{rowContent.equityAmount || '-'}</span>
							</li>
						</div>
					</React.Fragment>
				),
			},
			{
				title: '登记状态',
				dataIndex: 'state',
				key: 'state',
				render: text => <span>{text === 1 || text === '1' ? '无效' : '有效'}</span>,
			},
		];

		return (
			<React.Fragment>
				<Table
					rowKey={record => record.id}
					dataSource={dataList.length > 0 && dataList}
					columns={columns}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
					onRowClick={() => {}}
				/>
			</React.Fragment>
		);
	}
}
export default Form.create()(EquityPledgeView);
