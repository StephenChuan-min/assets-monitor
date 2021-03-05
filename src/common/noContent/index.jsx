import React from 'react';
// import rsaEncrypt from '@/utils/encryp';
// import { Button } from '@/components';
import noData from '@/assets/img/home/img_blank_nodata.png';
import './style.scss';


class noContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const { font, style } = this.props;
		return (
			<div style={style} className="yc-no-noContent">
				<img src={noData} alt="" />
				<span>
					{font || '暂无数据'}
				</span>
			</div>
		);
	}
}

export default noContent;
