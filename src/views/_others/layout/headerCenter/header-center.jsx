import React from 'react';
import {
	Tree, message, Icon, Modal,
} from 'antd';
import { navigate } from '@reach/router';
import Cookies from 'universal-cookie';
import { Input } from '@/common';
import { generateUrlWithParams } from '@/utils';
import {
	userInfo, // tree
	loginOut, // login
	switchOrg, // 切换机构
	currentOrg, // 获取机构id
} from '@/utils/api/user';
import flat from '@/utils/flatArray';
import PasswordModal from './passwordModal';
import './style.scss';

const { TreeNode } = Tree;
const cookie = new Cookies();

export default class HeaderMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			passwordModalVisible: false,
			treeData: [],
			treeList: [],
			valueList: '',
			isShowLoginout: true,
		};
	}

	componentWillMount() {
		const isSpecial = cookie.get('isSpecial');
		this.setState({
			isShowLoginout: isSpecial,
		});
		this.checkId = setInterval(() => {
			// 获取机构id
			const token = cookie.get('token');
			if (token) {
				this.checkOrgId();
			}
		}, 20 * 1000);
	}

	componentDidMount() {
		this.toGetUserInfo();
	}

	componentWillUnmount() {
		if (this.checkId) {
			window.clearInterval(this.checkId);
		}
	}

	toGetUserInfo=() => {
		const { getData } = this.props;
		userInfo().then((res) => {
			if (res.code === 200) {
				getData(res.data);
				// 获取机构id
				const { currentOrgId } = res.data;
				// 定义全局变量
				global.CURRENT_0RG = currentOrgId;
				this.setState({
					treeData: res.data,
					treeList: res.data.orgTree ? [res.data.orgTree] : [],
				});
			}
		});
	};

	checkOrgId = () => {
		currentOrg({ event: 'loop' }).then((res) => {
			const { hash } = window.location;
			if (res.code === 200) {
				if (res.data.orgId !== global.CURRENT_0RG) {
					if (/#\/debtor\/detail/.test(hash)) {
						window.clearInterval(this.checkId);
						Modal.warning({
							title: '您已切换机构，请查看当前机构下债务人',
							onOk() {
								navigate('/');
								// navigate('/business/debtor');
								window.location.reload(); // 退出登录刷新页面
							},
						});
					} else if (/#\/business\/detail/.test(hash)) {
						window.clearInterval(this.checkId);
						Modal.warning({
							title: '您已切换机构，当前机构下该笔业务不存在',
							onOk() {
								navigate('/');
								// navigate('/business');
								window.location.reload(); // 退出登录刷新页面
							},
						});
					} else if (/#\/inquiry\/(enterprise|personal)/.test(hash)) {
						this.toGetUserInfo();
					} else {
						window.clearInterval(this.checkId);
						Modal.warning({
							title: '您已切换机构,请刷新界面！',
							onOk() {
								window.location.reload(); // 退出登录刷新页面
							},
						});
					}
				}
			}
		}).catch(() => {
			console.log('服务器出错');
		});
	};

	// 退出登录
	handleClick = () => {
		loginOut().then(() => {
			cookie.remove('token');
			navigate('/login');
			window.location.reload();
		}).catch(() => {
			cookie.remove('token');
			navigate('/login');
			window.location.reload();
		});
	};

	// 根据单个名字筛选
	filterByName = (aim, name) => 	aim.filter(item => item.orgName.indexOf(name) !== -1);

	ycHeaderInput = (value) => {
		// const newInputValue = e && e.target ? e.target.value : ''; // 获取document 对象的引用
		// const hasValue = document.getElementById('headerInput');
		// console.log(newInputValue, hasValue.value);
		const { treeList } = this.state;
		const clearTirm = value && value.trim();
		const arr = flat(treeList) && flat(treeList).filter(item => item !== undefined);
		this.setState({
			valueList: clearTirm,
			selectList: this.filterByName(arr, clearTirm),
		});
	};

	// 选择列表
	selectFilterValue = (val) => {
		this.handleOnSelect([val]);
	};

	handleOnSelect = (info) => {
		const num = Number(info.join(''));
		const params = {
			orgId: num,
		};

		const { hash } = window.location;
		if (hash && hash.indexOf('debtor/detail') !== -1) {
			navigate('/');
		}
		if (hash && hash.indexOf('business/detail') !== -1) {
			navigate('/');
		}
		// console.log(hash.indexOf('message') !== -1);
		// 在消息中心切换时
		if (hash.indexOf('message') !== -1) {
			const urlObj = {
				num: 1,
				page: 1,
			};
			navigate(generateUrlWithParams('/message', urlObj));
		}
		const start = new Date().getTime(); // 获取接口响应时间
		if (num !== 0) {
			switchOrg(params).then((res) => {
				if (res.code === 200) {
					const now = new Date().getTime();
					const latency = now - start;

					const hide = message.loading('正在切换机构,请稍后...', 0);
					setTimeout(() => {
						window.location.reload(); // 实现页面重新加载/
					}, latency);
					// 异步手动移除
					setTimeout(hide, latency);
				} else {
					message.error(res.message);
				}
			});
		}
	};

	// 打开修改密码弹框
	openModal = () => {
		this.setState({
			passwordModalVisible: true,
		});
	};

	// 关闭弹窗
	onCancel = () => {
		this.setState({
			passwordModalVisible: false,
		});
	};

	render() {
		const {
			treeList, treeData, valueList, selectList, passwordModalVisible, isShowLoginout,
		} = this.state;
		const loop = tree => tree && tree.length > 0
			&& tree.map((item) => {
				if (item.children && item.children.length > 0) {
					return (
						<TreeNode key={item.orgId} title={item.orgName}>
							{loop(item.children)}
						</TreeNode>
					);
				}
				return <TreeNode key={item.orgId} title={item.orgName} />;
			});

		return (
			<div className="yc-header-center" style={treeList && treeList.length > 0 ? { height: 491 } : { height: 75 }}>
				<div className="user-panel-item user-panel-msg clearfix">
					<div className="g-left">
						<div className="user-panel-item-text">
							您好，
							{treeData.name}
						</div>
						<div className="user-panel-item-text">
							当前机构：
							{treeData.orgName}
						</div>
					</div>
					{
						!isShowLoginout && (
							<div className="g-right user-panel-right">
								<div>
									<a
										onClick={() => this.openModal()}
										className="text-prompt user-panel-login"
										data-toggle="modal"
										data-target="#Modalupdate"
									>
										修改密码
									</a>
									<a
										onClick={() => this.handleClick()}
										className="user-panel-login"
									>
										退出登录
									</a>
								</div>
							</div>
						)
					}
				</div>
				{treeList && treeList.length > 0 && (
				<div className="yc-search-container">
					<Icon className="yc-search-icon" type="search" />
					<Input
						className="yc-group-input"
						defaultValue={valueList}
						onChange={e => this.ycHeaderInput(e)}
						placeholder="请输入机构名称"
						size="large"
						maxLength="20"
						// type="text"
						// value={value}
					/>
					<div style={{ height: 304, overflow: 'auto' }}>
						{valueList && valueList.length > 0 ? (
							<div>
								{selectList && selectList.length > 0 && (
								<ul className="yc-input-list">
									{selectList.map(val => (
										<li
											className="yc-input-list-item"
											onClick={() => this.selectFilterValue(val.orgId)}
										>
											{val ? val.orgName : null}
										</li>
									))}
								</ul>
								)}
							</div>
						) : (
							treeList
								&& treeList.length > 0 && (
								<Tree
									draggable
									onSelect={this.handleOnSelect}
									showLine
									defaultExpandedKeys={treeList && treeList.length > 0 && [treeList[0].orgId.toString()]}
								>
									{loop(treeList && treeList.length > 0 && treeList)}
								</Tree>
							)
						)}
					</div>
				</div>
				)}
				{/** 修改密码Modal */}
				{passwordModalVisible && (
				<PasswordModal
					onCancel={this.onCancel}
					onOk={this.onOk}
					passwordModalVisible={passwordModalVisible}
				/>
				)}
			</div>
		);
	}
}
