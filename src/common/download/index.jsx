import React from 'react';
import { Icon, Modal, message } from 'antd';
import Cookies from 'universal-cookie';
import PropTypes from 'reactPropTypes';
import { exportFile, normalGet } from '@/utils/api/home';
import { Icon as IconType } from '@/common';
import { clearEmpty, urlEncode, DownloadFile } from '@/utils';
import baseUrl from '@/utils/api/config';
import Button from '../button';
import ModalTable from '../../views/business/business-views/modalTable';

const cookies = new Cookies();
export default class Download extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingStatus: 'normal',
		};
	}

	handleDownload = () => {
		const {
			api, condition, all, field, current, page, num, selectIds, selectData, selectedRowKeys, normal, type, waringText,
		} = this.props;

		// 处理变量参数
		const _condition = typeof condition === 'function' ? condition() : condition;
		const c = Object.assign({}, _condition);
		// 删除掉 page 和 num
		if (!page) delete c.page;
		if (!num) delete c.num;

		const _request = normalGet(`${api}?${urlEncode(clearEmpty(c))}`);
		// console.log(`${api}?${urlEncode(clearEmpty(_condition))}`);
		const token = cookies.get('token');

		function warning() {
			Modal.warning({
				title: '提示',
				content: '当前下载服务繁忙，建议稍候再试',
			});
		}
		// 点击确定 btn
		const toOkClick = async () => {
			this.setState({ loadingStatus: 'loading' });
			message.warning('正在下载请稍等...');
			const result = await _request();
			const { code, data, message: mes } = result || {};
			if (result) {
				if (code === 200) {
					this.setState({ loadingStatus: 'normal' });
					// console.log(baseUrl, `${baseUrl}${exportFile(data)}?token=${token}`);
					// return false;
					DownloadFile(`${baseUrl}${exportFile(data)}?token=${token}`);
				} else {
					this.setState({ loadingStatus: 'normal' });
					if (type === 'inquiry') {
						warning();
					} else {
						message.error(mes || '网络异常请稍后再试!');
					}
				}
			} else {
				message.warning('网络异常,请稍后再试！');
			}
		};

		if (current) {
			// console.log('本页导出');
			Modal.confirm({
				title: '确认导出当页所有数据吗？',
				content: '点击确定，将为您导出当页所有数据',
				iconType: 'exclamation-circle',
				onOk() {
					toOkClick();
				},
				onCancel() {},
			});
		} else if (selectIds) {
			const _selectedRowKeys = (typeof selectedRowKeys === 'function' ? selectedRowKeys() : selectedRowKeys) || [];
			if (_selectedRowKeys && _selectedRowKeys.length > 0) {
				Modal.confirm({
					title: '确认导出选中的所有信息吗？',
					width: (selectData ? 600 : 420),
					content: (
						<div style={selectData && { marginLeft: -37 }}>
							<div style={{ fontSize: 14, marginBottom: 20 }}>点击确定，将为您导出选中的所有信息。</div>
							{selectData && <ModalTable selectData={selectData} getData={this.getData} />}
						</div>
					),
					iconType: 'exclamation-circle',
					onOk() {
						toOkClick();
					},
					onCancel() {},
				});
			} else {
				message.warning(waringText || '未选中业务');
			}
		} else if (all) {
			console.log('一键导出');
			Modal.confirm({
				title: '确认导出所有信息吗？',
				content: '点击确定，将为您导出所有信息',
				iconType: 'exclamation-circle',
				onOk() {
					toOkClick();
				},
				onCancel() {},
			});
		} else if (c[field] && window._.isArray(c[field])) {
			if (c[field].length > 0) {
				console.log(' ');
				toOkClick();
			} else {
				message.warning(waringText || '未选中业务');
			}
			// window.open(`${api}?${urlEncode(clearEmpty(_condition))}`, '_self');
		} else if (normal) {
			toOkClick();
		} else {
			message.warning(waringText || '未选中业务');
		}
		return false;
	};

	render() {
		const { loadingStatus } = this.state;
		const {
			text, all, style, disabled, icon,
		} = this.props;

		// const iconType = icon || <span className={all ? 'yc-export-img' : ''} />;
		const iconType = icon || (all ? <IconType type="icon-export" style={{ position: 'relative', top: '1px' }} /> : null);
		return (
			<Button className={all && 'yc-all-export'} disabled={loadingStatus === 'loading' || disabled} onClick={this.handleDownload} style={style}>
				{ loadingStatus === 'loading' ? <Icon type="loading" /> : iconType }
				<span style={loadingStatus === 'loading' || all ? { marginLeft: 5 } : ''}>{text || '一键导出'}</span>
			</Button>
		);
	}
}

Download.propTypes = {
	style: PropTypes.obj,
	// 是否添加style样式
	text: PropTypes.string,
	// 按钮的文本内容
	all: PropTypes.bool,
	// 是否是一键导出，优先级高于 field
	field: PropTypes.string,
	// 部分导出时应用，与 all 参数冲突
	condition: PropTypes.obj,
	// 导出请求所需的参数
};

Download.defaultProps = {
	style: {},
	text: null,
	all: false,
	field: false,
	condition: {},
};
