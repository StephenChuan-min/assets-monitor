import React from 'react';
import { Tree } from 'antd';
import { Icon, Input } from '@/common';
import noResultImg from '@/assets/img/img_blank_noresult.png';
// eslint-disable-next-line import/no-cycle
import { getParentKey } from './index';
import './index.scss';

const { TreeNode } = Tree;

// 获取元素的纵坐标
function getTop(e) {
	let offset = e.offsetTop;
	if (e.offsetParent != null) offset += getTop(e.offsetParent);
	return offset;
}

class SearchTree extends React.Component {
	constructor(props) {
		super(props);
		document.title = '账号开通';
		this.state = {
			expandedKeys: [],
			searchValue: '',
			autoExpandParent: true,
			orgTree: [],
			selectedKeys: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		const { orgTree, currentOrgDetail } = this.props;
		if (JSON.stringify(orgTree) !== JSON.stringify(nextProps.orgTree)) {
			this.setState({
				orgTree: nextProps.orgTree,
				expandedKeys: `${nextProps.orgTree[0].id}`,
				selectedKeys: [`${nextProps.orgTree[0].id}`],
			});
		} else if (currentOrgDetail.id !== nextProps.currentOrgDetail.id) {
			this.handleSwitchSelect(nextProps.currentOrgDetail.id);
		}
	}

	// 当前id变化，选中节点在节点树里面也跟着变化
	handleSwitchSelect = (id) => {
		if (id) {
			this.setState({
				expandedKeys: [`${id}`],
				selectedKeys: [`${id}`],
				autoExpandParent: true,
			});
		}
	};

	// 输入框的变化
	onChangeInput = (value) => {
		const { orgTree, dataList } = this.props;
		const expandedKeys = dataList
			.map((item) => {
				if (item.name.indexOf(value) > -1) {
					return getParentKey(item.id, orgTree);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);
		const newExpandedKeys = expandedKeys.map(item => `${item}`);
		this.setState({
			expandedKeys: newExpandedKeys,
			searchValue: value,
			autoExpandParent: true,
		});
	};

	// 手动设置滚动条
	handleSetTreeScrollTop = () => {
		let scrollTopLong = 0;
		const treeDom = document.getElementById('tree');
		const matchDom = document.getElementsByClassName('match-node');
		// console.log('treeDom === ', treeDom, treeDom.scrollHeight);
		// console.log('matchDom === ', matchDom[0]);
		// matchDom[0] 是第一个匹配class的元素
		// 选中的第一个元素距离树结构根节点的高度 （元素距离浏览器顶部的距离 - 上方元素的高度：240）
		const matchDomTop = getTop(matchDom[0]) - 240;
		scrollTopLong = treeDom.scrollHeight; // 滚动条滚动的距离
		// console.log('scrollTop === ', matchDomTop, scrollTopLong);
		if (treeDom && treeDom.scrollHeight) {
			if (matchDomTop > scrollTopLong) {
				treeDom.scrollTop = scrollTopLong;
			} else {
				treeDom.scrollTop = matchDomTop;
			}
		}
	};

	// 点击搜索按钮
	handleSearchOrg = () => {
		const { orgTree, dataList } = this.props;
		const { searchValue } = this.state;
		const expandedKeys = dataList
			.map((item) => {
				if (item.name.indexOf(searchValue) > -1) {
					return getParentKey(item.id, orgTree);
				}
				return null;
			})
			.filter((item, i, self) => item && self.indexOf(item) === i);
		const newExpandedKeys = expandedKeys.map(item => `${item}`);
		this.setState({
			expandedKeys: searchValue ? newExpandedKeys : [],
			autoExpandParent: !!searchValue,
		}, () => {
			this.handleSetTreeScrollTop();
		});
	};

	// 清空输入框
	handleClearInput = () => {
		this.setState({
			searchValue: '',
			expandedKeys: [],
			autoExpandParent: true,
		});
	};

	// 展开函数
	onExpand = (expandedKeys) => {
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	};

	// 手动添加机构
	handleAddNextOrg = (item) => {
		const { handleAddOrg } = this.props;
		handleAddOrg(item);
	};

	// 手动删除机构
	handleDeleteOrg = (item) => {
		const { warningModal } = this.props;
		const titleNode = (
			<span>
				确认删除机构(
				<span className="ant-confirm-title-point">{item.name}</span>
				)？
			</span>
		);
		if (Array.isArray(item.children) && item.children.length > 0) {
			warningModal([item, '无法删除该机构', '该机构存在下级机构，请在删除完下级机构后重试', '我知道了', '', true, 'deleteOrg']);
		} else {
			warningModal([item, titleNode, '一经删除，无法恢复', '确定', '取消', false, 'deleteOrg']);
		}
	};

	// 手动编辑机构
	handleEditNextOrg = (item) => {
		const { handleOpenEditOrg } = this.props;
		handleOpenEditOrg({ ...item, orgName: item.name });
	};

	// 点击机构
	handleSelect = (selectedKeys) => {
		const { orgTree } = this.state;
		const { switchOrg } = this.props;
		if (selectedKeys.length > 0) {
			this.setState({
				selectedKeys,
			});
			const id = parseInt(selectedKeys[0], 10);
			switchOrg(orgTree, id);
		}
	};


	render() {
		const {
			expandedKeys, autoExpandParent, searchValue, orgTree, selectedKeys,
		} = this.state;
		const { currentOrgDetail, orgTopId } = this.props;
		const loop = data => data.map((item) => {
			const index = item.name.indexOf(searchValue);
			const beforeStr = item.name.substr(0, index);
			const afterStr = item.name.substr(index + searchValue.length);
			const title = index > -1 ? (
				<React.Fragment>
					<span className={`${item.name.length >= 15 ? 'more-org-name' : ''}`}>
						{beforeStr}
						<span className="match-word">{searchValue}</span>
						{afterStr}
					</span>
					<span onClick={() => this.handleEditNextOrg(item)}><Icon className="edit" type="icon-edit" /></span>
					{
						item.level < 3 && <span onClick={() => this.handleAddNextOrg(item)}><Icon className="add" type="icon-add-circle" /></span>
					}
					{
						item.id !== orgTopId && <span onClick={() => this.handleDeleteOrg(item)}><Icon className="del" type="icon-delete-circle" /></span>
					}
				</React.Fragment>
			) : (
				<React.Fragment>
					<span className={`${item.name.length >= 15 ? 'more-org-name' : ''}`}>{item.name}</span>
					<span onClick={() => this.handleEditNextOrg(item)}><Icon className="edit" type="icon-edit" /></span>
					{
						item.level < 3 && <span onClick={() => this.handleAddNextOrg(item)}><Icon className="add" type="icon-add-circle" /></span>
					}
					{
						item.id !== orgTopId && <span onClick={() => this.handleDeleteOrg(item)}><Icon className="del" type="icon-delete-circle" /></span>
					}
				</React.Fragment>
			);
			if (Array.isArray(item.children) && item.children.length > 0) {
				return (
					<TreeNode
						key={item.id}
						title={title}
						selectable={currentOrgDetail.id !== item.id}
						className={`${index > -1 ? ' match-node' : ''}`}
					>
						{loop(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode selectable={currentOrgDetail.id !== item.id} className={`${index > -1 ? 'match-node' : ''}`} key={item.id} title={title} />;
		});
		return (
			<div className="account-left">
				<div className="account-box">
					<div className="account-box-title">机构管理</div>
					<div className="account-box-input">
						<div className="search-org">
							<Input
								className="search-org-input"
								placeholder="请输入要查找的机构"
								onChange={this.onChangeInput}
								value={searchValue}
							/>
							<span className="search-org-clear" onClick={this.handleClearInput}>
								{
								searchValue && <Icon className="search-org-clear-icon" type="icon-delete" style={{ fontSize: 10, color: '#bfbfbf' }} />
							}
							</span>
						</div>
						<span className="search-btn" onClick={this.handleSearchOrg}>
							<Icon className="search-btn-icon" type="icon-search" />
						</span>
					</div>
				</div>
				<div className="tree-box">
					<div className="tree-box-inner" id="tree">
						{
							searchValue && Array.isArray(expandedKeys) && expandedKeys.length === 0 ? (
								<div className="tree-box-inner-noresult">
									<img src={noResultImg} alt="查询不到相关机构" className="yc-business-icon" />
									<div className="tree-box-inner-noresult-text">查询不到相关机构</div>
								</div>
							) : (
								<Tree
									defaultExpandAll
									height={400}
									className="account-tree"
									onExpand={this.onExpand}
									expandedKeys={expandedKeys}
									autoExpandParent={autoExpandParent}
									onSelect={this.handleSelect}
									selectedKeys={selectedKeys}
								>
									{loop(orgTree)}
								</Tree>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}
export default SearchTree;
