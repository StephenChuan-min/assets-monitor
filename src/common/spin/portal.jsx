import React from 'react';
import ReactDOM from 'react-dom';

class OldPortal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 初始化时根据visible属性来判断是否渲染
	componentDidMount() {
		const { visible } = this.props;
		if (visible) {
			this.renderPortal(this.props);
		}
	}

	// 每次接受到props进行渲染与卸载操作
	componentWillReceiveProps(props) {
		// console.log('modal NextProps', props.visible);
		// const { visible } = this.props;
		if (props.visible) {
			this.renderPortal(props);
		} else {
			this.closePortal();
		}
	}

	// 卸载
	closePortal() {
		if (this.node) {
			this.node.style.display = 'none';
			// 卸载元素中的组件
			// ReactDOM.unmountComponentAtNode(this.node);
			// // 移除元素
			// document.body.removeChild(this.node);
			// // 清空当前节点
			// this.node = null;
		}
	}

	// 渲染
	renderPortal(props) {
		const { Container } = props;
		// console.log('renderPortal：', Container);

		if (!this.node) {
			// 防止多次创建node
			this.node = document.createElement('div');
			if (Container)Container.appendChild(this.node);
			else document.body.appendChild(this.node);
		} else {
			this.node.style.display = 'block';
		}
		ReactDOM.unstable_renderSubtreeIntoContainer(
			this, // 上下文指定当前的实例
			props.children, // 渲染的元素为当前的children
			this.node, // 将元素渲染到我们新建的node中,这里我们不使用第四个参数回调.
		);
		// console.log(props.children);
		// 将当前node添加到body中
	}

	render() {
		return null;
	}
}

export default OldPortal;
