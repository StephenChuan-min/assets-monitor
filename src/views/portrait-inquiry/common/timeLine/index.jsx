import React from 'react';
import getCount from '../getCount';
import './style.scss';


class RingEcharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newArray: [],
		};
	}

	componentDidMount() {
		const { Data } = this.props;
		this.newArrayFun(Data);
	}

	componentWillReceiveProps(nextProps) {
		const { Data } = this.props;
		if (Data !== nextProps.Data) {
			this.newArrayFun(nextProps.Data);
		}
	}

	newArrayFun = (Data) => {
		if (Data && Data.length <= 5) {
			const newData = [...Data];
			const newDataArray = newData.sort((a, b) => a.year - b.year);
			const newArray = [];
			if (newDataArray) {
				newDataArray.map(item => newArray.push(
					Object.assign({}, item, { count: item.count, year: (item.year === 0 || item.year === null) ? '未知' : `${item.year} 年` }),
				));
			}

			this.setState({
				newArray,
			});
			return newArray;
		}
		const newData = [...Data];
		const num = getCount(Data.sort((a, b) => b.year - a.year).slice(5));
		const newDataArray = newData.sort((a, b) => b.year - a.year).slice(0, 5).reverse();
		const newYearName = `${newDataArray[0].year} 年及以前`;
		const newArray = [];
		if (newDataArray) {
			newDataArray.map(item => newArray.push(
				Object.assign({}, item, { count: item.count, year: (item.year === 0 || item.year === null) ? '未知' : `${item.year} 年` }),
			));
		}
		newArray[0].count += num;
		newArray[0].year = newYearName;
		this.setState({
			newArray,
		});
		return newArray;
	};

	render() {
		const { title, Data } = this.props;
		const { newArray } = this.state;
		return (
			<div>
				<div className="yc-timeline-title">{title}</div>
				<ul className="yc-timeline">
					{
						Data && newArray.length > 0 && newArray.map(item => (
							<li className="yc-li-complete">
								<div className="yc-timestamp">
									<span className="num">
										{`${item.count} 条`}
									</span>
								</div>
								<div className="yc-dotted-line" />
								<div className="status">
									<h4 style={{ fontSize: 12 }}>
										{`${item.year}`}
									</h4>
								</div>
							</li>
						))
                    }
				</ul>
			</div>
		);
	}
}

export default RingEcharts;
