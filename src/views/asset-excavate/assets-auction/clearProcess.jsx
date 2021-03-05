import React from 'react';
import { BreadCrumb } from '@/common';
import clearProcess from '../../../assets/img/img_flowchart.png';
import './style.scss';

export default class BasicTable extends React.Component {
	constructor(props) {
		super(props);
		document.title = '资产清收流程-监控信息';
		this.state = {};
	}

	render() {
		return (
			<div className="yc-operate-log">
				<BreadCrumb
					line
					list={[
						{ id: 1, name: '信息监控', link: '/info/monitor' },
						{ id: 2, name: '资产挖掘', link: '/info/monitor/excavate' },
						{ id: 3, name: '资产拍卖', link: '/monitor?process=-1' },
						{ id: 4, name: '资产清收流程' },
					]}
				/>
				<div className="yc-module">
					<div className="yc-module-title">资产清收流程图</div>
					<div className="img-wrapper">
						<img src={clearProcess} alt="清收图" style={{ width: '1000px', height: '740px', margin: '0 auto' }} />
					</div>
					<div className="yc-recovery-text">
						<div className="yc-recovery-title">如何确认是否有余值</div>
						<p>
							鉴于通过法院参与分配前提是已通过司法确认债权，即债权人已起诉或准备起诉，故确认方法默认为可通过案件受理通知书等材料向相关权利机关申请查询相应资料：
						</p>
						<p>
							{'1.对于发现资产处置信息的，若未成交的，首先需要结合资产处置的预期价格（可在信息搜索 > 资产拍卖项下查询同类标的的处置价格），确认资产可处置款项；'}
						</p>
						<p>
							2.需要确认拍卖标的的抵质押情况，可通过向当地的不动产登记（房地产）、工商（股权质押）、车管所等部门查询确认抵质押情况；若明确存在未抵押资产，或处置中有无证资产处置地，可直接判定为有余值可供参与分配；
						</p>
						<p>
							3.若为银行等金融机构的，可结合人行信息，或者对应的判决书，来确认对应抵质押项下的提款情况，结合逾期时间，推测有限债权金额；
						</p>
						<p>
							综上判定，若抵押物处置/预计处置价格高于抵质押价格（考虑适当的诉讼费用及利息）的，则推定存在余值可供参与分配。
						</p>
					</div>
					<div className="yc-recovery-text">
						<div className="yc-recovery-title">如何向法院申请参与分配</div>
						<p>
							1.各债权人需向自身起诉法院（具体联系案件执行法官）申请参与分配，需递交参与分配申请书；
						</p>
						<p>
							2.由债权人起诉法院的执行法院与资产处置法院对应法官联系，并将参与分配申请转交给资产处置法院；
						</p>
						<p>
							3.后续等待法院确认债权及分配金额，如有必要，将要求债权人前往资产处置法院签署确认分配方案。
						</p>
					</div>
					<div className="yc-recovery-text">
						<div className="yc-recovery-title">特别提醒</div>
						<p>
							鉴于资产处置价格存在不确定性，涉及的抵押登记债务有可能已部分清偿，对于难以判断是否有余值的，建议您及时向法院递交申请参与分配的函，以确保维护您的权益。
						</p>
					</div>
				</div>
			</div>
		);
	}
}
