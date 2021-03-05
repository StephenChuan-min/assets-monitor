import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';
// import eData, { imitateSource } from './data';
import { stockChart } from '@/utils/api/portrait-inquiry/enterprise/info';
import { businessStockChart } from '@/utils/api/professional-work/info';
import { toEmpty } from '@/utils/';
import { Spin } from '@/common';
import back from './logo.png';
// import kzTag from './kzTag.png';
const ec = window.echarts;

// 样式 // 1 个人 or 2 公司
const style = {
	font: {
		textFont: 'normal 14px verdana',
		textAlign: 'center',
		color: '#333',
		lineWidth: 0,
	},
	font_amount: {
		textFont: 'normal 12px verdana',
		textAlign: 'center',
		color: '#9e9e9e',
		lineWidth: 0,
	},
	zLevel: {
		zlevel: 1,
		z: 5,
		ndelete: true,
		hoverable: false,
		clickable: false,
	},
	forStyle: {
		person: {
			normal: {
				color: '#f6faff',
				borderColor: '#1e81e1',
				borderWidth: '1',
				label: {
					show: true,
					position: 'inside',
					textStyle: {
						// color: 'transparent',
						// color: 'red',
						fontSize: 12,
					},
				},
			},
		},
		company: {
			normal: {
				color: '#fff',
				borderWidth: '1',
				borderColor: '#ccc',
				label: {
					show: true,
					position: 'inside',
					textStyle: {
						// color: 'transparent',
						// color: 'red',
						fontSize: 12,
					},
				},
			},
		},
	},
};

// 上下树图初始化 ->option, 数据
const optionMethods = source => ({
	tooltip: {
		show: false,
	},
	series: [
		{
			name: 'holder',
			type: 'tree',
			rootLocation: { x: '50%', y: '50%' },
			orient: 'vertical',
			direction: 'inverse',
			nodePadding: 25, // 节点间距
			layerPadding: 45, // 层间距
			symbol: 'arrow',
			symbolRotate: -45,
			hoverable: false,
			roam: true, // 鼠标缩放
			itemStyle: {
				normal: {
					color: '#1e81e1',
					label: {
						position: 'inside',
						textStyle: {
							color: 'white',
							fontSize: 14,
							fontWeight: 'bold',
						},
					},
				},
				emphasis: {
					color: 'rgba(255,255,255,0)',
					borderColor: 'transparent',
				},
			},
			data: [source[0]],
		},
		{
			name: 'investor',
			type: 'tree',
			rootLocation: { x: '50%', y: '50%' },
			orient: 'vertical',
			nodePadding: 25,
			layerPadding: 40,
			hoverable: false,
			symbol: 'arrow',
			symbolRotate: -45,
			roam: true, // 鼠标缩放
			itemStyle: {
				normal: {
					color: '#1e81e1',
					label: {
						position: 'inside',
						textStyle: {
							color: 'white',
							fontSize: 14,
							fontWeight: 'bold',
						},
					},
				},
				emphasis: {
					color: 'rgba(255,255,255,0)',
					borderColor: 'transparent',
				},
			},
			data: [source[1]],
		},
	],
});

