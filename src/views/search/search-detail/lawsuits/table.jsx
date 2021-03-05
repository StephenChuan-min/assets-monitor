import React from 'react';
import { Form } from 'antd';
import { Table } from '@/common';
import { partyInfo } from '@/views/_common';
import associationLink from '@/views/_common/association-link';
import order from '@/assets/img/icon/icon_arrow.png';
import './style.scss';

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const {
			Sort, dataList, SortTime, type,
		} = this.props;
		const trailColumns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{ '立案日期' }
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'gmtRegister',
				key: 'gmtRegister',
				className: 'firstTitle',
				width: 122,
				render: (text, row) => (
					<span>{row.gmtRegister || '-'}</span>
				),
			}, {
				title: '当事人',
				dataIndex: 'parties',
				key: 'parties',
				width: 241,
				render: partyInfo,
			}, {
				title: '法院',
				dataIndex: 'court',
				render: text => text || '-',
			}, {
				title: '案号',
				dataIndex: 'caseNumber',
				render: text => text || '-',
			},
			{
				title: '案件类型',
				render: (value, row) => {
					const { isRestore, caseType } = row;
					if (isRestore) return '执恢案件';
					if (caseType === 1) return '普通案件';
					if (caseType === 2) return '破产案件';
					if (caseType === 3) return '执行案件';
					if (caseType === 4) return '终本案件';
					return '-';
				},
			}, {
				title: '关联链接',
				dataIndex: 'associatedInfo',
				className: 'tAlignCenter_important min-width-80',
				render: (value, row) => associationLink(value, row, 'Trial'),
			},
		];
		const courtColumns = [
			{
				title: (
					<div className="yc-trialRelation-title" onClick={() => SortTime('DESC')}>
						{'开庭日期'}
						{/* {Sort === undefined && <span className="sort th-sort-default" />} */}
						{Sort === undefined && <img src={order} alt="" className="sort th-sort-default" /> }
						{Sort === 'DESC' && <span className="sort th-sort-down" />}
						{Sort === 'ASC' && <span className="sort th-sort-up" />}
					</div>),
				dataIndex: 'gmtTrial',
				key: 'gmtTrial',
				width: 122,
				render: (text, row) => (
					<span>{row.gmtTrial || '-'}</span>
				),
			}, {
				title: '当事人',
				dataIndex: 'parties',
				key: 'parties',
				width: 241,
				render: partyInfo,
			}, {
				title: '法院',
				dataIndex: 'court',
				render: text => text || '-',
			}, {
				title: '案号',
				dataIndex: 'caseNumber',
				render: text => text || '-',
			}, {
				title: '案由',
				dataIndex: 'caseReason',
				render: text => text || '-',
			},
			{
				title: '关联链接',
				dataIndex: 'associatedInfo',
				className: 'tAlignCenter_important min-width-80',
				render: (value, row) => associationLink(value, row, 'Trial'),
			},
		];
		return (
			<React.Fragment>
				{
					type === 1 ? (
						<Table
							rowKey={record => record.id}
							dataSource={dataList.length > 0 && dataList}
							columns={trailColumns}
							style={{ width: '100%' }}
							defaultExpandAllRows
							pagination={false}
							onRowClick={() => {}}
						/>
					) : (
						<Table
							rowKey={record => record.id}
							dataSource={dataList.length > 0 && dataList}
							columns={courtColumns}
							style={{ width: '100%' }}
							defaultExpandAllRows
							pagination={false}
							onRowClick={() => {}}
						/>
					)
				}


			</React.Fragment>
		);
	}
}
export default Form.create()(BusinessView);
