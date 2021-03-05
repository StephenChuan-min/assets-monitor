import React from 'react';
// import ReactECharts from 'echarts-for-react';
import './style.scss';

const getOption = (Data, id, title, newColumnArray) => ({
	tooltip: {
		trigger: 'item',
		formatter(params) {
			const dataArray = params.series.data.slice().reverse();
			let res = '';
			for (let i = 0; i < dataArray.length; i += 1) {
				res += `${dataArray[i].name}：${
					dataArray[i].value} 条<br/>`;
			}
			return res;
		},
	},
	grid: { // 绘图区调整
		height: newColumnArray.length * 35,
		x: 20, // 左留白
		y: 5, // 上留白
		x2: 10, // 右留白
		y2: 20, // 下留白
		borderWidth: '0',
	},
	xAxis: [
		{
			show: false,
			type: 'value',
			position: 'top',
		},
	],

	yAxis: [
		{
			type: 'category',
			show: false,
			data: newColumnArray,
		},
	],

	series: [
		{
			name: title,
			type: 'bar',
			stack: '总数',
			data: newColumnArray,
			barMinHeight: 220,
			itemStyle: {
				normal: {
					color: '#73AEEA',
					label: {
						show: false,
						position: 'inside',
					},
				}, // 柱状图颜色
			},
		},
	],
});

class ColumnarEcharts extends React.Component {
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

	toDrawEcharts=() => {
		const { Data, id, title } = this.props;
		// 添加需要的字段名称
		const newColumnArray = [];
		if (Data) {
			Data.filter(item => item.count > 0)
				.map(item => newColumnArray.push(
					Object.assign({}, item, { name: item.typeName || item.type, value: item.count }),
				));
		}
		const DOM = document.getElementById(`${id}ColumnarEcharts`);
		const myChart = window.echarts.init(DOM);

		const option = getOption(Data, id, title, newColumnArray);
		const { series: { 0: { data: dataList } } } = option;
		// const { Text } = window.zrDefine;
		window.myChart = myChart;
		const base = {
			x: 20,
			y: 14,
		};
		const newDataList = dataList.slice().reverse();
		const list = [];
		newDataList.forEach((item, index) => {
			const { x } = base;
			const y = base.y + 35 * (index);
			const typeName = item.typeName && item.typeName.length > 10 ? `${item.typeName.substr(0, 10)}...` : `${item.typeName}`;
			const type = item.type && item.type.length > 10 ? `${item.type.substr(0, 10)}...` : `${item.type}`;

			list.push(<span style={{ left: x + 10, top: y }} className="yc-p-span">{typeName !== 'undefined' ? typeName : type}</span>);
			list.push(<span style={{ left: x + 180, top: y, textAlign: 'left' }} className="yc-p-span">{`${item.count} 条`}</span>);
		});
		// window[`${id}ColumnarEcharts`] = myChart;
		this.setState({
			list,
		});
		myChart.setOption(getOption(Data, id, title, newColumnArray));
	};

	render() {
		const { title, id, Data } = this.props;
		const { list } = this.state;
		const newArray = [];
		if (Data) {
			Data.filter(item => item.count > 0)
				.map(item => newArray.push(
					Object.assign({}, item, { name: item.typeName || item.type, value: item.count }),
				));
		}

		return (
			<div>
				<div className="yc-columnar-title">{title}</div>
				<div className="yc-position">
					{list}
					<div className="yc-columnar-echarts" style={{ width: 532, height: (newArray.length === 1 ? 50 : newArray.length * 37) || 50 }} id={`${id}ColumnarEcharts`} />
				</div>
			</div>
		);
	}
}

export default ColumnarEcharts;
