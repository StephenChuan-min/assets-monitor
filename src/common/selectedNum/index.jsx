import React from 'react';
import selectedImg from '../../assets/img/icon/selectedNum.png';

class selectedNum extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	render() {
		const { num, style } = this.props;

		return (
			<div style={style || { marginBottom: 16, position: 'absolute', top: -40 }}>
				<img
					style={{
						height: 14, width: 14, position: 'relative', top: 3,
					}}
					src={selectedImg}
					alt=""
				/>
				<span style={{ fontSize: '12px', color: '#4e5566', marginLeft: 6 }}>
					已选中
					{' '}
					<span style={{ fontSize: '12px', fontWeight: 'bold' }}>{num}</span>
					{' '}
					条数据
				</span>
			</div>
		);
	}
}

export default selectedNum;
