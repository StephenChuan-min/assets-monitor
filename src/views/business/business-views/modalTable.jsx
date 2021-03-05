import React from 'react';
import { Tooltip } from 'antd';
import { Table } from '@/common';

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [{
				title: '业务编号',
				dataIndex: 'caseNumber',
				key: 'caseNumber',
				width: 150,
				render: text => (
					<p>{text || '-'}</p>
				),
			}, {
				title: '借款人',
				dataIndex: 'obligorName',
				key: 'obligorName',
				width: 200,
				render(text) {
					return (
						<div className="table-column">
							<div style={{ display: 'inline-block', float: 'left' }}>
								<div>
									<span style={{ display: 'inline-block' }}>
										{
											text && text.length > 12
												? (
													<Tooltip placement="topLeft" title={text}>
														<p>{`${text.substr(0, 12)}...`}</p>
													</Tooltip>
												)
												: <p>{text || '-'}</p>
										}
									</span>
								</div>
							</div>
						</div>
					);
				},
			}, {
				title: '负责人/机构',
				dataIndex: 'orgName',
				key: 'orgName',
				width: 120,
				render(text) {
					return (
						<div className="table-column">
							<div style={{ display: 'inline-block', float: 'left' }}>
								<div>
									<span style={{ display: 'inline-block' }}>
										{
											text && text.length > 6
												? (
													<Tooltip placement="topLeft" title={text}>
														<p>{`${text.substr(0, 6)}...`}</p>
													</Tooltip>
												)
												: <p>{text || '-'}</p>
										}
									</span>
								</div>
							</div>
						</div>
					);
				},
			}],
		};
	}

	render() {
		const { selectData } = this.props;
		const { columns } = this.state;
		return (
			<React.Fragment>
				<Table
					bordered={false}
					scroll={selectData.length > 10 && { y: 440 }}
					rowKey={record => JSON.stringify(record)}
					columns={columns}
					dataSource={selectData}
					style={{ width: '100%' }}
					defaultExpandAllRows
					pagination={false}
				/>
			</React.Fragment>
		);
	}
}
export default BusinessView;
