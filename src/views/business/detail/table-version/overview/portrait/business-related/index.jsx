import React from 'react';
import { navigate } from '@reach/router';
import { Table, Button, Icon } from '@/common';
import { getQueryByName, linkDetail } from '@/utils';
import noData from '@/assets/img/business/noData.png';
import isBreak from '@/assets/img/business/status_shixin.png';
import beforeBreak from '@/assets/img/business/status_cengshixin.png';
import './style.scss';

const constantNumber = 99999999; // 默认值
export default class BusinessRelated extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgLoading: false,
			columns: [{
				title: '相关人名称',
				dataIndex: 'obligorName',
				key: 'obligorName',
				render: (text, row) => (
					<p>
						{row.obligorId ? linkDetail(row.obligorId, text) : text}
						<span className="yc-item-break">
							 {
								row && row.dishonestStatus === 1 ? <img style={{ width: '28px' }} src={isBreak} alt="" /> : null
							 }
							 {
								row && row.dishonestStatus === 2 ? <img style={{ width: '28px' }} src={beforeBreak} alt="" /> : null
							 }
						</span>
						{row.limitConsumption ? <span className="business-related-tag limit-height">已限高</span> : null}
						{row.bankruptcy ? <span className="business-related-tag bankruptcy-reorganization">破产/重整风险</span> : null}
					</p>
				),
			}, {
				title: '证件号/统一社会信用代码',
				dataIndex: 'obligorNumber',
				key: 'obligorNumber',
				width: 300,
				render(text) {
					return <div>{text || '-'}</div>;
				},
			}, {
				title: '角色',
				dataIndex: 'roleText',
				key: 'roleText',
				width: 250,
			}, {
				title: '推送状态',
				key: 'obligorPushType',
				dataIndex: 'obligorPushType',
				width: 200,
				render(text) {
					return (
						<React.Fragment>
							{
								text === 1 ? (
									<span>
										<Icon type="icon-dot" style={{ fontSize: 12, color: '#3DBD7D', marginRight: 3 }} />
										开启
									</span>
								) : (
									<span>
										<Icon type="icon-dot" style={{ fontSize: 12, color: '#bcc1cc', marginRight: 3 }} />
										关闭
									</span>
								)
							}
						</React.Fragment>
					);
				},
			}],
		};
	}

	handleSubmit = () => {
		const businessId = getQueryByName(window.location.href, 'id') || constantNumber;
		navigate(`/business/detail/edit/info?id=${businessId}`);
	};

	render() {
		const { columns, imgLoading } = this.state;
		const { dataSource, loading } = this.props;

		return (
			<div>
				<div className="overview-container-title">
					<div className="overview-left-item" />
					<span className="container-title-name">业务相关人列表</span>
				</div>
				{!loading ? (
					<div className="overview-container-content" style={{ padding: '0 20px' }}>
						{dataSource && dataSource.length > 0 ? (
							<Table
								scroll={dataSource.length > 10 ? { y: 440 } : {}}
								columns={columns}
								dataSource={dataSource}
								pagination={false}
								className="table"
							/>
					 ) : (
						<div>
							<table className="table table-striped treeTable">
								<tbody>
									<tr className="tr-table" style={{ textAlign: 'left' }}>
										<th style={{ width: 470, border: '0' }}>相关人名称</th>
										<th style={{ width: 300, border: '0' }}>证件号/统一社会信用代码</th>
										<th style={{ width: 250, border: '0' }}>角色</th>
										<th style={{ width: 200, border: '0' }}>推送状态</th>
									</tr>
								</tbody>
							</table>
							<div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
								<img style={imgLoading ? { marginTop: '50px' } : {}} src={noData} alt="" />
								<div style={{ color: '#4E5566' }}>暂未导入相关人，建议去编辑添加相关人，以形成完整业务画像</div>
								{
									!global.isProxyLimit && (
										<Button
											size="large"
											type="common"
											className="business-table-edit-btn"
											onClick={this.handleSubmit}
										>
											添加相关人
										</Button>
									)}
							</div>
						</div>
					 )}
					</div>
				) : null}
			</div>
		);
	}
}
