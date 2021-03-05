import React from 'react';
import { Modal } from 'antd';
import Cookies from 'universal-cookie';
import { linkDom } from '@/utils';
import { urlEncode, clearEmpty } from '@/utils';
import { Ellipsis } from '@/common';

const cookies = new Cookies();

// const { _ } = window;
// 关联连接 组件
export const aboutLink = (value, row) => {
	const toShow = (source, type) => {
		let text = '立案';
		if (type === 1) text = '立案';
		if (type === 2) text = '开庭';
		if (type === 3) text = '文书';
		Modal.info({
			title: `本案号关联多个${text}链接，如下：`,
			okText: '关闭',
			iconType: 'null',
			className: 'assets-an-info',
			width: 600,
			content: (
				<div style={{ marginLeft: -28 }}>
					{/* { source.map(item => (<p style={{ margin: 5 }}>{linkDom(item, item)}</p>)) } */}
					{ source.map(item => (<p style={{ margin: 5 }}><Ellipsis url={item} content={item} isSourceLink /></p>)) }
				</div>
			),
			onOk() {},
		});
	};
	if (row.isDeleted) return null;

	const La = (value.filter(item => item.sourceType === 1))[0];
	const Kt = (value.filter(item => item.sourceType === 2))[0];
	const Ws = (value.filter(item => item.sourceType === 3))[0];
	// console.log(La, Kt, Ws);
	const resContent = [];

	if (La && La.url.length) {
		if (La.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(La.url, 1)}>立案</span>);
		} else if (La.url.length === 1) {
			// resContent.push(linkDom(La.url[0], '立案'));
			resContent.push(<Ellipsis url={La.url[0]} content="立案" isSourceLink />);
		}
	}
	if (Kt && Kt.url.length) {
		if (resContent.length)resContent.push(<span className="info-line">|</span>);
		if (Kt.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(Kt.url, 2)}>开庭</span>);
		} else if (Kt.url.length === 1) {
			// resContent.push(linkDom(Kt.url[0], '开庭'));
			resContent.push(<Ellipsis url={Kt.url[0]} content="开庭" isSourceLink />);
		}
	}
	if (Ws && Ws.url.length) {
		if (resContent.length)resContent.push(<span className="info-line">|</span>);
		if (Ws.url.length > 1) {
			resContent.push(<span className="click-link" onClick={() => toShow(Ws.url, 3)}>文书</span>);
		} else if (Ws.url.length === 1) {
			resContent.push(linkDom(Ws.url[0], '文书'));
		}
	}
	return resContent;
};

// 案号 - 弹窗
export const caseInfo = (content, row) => {
	const { isDelete, ygList } = row;
	const ygListLength = window._.isArray(ygList) ? ygList.length : 0;
	if (isDelete || !ygListLength) return content || '-';
	const toClick =	() => Modal.info({
		title: '当事人详情',
		okText: '确定',
		iconType: 'null',
		className: 'assets-an-info',
		content: (
			<div style={{ marginLeft: -28, maxHeight: 400, overflow: 'auto' }}>
				{
					row.ygList && row.ygList.map(item => (
						<p style={{ margin: 5, fontSize: 14 }}>
							<strong>{`${item.ssdw}：`}</strong>
							<span>{item.mc}</span>
						</p>
					))
				}
			</div>
		),
		onOk() {},
	});
	return <span className="click-link" onClick={toClick}>{content}</span>;
};

// 导出按钮& 【一键导出】
export const fileExport = (api, condition, other = {}, type) => {
	const _condition = Object.assign({}, condition, other, {
		token: cookies.get('token'),
	});
	if (type === 'warning') {
		Modal.confirm({
			title: '确认导出选中的所有信息吗？',
			content: '点击确定，将为您导出所有选中的信息',
			iconType: 'exclamation-circle',
			onOk() {
				window.open(`${api}?${urlEncode(clearEmpty(_condition))}`, '_self');
			},
			onCancel() {},
		});
	} else {
		window.open(`${api}?${urlEncode(clearEmpty(_condition))}`, '_self');
	}
};
