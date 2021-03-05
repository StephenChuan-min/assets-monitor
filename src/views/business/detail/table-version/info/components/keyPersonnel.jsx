import React from 'react';
import { Spin, Table } from '@/common';
import { parseQuery } from '@/utils';
import { getMainPerson } from '@/utils/api/professional-work/info';

export default class KeyPersonnel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			data: [], // 列表数据
		};
	}

	componentDidMount() {
		const { hash } = window.location;
		const params = parseQuery(hash);
		this.getMainPersonData(params);
	}

	getMainPersonData = (value) => {
		this.setState({
			loading: true,
		});
		const params = {
			...value,
		};
		getMainPerson(params)
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						loading: false,
						data: res.data,
					});
				} else {
					this.setState({ loading: false });
				}
			})
			.catch(() => {
				this.setState({ loading: false });
			});
	};

	toGetColumns = () => [
		{
			title: '序号',
			dataIndex: 'indexNum',
			key: 'indexNum',
			className: 'column-left20',
			width: 240,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			width: 240,
			render(text) {
				return <div>{text || '-'}</div>;
			},
		}, {
			title: '职务',
			dataIndex: 'job',
			key: 'job',
			render(text) {
				return <div>{text || '-'}</div>;
			},
		},
	];

	render() {
		const { id } = this.props;
		const { loading, data } = this.state;

		// 添加一个下标属性indexNum
		const newArray = [];
		if (data) {
			data.map((item, index) => newArray.push(
				Object.assign({}, item, { indexNum: index + 1 }),
			));
		}

		return (
			<div className="yc-inquiry-public-table" id={id}>
				<div className="public-table-tab" style={{ borderBottom: 0 }}>
					<div className="yc-tabs-simple-prefix">
						主要人员
					</div>
				</div>
				<div className="yc-base-table">
					<Spin visible={loading}>
						<Table
							scroll={data.length > 8 ? { y: 440 } : {}}
							columns={this.toGetColumns()}
							dataSource={newArray}
							pagination={false}
							className="table"
						/>
					</Spin>
				</div>
			</div>
		);
	}
}
