import React from 'react';
import { inquiryList, inquiryPriorityList } from '@/utils/api/portrait-inquiry';
import { Spin, Table } from '@/common';
import { timeStandard, clearEmpty } from '@/utils';
import { requestAll } from '@/utils/promise';
import QueryView from './common/queryView';
import { inquiryCheck } from './inquiry-check';

export default class InquiryList extends React.Component {
	constructor(props) {
		document.title = '列表-画像查询';
		super(props);
		this.state = {
			dataSource: '',
			// current: 1,
			// total: 0,
			loading: false,
		};
		this.condition = {};
	}

	componentWillMount() {
		// this.toGetData();
	}

	// 当前页数变化
	onPageChange=(val) => {
		this.toGetData(val);
	};

	getRegStatusClass=(val) => {
		if (val.match(/(存续|在业)/)) return ' regStatus-green';
		if (val.match(/(迁出|其他)/)) return ' regStatus-orange';
		if (val.match(/(撤销|吊销|清算|停业|注销)/)) return ' regStatus-red';
		return '';
	};

	toDetailInfo=(row) => {
		global.PORTRAIT_INQUIRY_AFFIRM = false;
		inquiryCheck(`/inquiry/enterprise?id=${row.companyId}&name=${row.name.replace(/<(\/|)em>/g, '')}`, 2);
	};

	toGetColumns=() => [
		{
			title: '主要信息',
			dataIndex: 'name',
			render: (value, row) => (
				<div className="assets-info-content">
					<li className="yc-public-large-bold yc-em-tag" style={{ margin: '10px 0' }}>
						<span
							className="cursor-pointer"
							style={{ lineHeight: '21px' }}
							dangerouslySetInnerHTML={{ __html: value }}
							onClick={() => this.toDetailInfo(row)}
						/>
						<span className={`inquiry-list-regStatus${this.getRegStatusClass(row.regStatus)}`}>{row.regStatus}</span>
					</li>
					<li>
						<span className="list list-title">法定代表人</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 40 }}>
							{row.legalPersonName || '-'}
						</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title">注册资本</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content" style={{ minWidth: 130 }}>
							{row.regCapital || '-'}
						</span>
						<span className="list-split" style={{ height: 16 }} />
						<span className="list list-title ">成立日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{timeStandard(row.establishTime)}
						</span>
					</li>
				</div>
			),
		},
	];

	onRowClick=() => {
		// console.log(record, index);
	};

	/* 默认查询 */
	handleQuery=(obj) => {
		this.condition = obj;
		this.toGetData(1);
	};

	// 查询数据methods
	toGetData=(page) => {
		this.setState({ loading: true });
		const param = clearEmpty({
			page: page || 1,
			num: 20,
			name: this.condition.name,
		});
		requestAll([
			{	api: inquiryPriorityList(param) },
			{	api: inquiryList(param) }])
			.then((res) => {
				const source = [];
				res.forEach((i) => {
					if (i.code === 200) source.push(...i.data.list);
				});
				this.setState({
					dataSource: source,
					loading: false,
				});
			});
	};

	render() {
		const { dataSource } = this.state;
		const { loading } = this.state;

		return (
			<div className="yc-inquiry-list">
				<div className="queryView-box">
					<QueryView onQuery={this.handleQuery} />
				</div>
				<div className="inquiry-list-content">
					<div className="list-content-total">
						<span>源诚为您找到以下</span>
						{/* <span style={{ fontWeight: 'bold', margin: '0 5px' }}>{total || 0}</span> */}
						<span>符合条件的企业</span>
					</div>
					<div className="content-list" style={{ paddingTop: 2 }}>
						{/* <Button */}
						{/* onClick={() => navigate('/inquiry/enterprise')} */}
						{/* > */}
						{/* {'=> 企业查询详情'} */}
						{/* </Button> */}
						<Spin visible={loading}>
							<Table
								className="yc-none-background"
								rowClassName={() => 'yc-assets-auction-table-row'}
								columns={this.toGetColumns()}
								onRowClick={this.onRowClick}
								dataSource={dataSource}
								showHeader={false}
								pagination={false}
								visible={loading}
							/>
							{/* {dataSource && dataSource.length > 0 && ( */}
							{/* <div className="yc-table-pagination"> */}
							{/* <Pagination */}
							{/* showQuickJumper */}
							{/* current={current || 1} */}
							{/* total={total || 0} */}
							{/* onChange={this.onPageChange} */}
							{/* showTotal={totalCount => `共 ${totalCount} 条信息`} */}
							{/* /> */}
							{/* </div> */}
							{/* )} */}
						</Spin>
					</div>
				</div>
			</div>
		);
	}
}
