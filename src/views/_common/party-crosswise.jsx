import React from 'react';
import { Tooltip } from 'antd';
import { getByteLength, timeStandard } from '@/utils';
import { Ellipsis } from '@/common';

const maxShowLength = 1;

/**
 * @Description: 当事人组件
 * @author async
 * @date 2019-10-08
 */
export default class PartyInfoDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: props.child.length <= maxShowLength ? 'none' : 'toOpen',
		//	none 无  toOpen 点击展开 toClose 点击收起
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		const _nextState = nextState;
		const { id, items } = this.props;
		const { status } = this.state;
		if (nextProps.id !== id || JSON.stringify(items) !== JSON.stringify(nextProps.items)) {
			_nextState.status = nextProps.child.length <= maxShowLength ? 'none' : 'toOpen';
			return true;
		}
		return nextState.status !== status;
	}

	handleToChange=() => {
		const { status } = this.state;
		if (status === 'toOpen') this.setState({ status: 'toClose' });
		if (status === 'toClose') this.setState({ status: 'toOpen' });
	};

	/* 处理当事人名称 */
	toHandleName=(item) => {
		const {
			birthday, certificateNumber, gender, name,
		} = item;
		if (certificateNumber) return `${name}（${certificateNumber}）`;
		if (birthday || gender) {
			const res = [];
			if (gender && gender === 1)res.push('男');
			else if (gender && gender === 2)res.push('女');
			if (birthday)res.push(timeStandard(birthday));
			return `${name}（${res.join(' ')}）`;
		}
		return name;
	};

	render() {
		const { status } = this.state;
		const { role, child, linkDetail } = this.props;
		const source = status === 'toOpen' ? child.slice(0, maxShowLength) : child;

		const roleWidth = getByteLength(role) * 6 < 48 ? 48 : (getByteLength(role) * 6);
		const maxWidth = 270 - (roleWidth > 100 ? 100 : roleWidth) - 40;
		return (
			<div className="yc-party-info-list yc-party-info-crosswise">
				<span className="party-info party-info-title" style={{ maxWidth: 100, minWidth: 48 }}>
					<Tooltip placement="top" title={role}>
						<li className="text-ellipsis li-role">{role}</li>
					</Tooltip>
				</span>
				<span className="party-info party-info-colon">：</span>
				<div className="party-info party-info-content">
					{
						source.map((i) => {
							const content = this.toHandleName(i);
							if (linkDetail) {
								return (
									<Ellipsis
										content={content}
										width={maxWidth}
										className="yc-line-height-16"
										url={i.obligorId ? `#/business/debtor/detail?id=${i.obligorId}` : ''}
										tooltip
									/>
								);
							}
							return getByteLength(content) * 6 >= maxWidth ? (
								<Tooltip placement="top" title={content}>
									<li className="text-ellipsis" style={{ maxWidth }}>{content}</li>
								</Tooltip>
							) : (
								<li className="text-ellipsis" style={{ maxWidth }}>{content}</li>
							);
						})
					}
					{ status !== 'none' && <div className="party-info-status-wait">等</div> }
				</div>
			</div>
		);
	}
}
