import React from 'react';
import { Table, Button, Spin } from '@/common';
import './index.scss';

const deleteOrgTitle = row => (
	<span>
		确认删除机构(
		<span className="ant-confirm-title-point">{row.name}</span>
		)？
	</span>
);

const deleteAccountTitle = row => (
	<span>
		确认删除（
		<span className="ant-confirm-title-point">{row.name}</span>
		）的账号？
	</span>
);

const nextOrgcolumns = (props) => {
	const {
		isTop, handleOpenEditOrg, warningModal, switchOrg, orgTree,
	} = props;
	return [
		{
			title: '序号',
			width: 60,
			render: (value, row, index) => <span>{index + 1}</span>,
		},
		{
			title: '机构名称',
			dataIndex: 'name',
			width: 160,
			render: (value, row) => <span className="switch-org" onClick={() => switchOrg(orgTree, row.id)}>{value}</span>,
		},
		{
			title: '层级',
			dataIndex: 'level',
			width: 60,
			render: value => <span>{`${value}级`}</span>,
		},
		{
			title: `${isTop ? '已监控债务人数/可监控数' : '累计监控债务人数'}`,
			dataIndex: 'obligorLimitUseCount',
			width: 170,
			render: (value, row) => <span>{`${isTop ? `${value}/${row.obligorLimitCount}` : value}`}</span>,
		},
		{
			title: `${isTop ? '已用查询次数/授权次数' : '累计查询次数'}`,
			dataIndex: 'portraitLimitUseCount',
			width: 170,
			render: (value, row) => <span>{`${isTop ? `${value}/${row.portraitLimitCount}` : value}`}</span>,
		},
		{
			title: '操作',
			width: 120,
			render: (value, row) => (
				<div>
					<span className="yc-table-text-link" onClick={() => handleOpenEditOrg({ ...row })}>编辑</span>
					<span className="divider" />
					<span
						className="yc-table-text-link"
						onClick={() => {
							if (row.childrenLength > 0) {
								return warningModal([row, '无法删除该机构', '该机构存在下级机构，请在删除完下级机构后重试', '我知道了', '', true, 'deleteOrg']);
							}
							return warningModal([row, deleteOrgTitle(row), '一经删除，无法恢复', '确定', '取消', false, 'deleteOrg']);
						}}
					>
						删除
					</span>
				</div>
			),
		},
	];
};

const currentOrgcolumns = (props) => {
	const { handleOpenEditAccount, warningModal } = props;
	const resetTitle = (
		<span> 确认重置密码？</span>
	);
	return [
		{
			title: '序号',
			width: 100,
			render: (value, row, index) => <span>{index + 1}</span>,
		},
		{
			title: '姓名',
			dataIndex: 'name',
			width: 120,
			render: value => <span>{value || '-'}</span>,
		},
		{
			title: '账号',
			dataIndex: 'mobile',
			width: 170,
			render: value => <span>{value || '-'}</span>,
		},
		{
			title: '上次登录时间',
			dataIndex: 'lastLoginDateTime',
			width: 160,
			render: value => <span>{value || '-'}</span>,
		},
		{
			title: '操作',
			width: 140,
			render: (value, row) => (
				<div>
					<span className="yc-table-text-link" onClick={() => handleOpenEditAccount({ ...row })}>编辑</span>
					<span className="divider" />
					<span className="yc-table-text-link" onClick={() => warningModal([row, resetTitle, '点击确定，密码将重置为当前日期', '确定', '取消', false, 'resetPassword'])}>重置密码</span>
					<span className="divider" />
					<span
						className="yc-table-text-link"
						onClick={() => warningModal([row, deleteAccountTitle(row), '一经删除，无法恢复', '确定', '取消', false, 'deleteAccount'])}
					>
						删除
					</span>
				</div>
			),
		},
	];
};

class OrgTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 手动添加下级机构
	handleAddNextOrg = () => {
		const { handleAddOrg } = this.props;
		handleAddOrg();
	};

	// 给当前机构分配新的账号
	handleAddCurrentAccount = () => {
		const { handleOpenAddAccount } = this.props;
		handleOpenAddAccount();
	};

	render() {
		const {
			switchOrg, nextOrgDataSource, accountDataSource, currentOrgDetail, orgTree, handleAddOrg, userLodaing,
		} = this.props;
		// 重新给一个数组的原因是因为这个antd版本较低，数据中数组对象存在children字段且不为空，就会导致背景仍为白色，不会让table数据间隔变色
		const newNextOrgDataSource = nextOrgDataSource.map(item => ({ ...item, children: [], childrenLength: item.children.length }));
		return (
			<div className="account-table">
				<div className="account-table-top" />
				<div className="account-table-content">
					<div className="account-table-content-title">
						<div className="account-table-content-title-main">{currentOrgDetail.name}</div>
						<div className="account-table-content-title-sub">
							上级机构：
							{
								currentOrgDetail.parentName && currentOrgDetail.parentName !== '--' ? <span className="account-table-content-title-sub-org" onClick={() => switchOrg(orgTree, currentOrgDetail.parentId)}>{currentOrgDetail.parentName}</span> : '--'
							}
						</div>
					</div>
					<div className="account-table-content-line" />
				</div>
				{/* 下级机构列表 */}
				{
					currentOrgDetail.level < 3 && (
					<div className="account-table-data" style={{ marginBottom: 20 }}>
						<div className="account-table-data-oper">
							<div className="account-table-data-oper-prefix" />
							<div className="account-table-data-oper-title">下级机构列表</div>
							<Button className="account-table-data-oper-add" onClick={() => handleAddOrg(currentOrgDetail, 'id')}>添加下级机构</Button>
						</div>
						<Table
							className="org-table"
							pagination={false}
							style={{ height: 264 }}
							scroll={{ y: 220 }}
							dataSource={newNextOrgDataSource}
							columns={nextOrgcolumns(this.props)}
						/>
					</div>
					)
				}
				{/* 当前机构账号 */}
				<div className="account-table-data">
					<div className="account-table-data-oper">
						<div className="account-table-data-oper-prefix" />
						<div className="account-table-data-oper-title">当前机构账号</div>
						<Button className="account-table-data-oper-add" onClick={this.handleAddCurrentAccount}>添加账号</Button>
					</div>
					<Spin visible={userLodaing}>
						<Table
							className="account-open-table"
							scroll={{ y: 220 }}
							pagination={false}
							columns={currentOrgcolumns(this.props)}
							dataSource={accountDataSource}
						/>
					</Spin>
				</div>
			</div>
		);
	}
}
export default OrgTable;
