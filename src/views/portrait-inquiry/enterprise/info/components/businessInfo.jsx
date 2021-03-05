import React from 'react';
import { Spin } from '@/common';
import { parseQuery } from '@/utils';
import { getBaseInfo } from '@/utils/api/portrait-inquiry/enterprise/info';
import './style.scss';

export default class BusinessInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			dataObj: {},
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		this.getBaseInfoData(params);
	}

	getBaseInfoData = (value) => {
		this.setState({
			loading: true,
		});
		const params = {
			...value,
			companyId: value.id,
		};
		getBaseInfo(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						loading: false,
						dataObj: res.data,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	toGetValue =(field) => {
		const { dataObj } = this.state;
		const w = f => ((dataObj || {})[f] || '').trim();
		if (typeof field === 'string') return w(field) || '-';
		if (typeof field === 'object') {
			return w(field[0]) && w(field[1]) ? `自 ${w(field[0])} 至 ${w(field[1])}` : '-';
		}
		return '-';
	};

	render() {
		const { id } = this.props;
		const { loading } = this.state;
		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">基本信息</div>
				</div>
				<div className="yc-base-content">
					<Spin visible={loading}>
						<table>
							<tr>
								<td>法定代表人</td>
								<td>{this.toGetValue('legalPerson')}</td>
								<td>组织机构代码</td>
								<td>{this.toGetValue('orgNumber')}</td>
							</tr>
							<tr>
								<td>统一社会信用代码</td>
								<td>{this.toGetValue('creditCode')}</td>
								<td>纳税人识别号</td>
								<td>{this.toGetValue('taxNumber')}</td>
							</tr>
							<tr>
								<td>成立日期</td>
								<td>{this.toGetValue('establishTime')}</td>
								<td>营业期限</td>
								<td>{this.toGetValue(['fromTime', 'toTime'])}</td>
							</tr>
							<tr>
								<td>注册资本</td>
								<td>{this.toGetValue('regCapital')}</td>
								<td>实缴资本</td>
								<td>{this.toGetValue('actualCapital')}</td>
							</tr>
							<tr>
								<td>经营状态</td>
								<td>{this.toGetValue('regStatus')}</td>
								<td>登记机关</td>
								<td>{this.toGetValue('regInstitute')}</td>
							</tr>
							<tr>
								<td>企业类型</td>
								<td>{this.toGetValue('companyOrgType')}</td>
								<td>核准日期</td>
								<td>{this.toGetValue('approvedTime')}</td>
							</tr>
							<tr>
								<td>所属行业</td>
								<td>{this.toGetValue('industry')}</td>
								<td>工商注册号</td>
								<td>{this.toGetValue('regNumber')}</td>
							</tr>
							<tr>
								<td>人员规模</td>
								<td>{this.toGetValue('scale')}</td>
								<td>参保人数</td>
								<td>{this.toGetValue('insuranceNum')}</td>
							</tr>
							<tr>
								<td>英文名</td>
								<td>{this.toGetValue('englishName')}</td>
								<td>注册地址</td>
								<td>{this.toGetValue('regLocation')}</td>
							</tr>
							<tr>
								<td>经营范围</td>
								<td colSpan={3}>{this.toGetValue('businessScope')}</td>
							</tr>
						</table>
					</Spin>
				</div>
			</div>
		);
	}
}
