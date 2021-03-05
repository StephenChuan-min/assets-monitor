import React from 'react';
import PropTypes from 'reactPropTypes';
import {
	Modal, message, Upload,
} from 'antd';
import Cookies from 'universal-cookie';
import { Button, Icon, Spin } from '@/common';
import BASE_URL from '@/utils/api/config';
import './style.scss';

const cookies = new Cookies();

// 警示弹窗
function error([title, content]) {
	Modal.error({
		style: { top: 160 },
		className: 'error-modal',
		title,
		content,
	});
}

const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
// console.log('isMac === ', isMac);

class BusinessModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			visible: props.businessModalVisible,
			loading: false,
			isOverSize: false,
			fileName: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		const { businessModalVisible } = this.props;
		if (nextProps.businessModalVisible !== businessModalVisible) {
			this.setState({
				visible: false,
			});
		}
	}

	// 关闭导入业务弹窗
	handleCancel = () => {
		const { onCancel } = this.props;
		onCancel();
	};

	// 附件上传处理
	uploadAttachmentParam = () => {
		const that = this;
		return {
			name: 'file',
			accept: isMac ? '' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
			action: `${BASE_URL}/yc/business/importExcelText?token=${cookies.get('token') || ''}`,
			beforeUpload(file) {
				const type = file.name.split('.');
				const isTypeRight = type[type.length - 1] === 'xlsx' || file.name.split('.')[1] === 'xls';
				if (!isTypeRight) {
					message.error('只能上传 Excel格式文件！');
				}
				const isOverMemory = file.size <= 16 * 1024 * 1024;
				if (!isOverMemory) {
					error(['文件超过16M', '文件过大，请调整后重新上传']);
					that.setState({
						isOverSize: true,
					});
				} else {
					that.setState({
						isOverSize: false,
					});
				}
				return isTypeRight && isOverMemory;
			},
			onChange(info) {
				// 正常：code 200 ，errorType errorMessage有就是错误
				// code 20009 上传文件失败
				// 20001 上传文件部分成功
				that.setState({
					loading: true,
				});
				// 状态有：uploading done error removed
				// console.log('info === ', info);
				if (info.file.status === 'done') {
					if (info.file.response.code === 200) {
						// errorMessage 或者 errorType存在的时候才会报错格式错误
						// errorType 与 errorMessage一般成对出现，都为空的时候才是上传并且没有错误
						if (!info.file.response.data.errorType && !info.file.response.data.errorMessage) {
							that.setState({
								fileName: info.file.name,
								loading: false,
							});
							const { form: { resetFields }, getData, onCancel } = that.props;
							onCancel();
							resetFields('');
							if (typeof getData === 'function') {
								getData();
							}
							const successMessage = info.file.response.data.type !== 2 ? '成功导入' : '成功转移';
							message.success(`${info.file.name} ${successMessage}${info.file.response.data.businessCount}笔`);
							// eslint-disable-next-line brace-style
						}
						// errorType 与 errorMessage一般成对出现，
						else if (info.file.response.data.errorType || info.file.response.data.errorMessage) {
							that.setState({
								loading: false,
							});
							// 第2行第C列，“名称”不能为空，这种类型的错误出现
							error([info.file.response.data.errorType, info.file.response.data.errorMessage]);
						} else {
							that.setState({
								loading: false,
							});
						}
					} else if (info.file.response.code === 20001) {
						message.error('上传文件部分成功');
						that.setState({
							loading: false,
						});
					} else if (info.file.response.code === 20009) {
						error([info.file.response.data.errorType, info.file.response.data.errorMessage]);
						that.setState({
							loading: false,
						});
					} else if (info.file.response.code === 9001) {
						message.error('服务器出错');
						that.setState({
							loading: false,
						});
					} else if (info.file.response.code === 9003) {
						message.error(info.file.response.message);
						that.setState({
							loading: false,
						});
					} else {
						info.fileList.pop();
						that.setState({
							loading: false,
						});
						message.error(`上传失败: ${info.file.response.data.errorMessage}`);
					}
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} 上传失败。`);
					that.setState({
						loading: false,
					});
				}
			},
		};
	};

	render() {
		const {
			visible, loading, isOverSize, fileName,
		} = this.state;
		return (
			<Modal
				title="导入业务"
				width={467}
				visible={visible}
				className="business-modal"
				onCancel={this.handleCancel}
				onOk={this.handleConfirmFile}
				footer={<div> </div>}
			>
				<Spin visible={loading} text="上传中">
					<div className="business-tips">
						<Icon
							className="business-tips-icon"
							type="icon-bianzu"
						/>
						<div className="business-tips-title">导入业务后，系统将对债务人进行逐个匹配，匹配时间会因导入的债务人数量而不同，请您耐心等待</div>
					</div>
					<div className="business-oper">
						<span className="business-oper-name">附件：</span>
						<div className="business-oper-choose">
							<div className="business-oper-choose-box">
								<Upload
									className={!global.GLOBAL_MEIE_BROWSER ? 'yc-upload' : 'yc-ie-upload'}
									showUploadList={false}
									{...this.uploadAttachmentParam()}
								>
									<Button className="yc-business-btn" style={{ width: 82, height: 32 }}>
										<Icon type="icon-export" className="yc-business-btn-icon" />
										<span className="business-oper-choose-box-upload">选择</span>
									</Button>
								</Upload>
								<a className="business-oper-choose-box-link" href="../../../../static/template.xlsx">模板下载</a>
							</div>
							{
								fileName ? (
									<div className="business-oper-choose-file">
										<Icon type="icon-lianjie" style={{ fontSize: 12, marginRight: 8 }} />
										<span>{fileName}</span>
									</div>
								) : null
							}
							{
								isOverSize ? <div className="business-oper-choose-over">文件过大，请重新选择</div> : null
							}
							<div className="business-oper-choose-tips">文件最大16M,支持扩展名: xls、xlsx </div>
						</div>
					</div>
				</Spin>
			</Modal>
		);
	}
}

BusinessModal.propTypes = {
	businessModalVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	getData: PropTypes.func,
	// eslint-disable-next-line react/forbid-prop-types
	form: PropTypes.object,
};

BusinessModal.defaultProps = {
	businessModalVisible: false,
	form: {},
	onCancel: () => {},
	getData: () => {},
};

export default BusinessModal;
