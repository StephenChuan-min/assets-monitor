import React, { PureComponent } from 'react';
import './style.scss';

class sevenUpdate extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			checkType: 0,
		};
	}


	handleClick = (index) => {
		const { getDynamicType } = this.props;
		if (getDynamicType) { getDynamicType(index); }
		this.setState(() => ({
			checkType: index,
		}));
	};

	render() {
		const { checkType } = this.state;
		const { assetTotalNum, riskTotalNum } = this.props;
		const checkArray = [
			{ name: '资产挖掘', type: 1, num: assetTotalNum || 0 },
			{ name: '风险参考', type: 2, num: riskTotalNum || 0 },
		];
		return (
			<div className="dynamic-checked">
				{
					checkArray.map((item, index) => (
						<div
							key={item.type}
							onClick={() => this.handleClick(index)}
							className={`dynamic-checked-type ${checkType === index ? 'dynamic-checked-active' : 'dynamic-checked-unActive'}`}
						>
							{item.name}
							{item.num !== 0 && (
								<span className="dynamic-checked-type-num">
									+
									{item.num}
								</span>
							)}
							{checkType === index ? <div className="dynamic-checked-active-line" /> : ''}
						</div>
					))
				}
				<div className="dynamic-checked-line" />
			</div>
		);
	}
}

export default sevenUpdate;
