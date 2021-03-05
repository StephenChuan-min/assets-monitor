import React from 'react';
import { Modal } from 'antd';
import { linkDom, timeStandard } from '@/utils';
import { Button, Table, Ellipsis } from '@/common';
import { ReadStatus } from '@/common/table';
import { partyInfo } from '@/views/_common';
import './association.scss';
import link from '@/assets/img/business/link.png';

/* 默认表格输出单元 */
const defaultColumns = {
	Trial: [
		{
			title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
			dataIndex: 'gmtRegister',
			width: 103,
			render: text => ReadStatus(timeStandard(text), {}),
		},
		{
			title: '当事人',
			dataIndex: 'parties',
			width: 300,
			render: partyInfo,
		},
		{
			title: '法院',
			dataIndex: 'court',
			render: text => text || '-',
		},
		{
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
		},
	],
	Court: [
		{
			title: <span style={{ paddingLeft: 11 }}>开庭日期</span>,
			dataIndex: 'gmtTrial',
			width: 103,
			render: text => ReadStatus(timeStandard(text)),
		},
		{
			title: '当事人',
			dataIndex: 'parties',
			width: 300,
			render: partyInfo,
		},
		{
			title: '法院',
			dataIndex: 'court',
			render: text => text || '-',
		},
		{
			title: '案号',
			dataIndex: 'caseNumber',
			render: text => text || '-',
		},
		{
			title: '案由',
			dataIndex: 'caseReason',
			render: text => text || '-',
		},
		{
			title: '链接',
			dataIndex: 'url',
			width: 50,
			// render: text => (text ? <a target="_blank" rel="noopener noreferrer" href={text}><img className="linkPic" src={link} alt="链接" /></a> : '-'),
			render: text => (text ? <Ellipsis content="链接" url={text} isSourceLink ktModalSourceLinkIcon={link} /> : '-'),
		},
	],
	Judgment: [
		{
			title: <span style={{ paddingLeft: 11 }}>立案日期</span>,
			dataIndex: 'gmtRegister',
			width: 103,
			render: (text, record) => ReadStatus(timeStandard(text) || '-', record),
		},
		{
			title: '当事人',
			dataIndex: 'parties',
			width: 300,
			render: partyInfo,
		},
		{
			title: '法院',
			dataIndex: 'court',
			render: text => text || '-',
		},
		{
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
		},
	],
};
/**
 * @author: async
 * @date: 2019-10-12
 * @Description: 关联连接
 */
class AssociationLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			type: '',
			dataSource: [],
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { visible } = this.state;
		const { source } = this.props;
		return nextState.visible !== visible || JSON.stringify(nextProps.source) !== JSON.stringify(source);
	}

	toShow=(list, type) => {
		this.setState({
			visible: true,
			dataSource: list,
			type,
		});
	};

	/* 关闭modal */
	toClose=() => {
		this.setState({
			visible: false,
		});
	};

	// 多个链接弹框(2.3版本已废弃)
	toJudgmentShow = (source) => {
		Modal.info({
			title: '本案号关联多个文书链接，如下：',
			okText: '关闭',
			iconType: 'null',
			className: 'assets-an-info',
			width: 600,
			content: (
				<div style={{ marginLeft: -28 }}>
					{/* { source.map(item => (<p style={{ margin: 5 }}>{linkDom(item.url, item.url)}</p>)) } */}
					{ source.map(item => (<p style={{ margin: 5 }}><Ellipsis url={item.url} content={item.url} isSourceLink /></p>)) }
				</div>
			),
			onOk() {},
		});
	};

	/*
	* La: ；立案，Kt: 开庭， Ws: 文书
	* 立案：0 || 1， 立案信息：有链接直接跳，没链接- ，开庭公告：有链接直接跳，没链接弹窗。
	* 开庭：0 || 1 || n , 1条有链接，直接跳转； 1条且无链接：立案信息弹窗， 开庭公告-；有多条的情况：打开弹窗
	* 文书：0 || 1， 立案信息：有链接直接跳，没链接-
	*/
	handleSource = (source, type) => {
		const { associatedInfo: { trialAssociatedInfo: La, courtAssociatedInfo: Kt, judgmentAssociatedInfo: Ws } } = source;
		const resContent = [];
		// 立案
		if (La.length > 0) {
			if (La[0].url) {
				// resContent.push(linkDom(La[0].url, '立案'));
				resContent.push(<Ellipsis content="立案" url={La[0].url} isSourceLink width={50} />);
			} else {
				if (type === 'Trial') {
					// resContent.push(linkDom(La[0].url, '立案'));
					resContent.push(<Ellipsis content="立案" url={La[0].url} isSourceLink width={50} />);
				}
				if (type === 'Court') {
					resContent.push(<span className="click-link" onClick={() => this.toShow(La, 'Trial')}>立案</span>);
				}
			}
		}
		// 开庭
		if (Kt.length > 0) {
			if (Kt.length === 1) {
				if (Kt[0].url) {
					if (resContent.length) resContent.push(<span className="info-line">|</span>);
					// resContent.push(linkDom(Kt[0].url, '开庭'));
					resContent.push(<Ellipsis content="开庭" url={Kt[0].url} isSourceLink width={50} />);
				} else if (type === 'Trial') {
					if (resContent.length) resContent.push(<span className="info-line">|</span>);
					resContent.push(<span className="click-link" onClick={() => this.toShow(Kt, 'Trial')}>开庭</span>);
				}
			} else if (Kt.length > 1) {
				if (resContent.length) resContent.push(<span className="info-line">|</span>);
				resContent.push(<span className="click-link" onClick={() => this.toShow(Kt, 'Court')}>开庭</span>);
			}
		}
		// 文书
		if (Ws.length > 0) {
			if (Ws[0].url) {
				if (resContent.length) resContent.push(<span className="info-line">|</span>);
				resContent.push(linkDom(`#/judgement?sourceId=${Ws[0].sourceId}&pid=${Ws[0].pid}`, '文书'));
			}
		}
		return resContent;
	};

	render() {
		const { source } = this.props;
		const { visible, type, dataSource } = this.state;

		const text = ((value) => {
			if (value === 'Trial') return { c: '立案', t: '立案日期' };
			if (value === 'Court') return { c: '开庭', t: '开庭日期' };
			if (value === 'Judgment') return { c: '文书', t: '判决日期' };
			return '';
		})(type || 'Trial') || { c: '立案', t: '立案日期' };
		const list = this.handleSource(source, type) || [];
		const _dataSource = dataSource.length > 3 ? dataSource.slice(0, 3) : dataSource;
		return (
			<React.Fragment>
				{ list.length ? list.map(i => i) : '-'}
				<Modal
					title={`关联${text.c}信息`}
					onCancel={this.toClose}
					wrapClassName="yc-modal-association-link"
					maskCloabe={false}
					visible={visible}
					width={1040}
					footer={[
						<Button onClick={this.toClose} title="关闭" style={{ width: 100 }} />,
					]}
				>
					{
						dataSource && dataSource.length > 3 && (
						<div className="tips">
							为您展示最新
							<span>3</span>
							条：
						</div>
						 )
					}
					{[
						dataSource.length
							? <Table columns={defaultColumns[type || 'Trial']} dataSource={_dataSource} pagination={false} /> : null,
						// _dataSource.tableData.length && _dataSource.listData.length ? <div className="source-list-hr" /> : null,
						// _dataSource.listData.length
						// 	? [
						// 		<div className="yc-public-title-normal source-list-title">{`本条信息关联的其他多个${text.c}链接：`}</div>,
						// 		<div className="source-list-data">
						// 			<span className="list-title">{text.t}</span>
						// 			<span className="list-content">相关链接地址</span>
						// 		</div>,
						// 		_dataSource.listData.map(item => (
						// 			<div className="source-list-data">
						// 				<span className="list-title">{timeStandard(item.gmtTrial || item.gmtRegister)}</span>
						// 				<span className="list-content">{linkDom(item.url, item.url)}</span>
						// 			</div>
						// 		)),
						// 	]
						// 	: null,
					]}
				</Modal>
			</React.Fragment>
		);
	}
}
const methods = (value, row, type) => <AssociationLink source={row} type={type} />;

export default methods;
