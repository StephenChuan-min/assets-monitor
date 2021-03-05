import React from 'react';
import {
	Form, message, Tooltip, Icon, Pagination, Modal, Select,
} from 'antd';
// import Cookies from 'universal-cookie';
// import { baseUrl  } from '@/utils/api';
// import BASE_URL from '@/utils/api/config';
import {
	businessList, // 列表
	exportExcel, // 导出列表
	postDeleteBatch, // 批量删除
} from '@/utils/api/business';
import {
	Input, Button, Spin, timeRule, Download, SelectedNum, DatePicker,
} from '@/common';
import businessImg from '@/assets/img/business/icon_recovery_n.png';
import ModalTable from './modalTable';
import PeopleListModal from './Modal/peopleList';
import BusinessModal from './Modal/business-modal';
import TableList from './table';
import './style.scss';

// const cookies = new Cookies();
const { confirm } = Modal;
const createForm = Form.create;

const _style1 = { width: 278 };
const _style2 = { width: 100 };
const _style3 = { width: 80 };

const text = (
	<div style={{ width: 250, height: 150 }}>
		导入流程和注意事项：
		<br />
		1、请先下载模版
		<br />
		2、将需导入的数据填写在下载好的模版内，请严格按照模版内要求进行填写
		<br />
		3、请将填写好的模版上传
		<br />
		4、上传成功—新的业务数据导入成功
		<br />
		5、上传失败—请按照相关提示进行修改后再次上传
		<br />
	</div>
);

class BusinessView extends React.Component {
	constructor(props) {
		super(props);
		document.title = '业务视图-业务管理';
		this.state = {
			openRowSelection: false,
			dataList: [], // 接口返回数据
			selectedRowKeys: [], // 这里配置默认勾选列
			selectData: [], // 选中数组
			totals: 0,
			current: 1, // 当前页
			pageSize: 10, // 默认展示条数
			loading: false,
			startTime: '',
			endTime: '',
			PeopleListModalVisible: false,
			businessId: '', // 担保人id
			searchValue: null, // 输入框内容
			errorModalVisible: false,
			uploadErrorData: '',
			errorLoading: false,
			_selectedRowKeys: [],
			reqLoading: false,
			businessModalVisible: false,
		};
		this.condition = {};
	}

	componentDidMount() {
		this.getData();
		window._addEventListener(document, 'keyup', this.toKeyCode13);
	}

	componentWillUnmount() {
		window._removeEventListener(document, 'keyup', this.toKeyCode13);
		this.setState = () => null;
	}

	toKeyCode13=(e) => {
		const event = e || window.event;
		const key = event.keyCode || event.which || event.charCode;
		if (document.activeElement.nodeName === 'INPUT' && key === 13) {
			const { className } = document.activeElement.offsetParent;
			if (/yc-input-wrapper/.test(className)) {
				this.search();
				document.activeElement.blur();
			}
		}
	};

