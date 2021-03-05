import React from 'react';
import { Icon } from 'antd';
import { linkDom } from '@/utils';
import './index.scss';
import { Ellipsis } from '@/common';

export default class InfoItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'none',
			//	none canOpen canClose
		};
	}

	componentDidMount() {
		setTimeout(() => {
			if (this.dom && this.dom.clientHeight > 64) {
				this.setState({ status: 'canOpen' });
			}
		});
	}


	componentDidUpdate(prevProps) {
		const { row: { id } } = this.props;
		const _id = prevProps.row.id;
		if (id !== _id) {
			this.toInitStatus();
		}
	}

	toInitStatus=() => {
		if (this.dom && this.dom.clientHeight > 64) {
			this.setState({ status: 'canOpen' });
		} else {
			this.setState({ status: 'none' });
		}
	};

	render() {
		const { content, row } = this.props;
		const { status } = this.state;
		return (
			<div>
				{
					row.dataType === 1 ? (
						<div className="assets-matching-reason-wrapper">
							<div className={`reason-content-wrapper content-${status}`}>
								<div className="reason-content" ref={e => this.dom = e}>
									<div className="reason-list">
										{
											row.url !== '' && row.sourceId !== 10760 ? (
												<span>
													{/* {linkDom(row.url, content || row.address, '_blank', '', '', '')} */}
													<Ellipsis url={row.url} content={content || row.address} isSourceLink />
												</span>
											)
												: (
													<span>
														{content || row.address || '-'}
													</span>
												)
										}

									</div>
								</div>
							</div>
							<div className={`reason-action reason-action-${status}`}>
								{
								status === 'canOpen' ? (
									<React.Fragment>
										<li className="action-ellipsis yc-text-normal">
											<Icon type="ellipsis" />
										</li>
										<li className="action-btn yc-text-normal under-line" onClick={() => this.setState({ status: 'canClose' })}>
											<span>展开</span>
											<Icon type="down" />
										</li>
									</React.Fragment>
								) : (
									<li className="action-btn yc-text-normal under-line" onClick={() => this.setState({ status: 'canOpen' })}>
										<span>收起</span>
										<Icon type="up" />
									</li>
								)
							}
							</div>
						</div>
					) : null
				}
				{
					row.dataType === 2 ? (
						<div className="assets-matching-reason-wrapper">
							{
								row.title ? (
									<span>
										<span>详见正文：</span>
										{/* urlType是为了区分查解封模块和其他模块， 其他模块跳转到文书详情页没参数 */}
										{
										 linkDom(`#/judgement?urlType=seizedUnblock&sourceId=${row.sourceId}&pid=${row.pid}&title=${row.title}`, row.title, '_blank', '', '', '')
										}
									</span>
								) : '-'
							}
						</div>
					) : null
				}
			</div>
		);
	}
}
