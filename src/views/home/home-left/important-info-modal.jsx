import React from 'react';
import { Modal, Button, Table } from 'antd';
import PropTypes from 'reactPropTypes';
import './style.scss';

class ImportantInfoModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: '动态分类',
					dataIndex: 'typeName',
					className: 'typeName',
					width: 88,
					render(value, row, index) {
						const obj = {
							children: value,
							props: {},
						};
						// 第1列的第6行合并
						if (index === 0) {
							obj.props.rowSpan = 10;
						} else if (index > 0 && index <= 9) {
							// 第1列的第0-6行被合并没了，设置 rowSpan = 0 直接不用渲染
							obj.props.rowSpan = 0;
						} else if (index === 10) {
							obj.props.rowSpan = 6;
						} else if (index > 10 && index <= 15) {
							// 第1列的第0-6行被合并没了，设置 rowSpan = 0 直接不用渲染
							obj.props.rowSpan = 0;
						}
						return obj;
					},
				},
				{
					title: '信息类别',
					dataIndex: 'infoType',
					width: 100,
				},
				{
					title: '重要信息标准',
					dataIndex: 'importantInfo',
				}],
			data: [
				{
					typeName: '资产线索',
					infoType: '资产拍卖',
					importantInfo: '发现债务人为拍卖资产的所有人、债权人、竞买人或其他关联人',
				},
				{
					typeName: '资产线索',
					infoType: '土地信息',
					importantInfo: '发现债务人为土地的使用权人、抵押人或抵押权人',
				},
				{
					typeName: '资产线索',
					infoType: '无形资产',
					importantInfo: '发现债务人为排污权证、矿业权证所有人',
				},
				{
					typeName: '资产线索',
					infoType: '代位权',
					importantInfo: '发现债务人为执恢、财产保全案件的申请人',
				},
				{
					typeName: '资产线索',
					infoType: '股权质押',
					importantInfo: '发现债务人为股权质押的出质人或质权人',
				},
				{
					typeName: '资产线索',
					infoType: '动产抵押',
					importantInfo: '发现债务人为动产抵押的抵押物所有人或抵押权人',
				},
				{
					typeName: '资产线索',
					infoType: '查解封资产',
					importantInfo: '发现债务人为被查封的对象',
				},
				{
					typeName: '资产线索',
					infoType: '在建工程',
					importantInfo: '发现债务人为在建工程的建设单位、中标单位或施工单位',
				},
				{
					typeName: '资产线索',
					infoType: '不动产登记',
					importantInfo: '发现债务人为不动产登记的关联人',
				},
				{
					typeName: '资产线索',
					infoType: '车辆信息',
					importantInfo: '发现债务人是车辆所有人',
				},
				{
					typeName: '风险信息',
					infoType: '破产重组',
					importantInfo: '发现与债务人有关的破产/重组信息',
				},
				{
					typeName: '风险信息',
					infoType: '失信记录',
					importantInfo: '发现债务人被列入或移出失信被执行名单',
				},
				{
					typeName: '风险信息',
					infoType: '限制高消费',
					importantInfo: '发现债务人为被限制高消费的个人或关联公司',
				},
				{
					typeName: '风险信息',
					infoType: '涉诉风险',
					importantInfo: '发现债务人有作为被告的开庭、立案、文书信息',
				},
				{
					typeName: '风险信息',
					infoType: '经营风险',
					importantInfo: '发现债务人有新的经营异常、严重违法、税收违法或行政处罚',
				},
			],
		};
	}

	handleCancel=() => {
		const { onCancel } = this.props;
		onCancel();
	};

	render() {
		const { visible } = this.props;
		const { columns, data } = this.state;
		return (
			<Modal
				title="重要信息规则说明"
				width={652}
				visible={visible}
				onCancel={this.handleCancel}
				footer={[
					<Button key="back" type="ghost" size="large" onClick={this.handleCancel}>关闭</Button>,
				]}
			>
				<div>重要信息：近30天更新的满足以下规则的信息</div>
				<Table
					columns={columns}
					dataSource={data}
					pagination={false}
					bordered
				/>
			</Modal>
		);
	}
}

ImportantInfoModal.propTypes = {
	visible: PropTypes.bool,
};

ImportantInfoModal.defaultProps = {
	visible: false,
};

export default ImportantInfoModal;
