import React from 'react';
import { Tabs } from '@/common';
import { requestAll } from '@/utils/promise';
import APISource from '@/utils/api/monitor-info/intangible';
import { getUrlParams, reserUrl } from '@/views/asset-excavate/query-util';

export default class TabsIntact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			_source: props.source,
		};
	}

	// componentDidMount() {
	// 	const { source, sourceType } = this.props;
	// 	this.toRefreshCount(source, sourceType);
	// }

	toRefreshCount=(config, type) => {
		const { onRefresh } = this.props;
		const _source =	config;
		this.toGetUnReadCount(_source);
		config.forEach((i, index) => {
			if (i.id !== type) {
				console.log(i.id, this.isUrlParams(i.id));
				APISource(i.id, 'listCount')(this.isUrlParams(i.id)).then((res) => {
					if (res.code === 200) {
						_source[index].number = res.data;
						this.setState({ _source });
						if (onRefresh)onRefresh(_source);
					}
				});
			}
		});
	};

	isUrlParams=(val) => {
		const url = window.location.hash;
		if (url.indexOf('?') !== -1) {
			let dParams = {};
			if (val === 'YC020701') {
				dParams = getUrlParams(url, 'startGmtModified', 'endGmtModified');
			}
			if (val === 'YC020702') {
				dParams = getUrlParams(url, 'startGmtCreate', 'endGmtCreate');
			}
			if (val === 'YC020703') {
				dParams = getUrlParams(url, 'gmtCreateStart', 'gmtCreateEnd');
			} if (val === 'YC020704') {
				dParams = getUrlParams(url, 'gmtCreateStart', 'gmtCreateEnd');
			}

			return dParams;
		}
		return {};
	};

	toGetUnReadCount=(config) => {
		const { onRefresh } = this.props;
		const { _source } = this.state;
		const apiList = config.map(i => ({ api: APISource(i.id, 'listCount')({ ...this.isUrlParams(i.id), isRead: 1 }), info: { id: i.id } }));
		requestAll(apiList).then((res) => {
			res.forEach((item, index) => {
				_source[index].dot = item.data;
			});
			this.setState({ _source });
			if (onRefresh)onRefresh(_source);
		}).catch(() => {
		    // 异常处理
		});
	};

	render() {
		const { onChange, field } = this.props;
		const { _source } = this.state;
		const params = {
			source: _source,
			onChange,
			field,
		};
		return (
			<Tabs.Simple borderBottom {...params} />
		);
	}
}