export default class StockRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
		};
		this.myChart = {};
		this.resultSource = [];
	}

	componentDidMount() {
		const {
			stockChartId, isBusiness, name, field,
		} = this.props;
		const _field = field || 'companyId';
		const params = {
			[_field]: stockChartId, // 269766 京东 54780232 网商 1585000 天赐
			// type: 1,
		};
		this.setState({
			loading: true,
		});
		this.myChart = ec.init(document.getElementById('zRenderEcharts'));
		const api = isBusiness ? businessStockChart : stockChart;
		/* this.myChart.showLoading({
			text: '加载中，请稍后...',
			effect: 'spin',
		}); */
		api(params).then((res) => {
			if (res.code === 200) {
				// console.log(params);
				this.setState({ loading: false });
				this.myChart.hideLoading();
				const source = this.initOption(res.data);
				this.resultSource = source;
				this.myChart.setOption(optionMethods(source));
				this.myZrender();
				this.myChart.getZrender().on('click', (e) => {
					if (e.target) {
						// console.log(e.target.info, 11);
						const { isCollapse, info } = e.target;
						if (isCollapse) {
							this.handleOption(info);
						}
					}
				});
			} else {
				const data = name || '债务人不存在股权穿透图';
				this.setState({ loading: false });
				this.myChart.hideLoading();
				const source = this.initOption({ name: data });
				this.resultSource = source;
				this.myChart.setOption(optionMethods(source));
				this.myZrender();
			}
		})
			.catch(() => {
				this.setState({ loading: false });
			});
	}

	// 根据公司经营状态更改颜色
	applyStatus =(val, num) => {
		if (num === 1) {
			if (val) {
				if (val.match(/(存续|在业)/)) return { color: '#93d6b5' };
				if (val.match(/(迁出|其他)/)) return { color: '#feb781' };
				if (val.match(/(撤销|吊销|清算|停业|注销)/)) return { color: '#ff9293' };
			}
		}
		if (num === 2) {
			if (val) {
				if (val.match(/(存续|在业)/)) return { strokeColor: '#93d6b5', color: '#f4fffa' };
				if (val.match(/(迁出|其他)/)) return { strokeColor: '#feb781', color: '#fef9f3' };
				if (val.match(/(撤销|吊销|清算|停业|注销)/)) return { strokeColor: '#ff9293', color: '#fff4f3' };
			}
		}
		return {};
	};


	// 树图初始化配置 第一次绘图内容
	initOption=(params) => {
		const { holderList, investorList } = params;

		return [
			{
				name: toEmpty(params.name),
				symbolSize: [60 + params.name.length * 18, 40],
				symbol: 'rectangle',
				children: this.toAddArrowData(holderList, 'holder'),
			},
			{
				name: params.name,
				symbolSize: [60 + params.name.length * 18, 40],
				symbol: 'rectangle',
				children: this.toAddArrowData(investorList, 'investor'),
			},
		];
	};

	// 箭头 children
	toAddArrowData =(source, type) => {
		if ((source || []).length) {
			const sourceType = type === 'holder' ? 'holderList' : 'investorList';
			const iconStatus = (statusItem) => {
				if (statusItem.hasNode) {
					// console.log(statusItem);
					if ((statusItem[sourceType] || []).length) return 'del';
					return 'add';
				}
				return '';
			};
			// 根据公司名字长度/个人设置框大小
			const resetSize = (item) => {
				if (item.type === 1) {
					return [164, 60];
				}
				/* if (item.name.length > 7) {
					return [50 + item.name.length * 18, 60];
				} */
				return [210, 60];
			};

			return source.map(item => ({
				name: item.percent,
				symbol: 'arrow',
				symbolSize: 1,
				isArrow: true,
				itemStyle: {
					normal: {
						color: 'transparent',
						label: {
							position: 'right',
							lineHeight: 1,
							textStyle: {
								color: '#128aed',
							},
						},
					},
				},
				children: [{
					symbol: 'rectangle',
					// eslint-disable-next-line no-nested-ternary
					symbolSize: resetSize(item),
					iconStatus: iconStatus(item),
					username: item.name,
					setStatus: true,
					percent: item.percent,
					isElement: true,
					dataType: type,
					treeName: type,
					type: item.type,
					id: item.id,
					hasNode: item.hasNode,
					amount: item.amount,
					companyStatus: item.companyStatus,
					itemStyle: item.type === 1 ? { ...style.forStyle.person } : { ...style.forStyle.company },
					children: item.hasNode ? this.toAddArrowData(item[sourceType], type) : [],
				}],
			}));
		}
		return [];
	};

	toGetIdItem=(eleId, type) => {
		const baseSource = type === 'holder' ? this.resultSource[0].children : this.resultSource[1].children;
		let result = '';
		const resetItem = (id, array) => {
			const _length = (array || []).length || 0;
			if (_length) {
				for (let i = 0; i < _length; i += 1) {
					if (array[i].id === id) result = array[i];
					if (array[i].isArrow || array[i].children) resetItem(id, array[i].children);
				}
			}
		};
		resetItem(eleId, baseSource);
		return result;
	};

	// 处理点击后数据
	handleOption=(params) => {
		const { id, iconStatus, treeName } = params;
		const { isBusiness } = this.props;
		let idItem = this.toGetIdItem(id, treeName);
		// console.log(idItem);
		if (typeof idItem === 'object') {
			if (iconStatus === 'del') {
				idItem = Object.assign(idItem, {
					iconStatus: 'add',
					backup: idItem.children,
					children: [],
				});
			} else if (idItem.hasNode) {
				if (idItem.backup) {
					idItem.iconStatus = 'del';
					idItem.children = idItem.backup;
					idItem.backup = [];
				} else {
					const api = isBusiness ? businessStockChart : stockChart;
					api({ id, companyId: id })
						.then((res) => {
							if (res.code === 200) {
								if (treeName === 'investor') {
									idItem.children = this.toAddArrowData(res.data.investorList, treeName);
								}
								if (treeName === 'holder') {
									idItem.children = this.toAddArrowData(res.data.holderList, treeName);
								}

								idItem.iconStatus = 'del';

								// 当请求到数据后再次渲染图形
								this.myChart.clear();
								this.myChart.setOption(optionMethods(this.resultSource));
								this.myZrender();
							}
						})
						.catch(() => {});
				}
			}
		}

		this.myChart.clear();
		this.myChart.setOption(optionMethods(this.resultSource));
		this.myZrender();
		return true;
	};

	// zrender渲染
	myZrender=() => {
		const {
			Text, ImageShape, Rectangle, Polygon, Circle,
		} = window.zrDefine;
		window.b = this.myChart;
		const myZr = this.myChart.getZrender();
		const shapeList = myZr.storage.getShapeList();
		const toGetArrow = (x, y, size = 15) => {
			const shape = new Polygon({
				style: {
					pointList: [[x, y], [x + size / 2, y + size * 1.2 * 0.3], [x + size, y], [x + size / 2, y + size * 1.2]],
					color: '#128aed',
				},
				zlevel: 1,
			});
			return Object.assign(shape, style.zLevel);
		};

		// 背景水印
		for (let t = 0; t < myZr.getWidth() + 100; t += 308) {
			for (let j = 0; j < this.myChart.getZrender().getHeight() + 100; j += 208) {
				const shapeSy = new ImageShape({
					style: {
						image: back,
						x: t,
						y: j,
						width: 308,
						height: 208,
						// opacity: 0.1,
					},
				});
				shapeSy.hoverable = false;
				shapeSy.ndelete = true;
				this.myChart.getZrender().addShape(shapeSy);
			}
		}
		for (let i = 0; i < shapeList.length; i += 1) {
			const myChartData = shapeList[i]._echartsData;
			const locationX = shapeList[i].rotation[1];
			const locationY = shapeList[i].rotation[2];
			if (myChartData) {
				const {
					username, type, amount, isArrow, hasNode, id, dataType, iconStatus, treeName, companyStatus,
				} = myChartData._data;

				// 金额字段长度
				// if (amount && username) {
				// const setLength = Math.max(username.length, amount.length);
				// console.log(username.length, amount, 'am.len', amount.length);
				// }
				// 公司名字 经营状态 else 个人name
				if (type === 2) {
					const shapeCompany = new Text({
						style: {
							x: locationX - 20,
							y: locationY - 5,
							text: toEmpty(username).length > 10
								? toEmpty(username).replace(/(.{10})(?=.)/g, '$1\n')
								: toEmpty(username),
							...style.font,
						},
					});
					myZr.addShape(Object.assign(shapeCompany, style.zLevel));
					const ecStatus = toEmpty(companyStatus);
					// 公司状态边框
					const shapeRect2 = new Rectangle({
						style: {
							x: username.length > 7 ? locationX + 60 : locationX + 50,
							y: locationY - 17,
							width: 38,
							height: 18,
							color: this.applyStatus(ecStatus, 2).strokeColor,
						},
					});
					myZr.addShape(Object.assign(shapeRect2, style.zLevel));
					// 公司状态背景
					const shapeRect = new Rectangle({
						style: {
							x: username.length > 7 ? locationX + 61 : locationX + 51,
							y: locationY - 16,
							width: 36,
							height: 16,
							color: this.applyStatus(ecStatus, 2).color,
						},
					});
					myZr.addShape(Object.assign(shapeRect, style.zLevel));
					// 公司状态文字
					const shapeStatus = new Text({
						style: {
							text: ecStatus,
							x: username.length > 7 ? locationX + 66 : locationX + 56,
							y: locationY - 7,
							color: this.applyStatus(ecStatus, 1).color,
							textFont: 'bold 11px verdana',
						},
					});
					myZr.addShape(Object.assign(shapeStatus, style.zLevel));
				} else {
					const shapeName = new Text({
						style: {
							x: locationX,
							y: toEmpty(amount).length > 10 ? locationY - 12 : locationY - 5,
							text: toEmpty(username),
							...style.font,
						},
					});
					myZr.addShape(Object.assign(shapeName, style.zLevel));
				}
				// 认缴金额
				if (amount) {
					const shapeAmount = new Text({
						style: {
							x: locationX,
							y: toEmpty(amount).length > 10 && type === 1 ? locationY + 16 : locationY + 20,
							text: toEmpty(amount).length > 10 && type === 1
								? `认缴金额：${toEmpty(amount).replace(/(.{10})(?=.)/g, '$1\n')}`
								: `认缴金额：${toEmpty(amount)}`,
							...style.font_amount,
						},
					});
					myZr.addShape(Object.assign(shapeAmount, style.zLevel));
				}

				// 箭头 百分比
				// console.log(isArrow)
				if (isArrow) {
					myZr.addShape(toGetArrow(locationX - 7, locationY - 11, 15));
				}
				// + - 按钮
				if (hasNode) {
					// 圆
					const shapeCircle = new Circle({
						style: {
							x: locationX,
							y: treeName === 'investor' ? locationY + 40 : locationY - 40,
							r: 9,
							color: '#128aed',
							text: iconStatus === 'add' ? '+' : '-',
							textColor: 'white',
							textFont: iconStatus === 'add' ? 'bold 20px verdana' : 'bold 24px verdana',
							textPosition: 'inside',
						},
					});
					shapeCircle.info = {
						hasNode, id, dataType, iconStatus, treeName,
					};
					shapeCircle.zlevel = 1;
					shapeCircle.z = 5;
					shapeCircle.ndelete = true;
					shapeCircle.hoverable = false;
					shapeCircle.isCollapse = true;
					shapeCircle.clickable = true;
					myZr.addShape(shapeCircle);
				}
			}
		}
	};

	onChartReadyCallback=() => {
		console.log('onChartReadyCallback');
	};

	render() {
		const { loading } = this.state;
		return (
			<Spin visible={loading}>
				<div id="zRenderEcharts" style={{ width: 1158, height: 504 }} />
			</Spin>
		);
	}
}