	// 附件上传处理
	// uploadAttachmentParam = () => {
	// 	const that = this;
	// 	return {
	// 		name: 'file',
	// 		action: `${BASE_URL}/yc/business/importExcelText?token=${cookies.get('token') || ''}`,
	// 		beforeUpload(file) {
	// 			const type = file.name.split('.');
	// 			const isTypeRight = type[type.length - 1] === 'xlsx' || file.name.split('.')[1] === 'xls';
	// 			if (!isTypeRight) {
	// 				message.error('只能上传 Excel格式文件！');
	// 			}
	// 			return isTypeRight;
	// 		},
	// 		onChange(info) {
	// 			// if (info.file.status !== 'uploading') {
	// 			// 	console.log(info.file, info.fileList);
	// 			// }
	// 			that.setState({
	// 				errorLoading: true,
	// 			});
	// 			// console.log(info.file.status, 12312);
	// 			that.handleCancel();
	// 			if (info.file.status === 'done') {
	// 				if (info.file.response.code === 200) {
	// 					// url.push(info.file.response.data);
	// 					that.setState({
	// 						refresh: !that.state.refresh,
	// 						errorMsg: [],
	// 						errorLoading: false,
	// 					});
	// 					const { form: { resetFields } } = that.props; // 会提示props is not defined
	// 					resetFields('');
	// 					that.getData();
	// 					const successMessage = info.file.response.data.type !== 2 ? '成功导入' : '成功转移';
	// 					message.success(`${info.file.name} ${successMessage}${info.file.response.data.businessCount}笔`);
	// 					that.handleCancel();
	// 				} else if (info.file.response.code === 9001) {
	// 					message.error('服务器出错');
	// 					that.setState({
	// 						errorLoading: false,
	// 					});
	// 				} else if (info.file.response.code === 9003) {
	// 					message.error(info.file.response.message);
	// 					that.setState({
	// 						errorLoading: false,
	// 					});
	// 				} else {
	// 					info.fileList.pop();
	// 					// 主动刷新页面，更新文件列表
	// 					that.setState({
	// 						refresh: !that.state.refresh,
	// 						uploadErrorData: info.file.response.data,
	// 						errorLoading: false,
	// 						// errorMsg: info.file.response.data.errorMsgList,
	// 					});
	// 					that.openErrorModal();
	// 					// that.uploadError(info.file.response.data);
	// 					// message.error(`上传失败: ${info.file.response.data.errorMessage}`);
	// 				}
	// 			} else if (info.file.status === 'error') {
	// 				message.error(`${info.file.name} 上传失败。`);
	// 				that.setState({
	// 					errorMsg: [],
	// 					errorLoading: false,
	// 				});
	// 			}
	// 		},
	// 	};
	// };

	// 获取消息列表
	getData = (value) => {
		const {
			current, pageSize, totals,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;

		const fildes = getFieldsValue();

		const params = {
			num: pageSize,
			page: totals % 10 === 1 ? (current === 1 ? 1 : current - 1) : current,
			...fildes,
			...value,
			...this.condition,
		};
		this.setState({
			loading: true,
		});
		businessList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};


	// page翻页
	handleChangePage = (val) => {
		const { pageSize, searchValue } = this.state;
		const params = {
			...searchValue,
			current: val,
			num: pageSize,
			page: val,
			...this.condition,
		};
		this.setState({
			// page: val,
			loading: true,
		});

		businessList(params).then((res) => {
			if (res && res.data) {
				this.setState({
					dataList: res.data.list,
					totals: res.data.total,
					current: val && val.page ? val.page : res.data.page, // 翻页传选中页数，其他重置为1
					loading: false,
				});
			} else {
				message.error(res.message);
			}
		}).catch(() => {
			this.setState({ loading: false });
		});
	};

	// 排序触发
	onSortChange=(field, order) => {
		this.condition.sortColumn = field;
		this.condition.sortOrder = order;
		this.search();
	};

	// 搜索
	search = () => {
		const { form } = this.props; // 会提示props is not defined
		const {
			startTime, endTime, pageSize,
		} = this.state;
		const { getFieldsValue } = form;
		const fildes = getFieldsValue();
		if (startTime && endTime && startTime > endTime) {
			message.warning('结束时间必须大于开始时间');
			return;
		}
		const params = {
			...fildes,
			page: 1,
			num: pageSize,
			uploadTimeStart: startTime || null, // 搜索时间
			uploadTimeEnd: endTime || null,
		};

		this.getData(params);
		this.setState({
			searchValue: params,
			selectedRowKeys: [], // 这里配置默认勾选列
			openRowSelection: false,
		});
	};

	onShowSizeChange = (p) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const values = getFieldsValue();
		const params = {
			...values,
			page: 1,
			num: p,
			...this.condition,
		};
		this.setState({ pageSize: p });
		this.getData(params);
	};

	// 打开或者关闭批量管理
	openManagement = (openRowSelection) => {
		this.setState({
			openRowSelection: !openRowSelection,
			selectedRowKeys: [],
		});
	};

	onSelectChange = (selectedRowKeys) => {
		// 维护一个 selectedRowsArray 来保存之前的数据。
		const selectedRowsArray = selectedRowKeys.map(item => JSON.parse(item));

		// 获取id数组
		const _selectedRowKeys = selectedRowsArray.map(item => item.id);

		// console.log(selectedRows, _selectedRowKeys);

		this.setState({
			selectedRowKeys,
			_selectedRowKeys,
			selectData: selectedRowsArray,
		});
	};

