import React from 'react';
import './style.scss';

const getOption = (Data, id, title, newRingArray, customColorArray) => ({
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)',
	},
	color: customColorArray || ['#45A1FF', '#4DCAC9', '#59C874', '#FCD44A', '#F2657A', '#965EE3'],
	legend: {
		selectedMode: false, // 取消图例上的点击事件
		orient: 'vertical',
		// 水平对齐方式，可设置为'left','center','right',number(px)
		x: '300px',
		// 垂直对齐方式，可设置为'top','center','bottom',number(px)
		y: 'center',
		itemGap: 5,
		// 距顶部的距离，其他同理
		zlevel: 3,
		data: newRingArray,
		formatter: (name) => {
			let res = '';
			for (let i = 0; i < newRingArray.length; i += 1) {
				if (newRingArray[i].name === name) {
					res = newRingArray[i].count;
				}
			}
			const arr = [
				`${name}  `,
				`${res} 条`,
			];
			return arr.join('');
		},
	},
	series: [
		{
			name: title,
			type: 'pie',
			radius: ['45%', '70%'],
			center: ['15%', '50%'],
			label: {
				normal: {
					formatter: '{b}\n  {c}',
				},
			},
			itemStyle: {
				normal: {
					label: {
						show: false,
					},
					labelLine: {
						show: false,
					},
				},
				emphasis: {
					label: {
						show: true,
						position: 'center',
						textStyle: {
							fontSize: '14',
							fontWeight: 'bold',
						},
					},
				},
			},
			data: newRingArray,
		},
	],
});

class RingEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.toDrawEcharts();
	}


	componentDidUpdate(prevProps) {
		const { Data } = this.props;
		if (prevProps.Data !== Data) {
			this.toDrawEcharts();
		}
	}

	toDrawEcharts =() => {
		const {
			Data, id, title, customColorArray,
		} = this.props;

		// 添加需要的字段名称
		const newRingArray = [];
		if (Data) {
			Data.filter(item => item.count > 0)
				.map(item => newRingArray.push(
					Object.assign({}, item, { name: item.typeName || item.type, value: item.count }),
				));
		}
		const DOM = document.getElementById(`${id}RingEcharts`);
		const myChart = window.echarts.init(DOM);
		const option = getOption(Data, id, title, newRingArray, customColorArray);
		const { color, series: { 0: { data: dataList } } } = option;
		if (!global.GLOBAL_MEIE_BROWSER) {
			delete option.legend;
			const { Text, Circle } = window.zrDefine;
			const zr = myChart.getZrender();
			const base = {
				x: 200,
				y: 50,
			};
			dataList.forEach((item, index) => {
				const x = base.x + (dataList.length === 4 ? (index > 1 ? 1 : 0) * 60 + (index > 1 ? 1 : 0) * 120 : (index > 2 ? 1 : 0) * 60 + (index > 2 ? 1 : 0) * 120);
				const y = base.y + (dataList.length === 4 ? 25 * (index > 1 ? index - 2 : index) : 25 * (index > 2 ? index - 3 : index));

				const shapeCircle = new Circle({
					style: {
						x,
						y,
						r: 2,
						brushType: 'both',
						color: color[index],
						strokeColor: color[index],
						lineWidth: 3,
					},
				});
				const text1 = new Text({
					style: {
						x: x + 10,
						y: y + 2,
						text: item.typeName || item.type,
						textFont: 'normal 12px verdana',
						textAlign: 'left',
						color: '#333',
					},
				});
				text1.hoverable = false;
				const text2 = new Text({
					style: {
						x: x + 110,
						y: y + 2,
						text: item.count,
						textFont: 'bold 12px Arial',
						textAlign: 'right',
						color: '#333',
					},
				});
				text2.hoverable = false;
				const text3 = new Text({
					style: {
						x: x + 130,
						y: y + 2,
						text: '条',
						textFont: 'normal 12px verdana',
						textAlign: 'right',
						color: '#333',
					},
				});
				text3.hoverable = false;
				zr.addShape(shapeCircle);
				zr.addShape(text1);
				zr.addShape(text2);
				zr.addShape(text3);
			});
		}

		myChart.setOption(option);
	};

	render() {
		const { id, title } = this.props;
		return (
			<div>
				<div className="yc-ring-title">{title}</div>
				<div className="yc-ring-echarts" style={{ width: 532, height: 150 }} id={`${id}RingEcharts`} />
			</div>
		);
	}
}

export default RingEcharts;
