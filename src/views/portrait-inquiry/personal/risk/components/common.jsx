import React from 'react';
import { Tooltip } from 'antd';
import associationLink from '@/views/_common/association-link';
import './style.scss';
// import { linkDom } from '@/utils';

const LawsuitsMonitor = {
	LawsuitsDetail: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<div
					onClick={() => {
						const w = window.open('about:blank');
						w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
					}}
					className="yc-table-text-link"
					style={{ marginBottom: 13 }}
				>
					{row.court}
				</div>
				<div style={{ marginBottom: 10 }}>
					<div className="yc-table-content">
						<span className="list list-title align-justify">判决日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{
							row.court && row.court.length > 16
								? (
									<Tooltip placement="topLeft" title={row.court}>
										<span>
											{`${row.court.substr(0, 16)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{row.court || '-'}
									</span>
								)
						}
						</span>
					</div>
					<div className="yc-table-line" />
					<div className="yc-table-content">
						<span className="list list-title align-justify">发布日期</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
					</div>
				</div>
				<div>
					<div className="yc-table-content">
						<span className="list list-title align-justify">原告</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{
								text && text.length > 16
									? (
										<Tooltip placement="topLeft" title={text}>
											<span>{`${text.substr(0, 16)}...`}</span>
										</Tooltip>
									)
									: <span>{text || '-'}</span>
							}
						</span>
					</div>
					<div className="yc-table-line" />
					<div className="yc-table-content">
						<span className="list list-title align-justify">被告</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
					</div>
				</div>
			</div>
		</React.Fragment>
	),
	LawsuitsTrialCourt: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li>
					<span className="list list-content">
						{/* {`${row.court}`} */}
						(2019) 浙0103民终1678号
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">审理法院</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">{associationLink(text, row, 'Court')}</span>
				</li>
			</div>
		</React.Fragment>
	),
};

const breakFaith = {
	breakFaithDetail: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<div
					onClick={() => {
						const w = window.open('about:blank');
						w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
					}}
					className="yc-table-text-link"
					style={{ marginBottom: 13 }}
				>
					{row.court}
				</div>
				<div style={{ marginBottom: 10 }}>
					<div className="yc-table-content">
						<span className="list list-title align-justify">失信被执行人行为具体情形</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{
							row.court && row.court.length > 16
								? (
									<Tooltip placement="topLeft" title={row.court}>
										<span>
											{`${row.court.substr(0, 16)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{row.court || '-'}
									</span>
								)
						}
						</span>
					</div>
				</div>
				<div style={{ marginBottom: 10 }}>
					<div className="yc-table-content" style={{ minWidth: 655 }}>
						<span className="list list-title align-justify">生效法律文书确定义务</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{
							row.court && row.court.length > 16
								? (
									<Tooltip placement="topLeft" title={row.court}>
										<span>
											{`${row.court.substr(0, 16)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{/* {row.court || '-'} */}
										一、被执行人欧家宝于本判决生效之日起十日内返还中被执行人欧家宝于本判决生效之日起十…
									</span>
								)
						}
						</span>
					</div>
					<div className="yc-table-line" />
					<div className="yc-table-content">
						<span className="list list-title align-justify">被执行人的履行情况</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">{row.court || '-'}</span>
					</div>
				</div>
			</div>
		</React.Fragment>
	),
	breakFaithTrialCourt: () => (
		<React.Fragment>
			<div className="assets-info-content">
				<li style={{ marginBottom: 10 }}>
					<span className="list list-title align-justify" />
					<span className="list list-title-colon" />
					<span className="list list-content" />
				</li>
				<li>
					<span className="list list-title align-justify">执行法院</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{/* {associationLink(text, row, 'Court')} */}
						2019-04-29
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">发布日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{/* {associationLink(text, row, 'Court')} */}
						2019-04-29
					</span>
				</li>
			</div>
		</React.Fragment>
	),
};

const TaxViolation = {
	taxViolationDetail: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<div
					onClick={() => {
						const w = window.open('about:blank');
						w.location.href = `#/business/debtor/detail?id=${row.obligorId}`;
					}}
					className="yc-table-text-link"
					style={{ marginBottom: 13 }}
				>
					{row.court}
				</div>
				<div style={{ marginBottom: 10 }}>
					<div className="yc-table-content">
						<span className="list list-title align-justify">违法事实</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							经天津市国家税务局稽查局检查，发现其在2012年05月02日至2015年01月31日期间，主要存在以下问题：对外虚开增值经天津市国家税务局稽查稽查...
							{/* {
							row.court && row.court.length > 16
								? (
									<Tooltip placement="topLeft" title={row.court}>
										<span>
											{`${row.court.substr(0, 16)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{row.court || '-'}
									</span>
								)
						} */}
						</span>
					</div>
				</div>
				<div style={{ marginBottom: 10 }}>
					<div className="yc-table-content">
						<span className="list list-title align-justify">处罚情况</span>
						<span className="list list-title-colon">:</span>
						<span className="list list-content">
							{
							row.court && row.court.length > 16
								? (
									<Tooltip placement="topLeft" title={row.court}>
										<span>
											{`${row.court.substr(0, 16)}...`}
										</span>
									</Tooltip>
								)
								: (
									<span>
										{/* {row.court || '-'} */}
										经天津市国家税务局稽查局检查，发现其在2012年05月02日至2015年01月31日期间，主要存在以下问题：对外虚开增值经天津市国家税务局稽查稽查...
									</span>
								)
						}
						</span>
					</div>
				</div>
			</div>
		</React.Fragment>
	),
	taxViolationTrialCourt: (text, row) => (
		<React.Fragment>
			<div className="assets-info-content">
				<li style={{ marginBottom: 10 }}>
					纳税人 天津市宁河县鹏飞棉花加工有限公司
				</li>
				<li style={{ marginBottom: 5 }}>
					<span className="list list-title align-justify">检查机关</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{associationLink(text, row, 'Court')}
					</span>
				</li>
				<li>
					<span className="list list-title align-justify">发布日期</span>
					<span className="list list-title-colon">:</span>
					<span className="list list-content">
						{/* {associationLink(text, row, 'Court')} */}
						2019-04-29
					</span>
				</li>
			</div>
		</React.Fragment>
	),
};
export { LawsuitsMonitor, breakFaith, TaxViolation };