	// 重置输入框
	queryReset = () => {
		const { form } = this.props; // 会提示props is not defined
		const { resetFields } = form;
		resetFields('');
		const params = {
			page: 1,
		};
		this.getData(params);
		this.setState({
			searchValue: '',
			startTime: '',
			endTime: '',
			selectedRowKeys: [], // 这里配置默认勾选列
			openRowSelection: false,
		});
	};


	// 批量删除
	handledDeleteBatch = () => {
		const {
			selectedRowKeys, totals, current, selectData, _selectedRowKeys, reqLoading,
		} = this.state;
		const that = this;
		if (selectedRowKeys.length === 0) {
			message.warning('未选中业务');
			return;
		}
		confirm({
			title: '确认删除选中业务吗?',
			className: 'business-delete-modal',
			content: (
				<div style={{ marginLeft: -37 }}>
					<Spin visible={reqLoading}>
						<div style={{ fontSize: 14, marginBottom: 20 }}>点击确认删除，业务相关债务人的所有数据(除已完成的数据外)将被清空，无法恢复，请确认是否存在仍需继续跟进的数据</div>
						<ModalTable selectData={selectData} getData={this.getData} />
					</Spin>

				</div>
			),
			iconType: 'exclamation-circle',
			width: 600,
			onOk() {
				const params = {
					idList: _selectedRowKeys,
				};
				// 判断最后一页批量删除
				let currentLength;
				if (Math.ceil(totals / 10) === current && totals % 10 === selectedRowKeys.length) {
					currentLength = current - 1;
				}
				if (Math.ceil(totals / 10) === current && selectedRowKeys.length === 10) {
					currentLength = current - 1;
				}
				const otherParams = {
					page: currentLength || current,
				};
				const start = new Date().getTime(); // 获取接口响应时间
				that.setState({
					reqLoading: true,
				});
				return postDeleteBatch(params).then((res) => {
					if (res.code === 200) {
						const now = new Date().getTime();
						const latency = now - start;
						setTimeout(res.data, latency);
						that.setState({
							selectedRowKeys: [],
							reqLoading: false,
						});
						message.success(res.data);
						that.getData(otherParams);
					} else {
						message.error(res.message);
						that.setState({
							reqLoading: false,
						});
					}
				}).catch(() => {
					that.setState({
						reqLoading: false,
					});
				});
			},
			onCancel() {},
		});
	};

	// 导出
	toExportCondition = (type) => {
		const { form } = this.props; // 会提示props is not defined
		const { getFieldsValue } = form;
		const {
			startTime, endTime, _selectedRowKeys,
		} = this.state;
		const fields = getFieldsValue();
		const params = {
			...fields,
			uploadTimeStart: startTime || null, // 搜索时间
			uploadTimeEnd: endTime || null,
		};
		if (type === 'all') {
			return Object.assign({}, params);
		}
		return Object.assign({}, params, { idList: _selectedRowKeys });
	};

	// 打开担保人弹窗
	openPeopleModal = (id) => {
		this.setState({
			PeopleListModalVisible: true,
			businessId: id,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			PeopleListModalVisible: false,
		});
	};

	handleCancel = (type) => {
		if (type === 'down') {
			const hide = message.loading('正在为您下载,请稍后...', 0);
			// 异步手动移除
			setTimeout(hide, 1000);
		}
		this.setState({
			errorModalVisible: false,
		});
	};

	openErrorModal = () => {
		this.setState({
			errorModalVisible: true,
		});
	};

	// 打开导入业务的弹窗
	handleOpenBusinessModal = () => {
		this.setState({
			businessModalVisible: true,
		});
	};

	// 关闭导入业务的弹窗
	handleCloseBusinessModal = () => {
		this.setState({
			businessModalVisible: false,
		});
	};

