import React from 'react';
import { Form } from 'antd';
import { Ellipsis, Table } from '@/common';
import order from '@/assets/img/icon/icon_arrow.png';
import { w } from '@/utils';
import { floatFormat } from '@/utils/format';
import { Tooltip } from '../../../../../patchs/antd';

const MortgageDetail = (text, rowContent) => (
	<React.Fragment>
		<div className="assets-info-content">
			<li>
				<span className="list list-title align-justify " style={{ width: 80 }}>抵押物名称</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content text-ellipsis">
					{
						rowContent.pawnName && rowContent.pawnName.length > 10
							? (
								<Tooltip placement="topLeft" title={rowContent.pawnName}>
									<p>{`${rowContent.pawnName.substr(0, 10)}...`}</p>
								</Tooltip>
							)
							: <p>{rowContent.pawnName || '-'}</p>
					}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>登记编号</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">
					{rowContent.regNum || '-'}
				</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 80 }}>担保债权数额</span>
				<span className="list list-title-colon">:</span>
				<span className="list list-content">{rowContent.amount && w(floatFormat(rowContent.amount.toFixed(2)), { suffix: ' 元' })}</span>
			</li>
			<li>
				<span className="list list-title align-justify" style={{ width: 130 }}>债务人履行债务的期限</span>
				<span className="list list-title-colon">:</span>
			</li>
			<li>
				<span className="list list-content" style={{ maxWidth: 'none' }}>{rowContent.term || '-'}</span>
			</li>
		</div>
	</React.Fragment>
);

class MortgageView extends React.Component {
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
				className: 'firstTitle',
				width: 122,
				render: (text, row) => (
					<span>{row.regDate || '-'}</span>
				),
			}, {
				title: '抵押物所有人',
				dataIndex: 'owner',
				key: 'owner',
				width: 241,
				render: text => (
					<Ellipsis content={text} tooltip width={170} />
				),
			}, {
				title: '抵押权人',
				dataIndex: 'people',
				key: 'people',
				width: 241,
				render: text => (
					<Ellipsis content={text} tooltip width={170} />
				),
			}, {
				title: '抵押详情',
				dataIndex: 'projectName',
				key: 'projectName',
				render: MortgageDetail,
			},
			{
				title: '登记状态',
				dataIndex: 'status',
				key: 'status',
				render: text => <span>{text === 1 || text === '1' ? '有效' : '无效'}</span>,
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
export default Form.create()(MortgageView);
