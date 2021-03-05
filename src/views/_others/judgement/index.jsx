import React from 'react';
import { Ellipsis, Spin, NoContent } from '@/common';
import { parseQuery, clearEmpty } from '@/utils';
import { judgmentDetail, judgmentUnsealDetail } from '@/utils/api/index';
import './style.scss';

// 不同的请求映射，查解封的文书请求的接口和其他模块的文书请求的接口不同
function getUrl(type) {
	let url = judgmentDetail;
	switch (type) {
	case 'seizedUnblock': url = judgmentUnsealDetail; break;
	default: url = judgmentDetail; break;
	}
	return url;
}
const { hash } = window.location;
const urlTitle = parseQuery(hash).title;

class Judgement extends React.Component {
	constructor(props) {
		super(props);
		document.title = '文书正文';
		this.state = {
			loading: true,
			url: '',
			htmlText: '',
			title: urlTitle,
		};
	}

	componentWillMount() {
		const params = parseQuery(hash);
		const newParams = {
			pid: params.pid,
			sourceId: params.sourceId ? parseInt(params.sourceId, 10) : params.sourceId,
		};
		this.getData(newParams, params.title, params.urlType);
	}

	// 请求数据
	getData = (params, title, urlType) => {
		const api = getUrl(urlType);
		api(clearEmpty(params)).then((res) => {
			if (res.code === 200) {
				this.setState({
					loading: false,
					url: res.data.url,
					htmlText: res.data.htmlText,
					title: res.data.title || title,
				});
			} else {
				this.setState({
					loading: false,
				});
			}
		}).catch((err) => {
			console.log(err);
			this.setState({
				loading: false,
			});
		});
	};

	// 手动跳转源链接
	// handleJumpSourceLink = () => {
	// 	const { url } = this.state;
	// 	console.log('url', url);
	// 	const w = window.open('about:blank');
	// 	w.location.href = url;
	// };

	render() {
		const {
			loading, htmlText, title, url,
		} = this.state;
		const newHtmlText = htmlText.replace(/FONT-FAMILY:.{3,4};/g, 'font-family: PingFang SC, microsoft yahei;').replace(/pt/g, 'px').replace(/MARGIN: 0.5px 0cm/g, 'margin: 20px 0');
		return (
			<Spin visible={loading}>
				<div className="judgement">
					<div className="judgement-header">
						<span className="judgement-header-title">{title}</span>
						{/* <Button className="judgement-header-btn" onClick={this.handleJumpSourceLink}>源链接</Button> */}
						<Ellipsis className="judgement-header-btn" content="源链接" url={url} isSourceLink wsSourceLink />
					</div>
					<div className="judgement-line">
						<div className="judgement-line-title">文书正文</div>
						<div className="judgement-line-line" />
					</div>
					{
						newHtmlText ? <div className="judgement-body" dangerouslySetInnerHTML={{ __html: newHtmlText }} /> : (loading ? null : <NoContent font="文书未公开或未查到" style={{ paddingTop: 50 }} />)
					}
				</div>
			</Spin>
		);
	}
}
export default Judgement;