	render() {
		const {
			openRowSelection, selectedRowKeys, selectData, totals, current, dataList, loading, PeopleListModalVisible, businessId, errorModalVisible, uploadErrorData, errorLoading, reqLoading, businessModalVisible, pageSize,
		} = this.state;
		const { form } = this.props; // 会提示props is not defined
		const { getFieldProps, getFieldValue } = form;
		// 通过 rowSelection 对象表明需要行选择
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const timeOption = {
			normalize(n) {
				return typeof n === 'object' ? (n && new Date(n).format('yyyy-MM-dd')) : n;
			},
		};
		// 排序相关字段
		const sortInfo = {
			onSortChange: this.onSortChange,
			sortField: this.condition.sortColumn,
			sortOrder: this.condition.sortOrder,
		};
		return (
			<div className="yc-content-query" style={{ padding: 20 }}>
				<Spin visible={reqLoading} modal text="正在删除中,请稍后..." />
				<Spin visible={errorLoading} modal text="正在为您上传文件，请稍后..." />
				<Form layout="inline">
					<div className="yc-query-item">
						<Input
							title="业务编号"
							style={_style1}
							size="large"
							maxLength="32"
							placeholder="业务编号"
							{...getFieldProps('caseNumber', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="借款人"
							style={_style1}
							size="large"
							maxLength="40"
							placeholder="姓名/公司名称"
							{...getFieldProps('obligorName', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="证件号"
							style={_style1}
							size="large"
							maxLength="18"
							placeholder="身份证号/统一社会信用代码"
							{...getFieldProps('obligorNumber', {
								getValueFromEvent: e => e.trim().replace(/[^0-9a-zA-Z-*（）()]/g, ''),
							})}
						/>
					</div>
					<div className="yc-query-item" style={{ marginRight: 0 }}>
						<Input
							title="负责人/机构"
							style={_style1}
							size="large"
							maxLength="40"
							titleWidth={88}
							placeholder="负责人/机构"
							{...getFieldProps('orgName', {
								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<Input
							title="上传人员"
							style={_style1}
							size="large"
							maxLength="32"
							placeholder="上传人员"
							{...getFieldProps('uploadName', {

								getValueFromEvent: e => e.trim(),
							})}
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">上传时间：</span>
						<DatePicker
							{...getFieldProps('uploadTimeStart', {
								onChange: (value, dateString) => {
									this.setState({
										startTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledStartDate(time, getFieldValue('uploadTimeEnd'))}
							size="large"
							style={_style2}
							placeholder="开始日期"
						/>
						<span className="yc-query-item-title">至</span>
						<DatePicker
							{...getFieldProps('uploadTimeEnd', {
								onChange: (value, dateString) => {
									this.setState({
										endTime: dateString,
									});
								},
								...timeOption,
							})}
							disabledDate={time => timeRule.disabledEndDate(time, getFieldValue('uploadTimeStart'))}
							size="large"
							style={_style2}
							placeholder="结束日期"
						/>
					</div>
					<div className="yc-query-item">
						<span className="yc-query-item-title">推送状态: </span>
						<Select
							size="large"
							defaultValue="all"
							style={_style3}
							{...getFieldProps('pushState', { initialValue: '' })}
						>
							{[
								{ id: 1, name: '全部', value: '' },
								{ id: 2, name: '开启', value: 1 },
								{ id: 3, name: '关闭', value: 0 },
							].map(item => <Select.Option key={item.key} value={item.value}>{item.name}</Select.Option>)}
						</Select>
					</div>

					<div className="yc-query-item yc-query-item-btn">
						<Button onClick={this.search} size="large" type="common" style={{ width: 84 }}>查询</Button>
						<Button onClick={this.queryReset} size="large" style={{ width: 110, marginRight: 0 }}>重置查询条件</Button>
					</div>
					{/* 分隔下划线 */}
					<div className="yc-noTab-hr" />

					<div className="yc-business-table-btn" style={{ minHeight: 32, overflow: 'visible' }}>
						{
									!openRowSelection ? (
										<React.Fragment>
											{
												!global.isProxyLimit && (
													<React.Fragment>
														<Button type="common" className="yc-business-btn" onClick={this.handleOpenBusinessModal}>
															导入业务
														</Button>
														<Tooltip placement="topLeft" title={text} arrowPointAtCenter>
															<img src={businessImg} alt="业务视图提示" className="yc-business-icon" />
														</Tooltip>
													</React.Fragment>
												)
											}
										</React.Fragment>
									) : (
										<React.Fragment>
											{selectedRowKeys && selectedRowKeys.length > 0 ? <SelectedNum style={{ position: 'absolute', top: 6 }} num={selectedRowKeys.length} /> : null}
										</React.Fragment>
									)
								}
						<div className="yc-public-floatRight">
							{
										openRowSelection ? (
											<React.Fragment>
												{
													!global.isProxyLimit && (
														<Button style={{ margin: '0 0 0 10px' }} onClick={this.handledDeleteBatch} className="yc-business-btn">删除</Button>
													)
												}
												<Download style={{ margin: '0 0 0 10px' }} selectedRowKeys={selectedRowKeys} selectData={selectData} condition={this.toExportCondition} api={exportExcel} field="idList" selectIds text="导出" />
											</React.Fragment>
										) : null
									}
							{
										openRowSelection ? null : <Download condition={() => this.toExportCondition('all')} api={exportExcel} all text="一键导出" />
									}
							<Button
								style={{ margin: '0 0 0 10px' }}
								className="yc-business-btn"
								type={`${openRowSelection ? 'common' : ''}`}
								onClick={() => this.openManagement(openRowSelection)}
							>
								{openRowSelection ? '取消批量管理' : '批量管理'}
							</Button>
						</div>
					</div>

					<Spin visible={loading}>
						<TableList
							stateObj={this.state}
							selectData={selectData}
							dataList={dataList}
							rowSelection={rowSelection}
							getData={this.getData}
							openPeopleModal={this.openPeopleModal}
							{...sortInfo}
						/>
						{dataList && dataList.length > 0 && (
							<div className="yc-table-pagination pagination-select">
								<Pagination
									total={totals}
									current={current}
									defaultPageSize={pageSize} // 默认条数
									showQuickJumper
									pageSizeOptions={['10', '25', '50']}
									showSizeChanger
									onShowSizeChange={(c, p) => this.onShowSizeChange(p)}
									showTotal={total => `共 ${total} 条记录`}
									onChange={(val) => {
										this.handleChangePage(val);
									}}
								/>
							</div>
						)}
					</Spin>
				</Form>
				{/** 担保人Modal */}
				{ PeopleListModalVisible && (
					<PeopleListModal onCancel={this.onCancel} onOk={this.onOk} businessId={businessId} PeopleListModalVisible={PeopleListModalVisible} />
				)}
				{ errorModalVisible && 	(
				<Modal visible={errorModalVisible} onCancel={this.handleCancel} footer={false} width={420}>
					<div className="yc-confirm-body">
						<div className="yc-confirm-header">
							<Icon style={{ fontSize: 24, color: '#f66c5b', marginRight: 8 }} type="cross-circle" />
							<span className="yc-confirm-title">{uploadErrorData.errorType}</span>
						</div>
						<div className="yc-confirm-content">
							{uploadErrorData.errorMessage}
						</div>
						<div className="yc-confirm-btn">
							{/* type===2时为业务转移，为1或null时为业务导入 */}
							{/* {uploadErrorData.type !== 2 && ( */}
							{/*	<Upload className="yc-upload" showUploadList={false} {...this.uploadAttachmentParam()}> */}
							{/*		<Button style={{ height: 34, marginRight: 10 }}>重新上传</Button> */}
							{/*	</Upload> */}
							{/* )} */}
							{
								uploadErrorData.errorType === '文件格式错误' && uploadErrorData.type !== 2 ? (
									<Button
										onClick={() => this.handleCancel('down')}
										className="yc-confirm-footer-btn"
										type="primary"
									>
										<a href="../../../static/template.xlsx" style={{ color: '#fff' }}>模板下载</a>
									</Button>
								) : <Button onClick={this.handleCancel} className="yc-confirm-footer-btn" type="primary">我知道了</Button>
							}
						</div>
					</div>
				</Modal>
				)}
				{
				 businessModalVisible && (
				<BusinessModal
					getData={this.getData}
					businessModalVisible={businessModalVisible}
					onCancel={this.handleCloseBusinessModal}
					form={form}
				/>
				 )
				}
			</div>
		);
	}
}
export default createForm()(BusinessView);
