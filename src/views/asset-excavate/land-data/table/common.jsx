import React from 'react';
import { formatDateTime } from '@/utils/changeTime';
import { Ellipsis } from '@/common';

const Result = {
	InfoProject: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content yc-space-nowrap">
				<li>
					<span className="list list-title align-justify">项目名称：</span>
					<span className="list list-content" style={{ color: '#186fc7' }}>
						<Ellipsis content={rowContent.projectName} url={rowContent.url} tooltip width={200} isSourceLink />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">行政区划：</span>
					<span className="list list-content">
						<Ellipsis content={rowContent.administrativeRegion || '-'} tooltip width={200} />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">具体坐落：</span>
					<span className="list list-content">
						<Ellipsis content={rowContent.landAddress} tooltip width={200} />
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoLand: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">土地用途：</span>
					<span className="list list-content text-ellipsis">
						<Ellipsis content={rowContent.landUse || '-'} tooltip width={90} />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">面　　积：</span>
					<span className="list list-content">
						{rowContent.landArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">使用年限：</span>
					{rowContent.transferTerm ? (
						<span className="list list-content">
							<Ellipsis content={rowContent.transferTerm ? `${rowContent.transferTerm}` : '-'} tooltip width={90} />
						</span>
					) : (
						<span className="list list-content">
							<Ellipsis content={rowContent.landUsageTerm ? `${rowContent.landUsageTerm}` : '-'} tooltip width={90} />
						</span>
					)}
				</li>
			</div>
		</React.Fragment>
	),
	InfoTransfer: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">供地方式：</span>
					<span className="list list-content text-ellipsis">{rowContent.supplyWay || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">批准单位：</span>
					<span className="list list-content">
						<Ellipsis content={rowContent.approver || '-'} tooltip width={170} />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">成交价格：</span>
					<span className="list list-content">
						{rowContent.finalPrice ? `${rowContent.finalPrice} 万元` : '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoTransferProject: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content yc-space-nowrap">
				<li>
					<span className="list list-title align-justify">宗地坐落：</span>
					<span className="list list-content text-ellipsis">
						<Ellipsis content={rowContent.landAddress || '-'} url={rowContent.url} tooltip width={130} isSourceLink />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">行政区划：</span>
					<span className="list list-content text-ellipsis">
						<Ellipsis content={rowContent.administrativeRegion || '-'} tooltip width={130} />
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	transferInfo: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-title align-justify">转让方式：</span>
					<span className="list list-content text-ellipsis">{rowContent.transferMode || '-'}</span>
				</li>
				<li>
					<span className="list list-title align-justify">转让价格：</span>
					<span className="list list-content">
						{rowContent.transferPrice ? `${rowContent.transferPrice} 万元` : '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoMortgageLand: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content  yc-space-nowrap">
				<li>
					<span className="list list-title align-justify">土地用途：</span>
					<span className="list list-content text-ellipsis">
						<Ellipsis content={rowContent.landUse || '-'} tooltip width={110} />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">面　　积：</span>
					<span className="list list-content">
						{rowContent.landArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">评估金额：</span>
					<span className="list list-content">
						{rowContent.consultPrice ? `${rowContent.consultPrice} 万元` : '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>土地使用权证号：</span>
					<span className="list list-content">
						<Ellipsis content={rowContent.landUseCertificateNumber || '-'} tooltip width={100} />
					</span>
				</li>
			</div>
		</React.Fragment>
	),
	InfoMortgage: (text, rowContent) => (
		<React.Fragment>
			<div className="assets-info-content yc-space-nowrap">
				<li>
					<span className="list list-title align-justify">抵押面积：</span>
					<span className="list list-content">
						{rowContent.mortgageArea || '-'}
						公顷
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">抵押金额：</span>
					<span className="list list-content">
						{rowContent.mortgageAmount ? `${rowContent.mortgageAmount} 万元` : '-'}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>土地他项权证号：</span>
					<span className="list list-content">
						<Ellipsis content={rowContent.otherObligeeCertificateNumber || '-'} tooltip width={100} />
					</span>
				</li>
				<li>
					<span className="list list-title align-justify" style={{ width: 96 }}>登记结束日期：</span>
					<span className="list list-content">
						{`${formatDateTime(rowContent.endTime, 'onlyYear')}` || '-'}
					</span>
				</li>
			</div>
		</React.Fragment>
	),
};
const Transfer = {
	AssetsInfo: (text, rowContent) => <div>{text || rowContent}</div>,
};


export { Result, Transfer };
