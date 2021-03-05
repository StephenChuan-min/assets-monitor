/**
 * @Description: 这里处理 路由相关的方法
 * @author async
 * @date 2019-10-10
*/
export default {
	/**
	 * 处理路由数据,对默认数据转换为可以使用的数据对象
	 * @param source
	 */
	handleRule: (source) => {
		const res = {};
		source.forEach((item) => {
			switch (item.groupName) {
			case 'menu_sy':
				res.menu_sy = {
					id: 1,
					groupName: item.groupName,
					title: '首页',
					rule: item.rule,
				};
				break;
			case 'menu_zcwj':
				if (res.menu_zcwj) {
					res.menu_zcwj.children[item.rule] = item;
				} else {
					res.menu_zcwj = {
						id: 2,
						groupName: item.groupName,
						title: '资产挖掘',
						children: {
							[item.rule]: item,
						},
					};
				}
				break;
			case 'menu_zjgc':
				if (res.menu_zcwj) {
					res.menu_zcwj.children[item.rule] = item;
				} else {
					res.menu_zcwj = {
						id: 2,
						groupName: item.groupName,
						title: '资产挖掘',
						children: {
							[item.rule]: item,
						},
					};
				}
				break;
			case 'menu_fxjk':
				if (res.menu_fxjk) {
					res.menu_fxjk.children[item.rule] = item;
				} else {
					res.menu_fxjk = {
						id: 3,
						groupName: item.groupName,
						title: '风险监控',
						children: {
							[item.rule]: item,
						},
					};
				}
				break;
			case 'menu_jyfx':
				if (res.menu_fxjk) {
					res.menu_fxjk.children[item.rule] = item;
				} else {
					res.menu_fxjk = {
						id: 3,
						groupName: item.groupName,
						title: '风险监控',
						children: {
							[item.rule]: item,
						},
					};
				}
				break;
			case 'menu_ywgl':
				if (res.menu_ywgl) {
					res.menu_ywgl.children[item.rule] = item;
				} else {
					res.menu_ywgl = {
						id: 4,
						groupName: item.groupName,
						title: '业务管理',
						children: {
							[item.rule]: item,
						},
					};
				}
				break;
			case 'menu_hxcx':
				res.menu_hxcx = {
					id: 11,
					groupName: item.groupName,
					title: '画像查询',
					rule: item.rule,
				};
				break;
			case 'menu_xxss':
				if (res.menu_xxss) {
					res.menu_xxss.children[item.rule] = item;
				} else {
					res.menu_xxss = {
						id: 5,
						groupName: item.groupName,
						title: '信息查询',
						children: {
							[item.rule]: item,
						},
					};
				}
				break;
			case 'menu_jjgl':
				if (res.menu_jjgl) {
					res.menu_jjgl.children[item.rule] = item;
				} else {
					res.menu_jjgl = {
						id: 6,
						groupName: item.groupName,
						title: '机构管理',
						children: {
							[item.rule]: item,
						},
					};
				}
				break;
			default:
				if (res.else) {
					res.else.children[item.rule] = item;
				} else {
					res.else = {
						id: 7,
						title: '其他',
						children: {
							[item.rule]: item,
						},
					};
				}
			}
		});
		return res;
	},

	/**
	 * 返回默认对应rule数据结构，包含二级三级
	 * @param _rule
	 * @param moduleID
	 * @param childID
	 * @returns {Array}
	 */
	toGetRuleSource: (_rule, moduleID, childID) => {
		/**
		 * 判断是否存在
		 * @param rules
		 * @param field [string || array]
		 * @returns {boolean}
		 */
		const rule = _rule || global.ruleSource;
		const toStatus = (rules, field) => {
			if (rules) {
				if (typeof field === 'string') {
					return Boolean(rules.children[field]);
				}
				let r = false;
				field.forEach((item) => {
					r = r || rules.children[item];
				});
				return Boolean(r);
			}
			return false;
		};

		const _RES = [];
		const base = [
			{
				id: 'YC01',
				name: '首页',
				url: '/',
				status: rule.menu_sy,
			},
			{
				id: 'YC02',
				name: null, // 测试使用
				url: '/monitor',
				status: rule.menu_zcwj,
				dot: false,
				children: [
					{
						id: 'YC0201',
						name: '资产拍卖',
						url: '/monitor',
						param: '?process=1',
						status: toStatus(rule.menu_zcwj, 'zcwjzcpm'),
					},
					{
						id: 'YC0202',
						name: '代位权',
						url: '/monitor/subrogation',
						status: toStatus(rule.menu_zcwj, 'zcwjdwq'),
						child: [
							{ id: 'YC020201', name: '立案信息', status: true },
							{ id: 'YC020202', name: '开庭公告', status: true },
							{ id: 'YC020203', name: '裁判文书', status: true },
						],
					},
					{
						id: 'YC0203',
						name: '土地信息',
						url: '/monitor/land',
						status: toStatus(rule.menu_zcwj, 'zcwjtdsj'),
						child: [
							{ id: 'YC020301', name: '出让结果', status: true },
							{ id: 'YC020302', name: '土地转让', status: true },
							{ id: 'YC020303', name: '土地抵押', status: true },
						],
					},
					{
						id: 'YC0204',
						name: '招投标',
						url: '/monitor/tender',
						status: toStatus(rule.menu_zcwj, 'zcwjzbzb'),
					},
					{
						id: 'YC0205',
						name: '金融资产',
						url: '/monitor/financial',
						status: toStatus(rule.menu_zcwj, 'zcwjjrzj'),
						child: [
							{ id: 'YC020501', name: '竞价项目', status: true },
							{ id: 'YC020502', name: '招商项目', status: true },
							{ id: 'YC020503', name: '公示项目', status: true },
						],
					},
					{
						id: 'YC0206',
						name: '动产抵押',
						url: '/monitor/mortgage',
						status: toStatus(rule.menu_zcwj, 'zcwjdcdy'),
					},
					{
						id: 'YC0207',
						name: '无形资产',
						url: '/monitor/intangible',
						status: toStatus(rule.menu_zcwj, 'zcwjwxzc'),
						child: [
							{ id: 'YC020701', name: '排污权', status: true },
							{ id: 'YC020702', name: '矿业权', status: true },
							{ id: 'YC020703', name: '商标专利', status: true },
							{ id: 'YC020704', name: '建筑建造资质', status: true },
						],
					},
					{
						id: 'YC0208',
						name: '股权质押',
						url: '/monitor/pledge',
						status: toStatus(rule.menu_zcwj, 'zcwjgqzy'),
					},
					{
						id: 'YC0301',
						name: '涉诉监控',
						url: '/risk',
						status: toStatus(rule.menu_fxjk, 'fxjkssjk'),
						child: [
							{ id: 'YC030101', name: '立案信息', status: true },
							{ id: 'YC030102', name: '开庭公告', status: true },
							{ id: 'YC030103', name: '裁判文书', status: true },
						],
					},
					{
						id: 'YC0302',
						name: '企业破产重组',
						url: '/risk/bankruptcy',
						status: toStatus(rule.menu_fxjk, 'fxjkqypccz'),
					},
					{
						id: 'YC0304',
						name: '失信记录',
						url: '/risk/broken',
						status: toStatus(rule.menu_fxjk, 'jkxxsxjl'),
					},
					{
						id: 'YC0303',
						name: '经营风险',
						url: '/risk/operation',
						status: toStatus(rule.menu_fxjk, ['jyfxyzwf', 'jyfxsswf', 'jyfxjyyc', 'jyfxhbcf', 'jyfxxzcf', 'jyfxgsbg']),
						child: [
							{ id: 'YC030301', name: '经营异常', status: toStatus(rule.menu_fxjk, 'jyfxjyyc') },
							{ id: 'YC030302', name: '工商变更', status: toStatus(rule.menu_fxjk, 'jyfxgsbg') },
							{ id: 'YC030303', name: '严重违法', status: toStatus(rule.menu_fxjk, 'jyfxyzwf') },
							{ id: 'YC030304', name: '税收违法', status: toStatus(rule.menu_fxjk, 'jyfxsswf') },
							{ id: 'YC030305', name: '行政处罚', status: toStatus(rule.menu_fxjk, 'jyfxxzcf') },
							{ id: 'YC030306', name: '环保处罚', status: toStatus(rule.menu_fxjk, 'jyfxhbcf') },
						],
					},
				],
			},
			{
				id: 'YC10',
				name: '信息监控',
				url: '/info/monitor',
				status: rule.menu_zcwj || rule.menu_fxjk,
				backup: ['/monitor', '/risk', '/info/monitor/attention'],
				children: [
					{
						id: 'YC02',
						name: '资产挖掘',
						url: '/info/monitor/excavate',
						rootUrl: true,
						backup: ['/monitor', '/info/monitor/attention\\?init=YC02'],
						status: rule.menu_zcwj,
						child: [
							{
								id: 'YC0201',
								name: '资产拍卖',
								url: '/monitor',
								reg: /\/monitor[^/]/,
								param: '?process=1',
								status: toStatus(rule.menu_zcwj, 'zcwjzcpm'),
							},
							{
								id: 'YC0203',
								name: '土地信息',
								url: '/monitor/land',
								status: toStatus(rule.menu_zcwj, 'zcwjtdsj'),
								child: [
									{ id: 'YC020301', name: '出让结果', status: true },
									{ id: 'YC020302', name: '土地转让', status: true },
									{ id: 'YC020303', name: '土地抵押', status: true },
								],
							},
							{
								id: 'YC0207',
								name: '无形资产',
								url: '/monitor/intangible',
								status: toStatus(rule.menu_zcwj, 'zcwjwxzc'),
								child: [
									{ id: 'YC020701', name: '排污权', status: true },
									{ id: 'YC020702', name: '矿业权', status: true },
									{ id: 'YC020703', name: '商标专利', status: true },
									{ id: 'YC020704', name: '建筑建造资质', status: true },
								],
							},
							{
								id: 'YC0202',
								name: '代位权',
								url: '/monitor/subrogation',
								status: toStatus(rule.menu_zcwj, 'zcwjdwq'),
								child: [
									{ id: 'YC020201', name: '立案信息', status: true },
									{ id: 'YC020202', name: '开庭公告', status: true },
									{ id: 'YC020203', name: '裁判文书', status: true },
								],
							},
							{
								id: 'YC0208',
								name: '股权质押',
								url: '/monitor/pledge',
								status: toStatus(rule.menu_zcwj, 'zcwjgqzy'),
							},
							{
								id: 'YC0206',
								name: '动产抵押',
								url: '/monitor/mortgage',
								status: toStatus(rule.menu_zcwj, 'zcwjdcdy'),
							},
							{
								id: 'YC0209',
								name: '查/解封资产',
								url: '/monitor/seizedUnblock',
								status: toStatus(rule.menu_zcwj, 'zcwjcjfzc'),
							},
							{
								id: 'YC0212',
								name: '在建工程',
								url: '/monitor/construct',
								status: toStatus(rule.menu_zcwj, ['zjgcjsdw', 'zjgczbdw', 'zjgcsgdw']),
								child: [
									{ id: 'YC021201', name: '建设单位', status: toStatus(rule.menu_zcwj, 'zjgcjsdw') },
									{ id: 'YC021202', name: '中标单位', status: toStatus(rule.menu_zcwj, 'zjgczbdw') },
									{ id: 'YC021203', name: '施工单位', status: toStatus(rule.menu_zcwj, 'zjgcsgdw') },
								],
							},
							{
								id: 'YC0210',
								name: '不动产登记',
								url: '/monitor/realEstate',
								status: toStatus(rule.menu_zcwj, 'zcwjbdcdj'),
							},
							{
								id: 'YC0211',
								name: '车辆信息',
								url: '/monitor/car',
								status: toStatus(rule.menu_zcwj, 'zcwjclxx'),
							},
							{
								id: 'YC0205',
								name: '金融资产',
								url: '/monitor/financial',
								status: toStatus(rule.menu_zcwj, 'zcwjjrzj'),
								child: [
									{ id: 'YC020501', name: '竞价项目', status: true },
									{ id: 'YC020502', name: '招商项目', status: true },
									{ id: 'YC020503', name: '公示项目', status: true },
								],
							},
							{
								id: 'YC0204',
								name: '招投标',
								url: '/monitor/tender',
								status: toStatus(rule.menu_zcwj, 'zcwjzbzb'),
							},
						],
					},
					{
						id: 'YC03',
						name: '风险监控',
						url: '/info/monitor/risk',
						backup: ['/risk', '/info/monitor/attention\\?init=YC03'],
						status: rule.menu_fxjk,
						child: [
							{
								id: 'YC0302',
								name: '破产重组',
								url: '/risk/bankruptcy',
								status: toStatus(rule.menu_fxjk, 'fxjkqypccz'),
							},
							{
								id: 'YC0304',
								name: '失信记录',
								url: '/risk/broken',
								status: toStatus(rule.menu_fxjk, 'jkxxsxjl'),
							},
							{
								id: 'YC0305',
								name: '限制高消费',
								url: '/risk/limitHight',
								status: toStatus(rule.menu_fxjk, 'fxjkxzgxf'),
							},
							{
								id: 'YC0301',
								name: '涉诉信息',
								url: '/risk/info',
								// reg: /#\/risk(?!\/)/,
								status: toStatus(rule.menu_fxjk, 'fxjkssjk'),
								// backup: ['/risk'],
								child: [
									{ id: 'YC030101', name: '立案信息', status: true },
									{ id: 'YC030102', name: '开庭公告', status: true },
									{ id: 'YC030103', name: '裁判文书', status: true },
								],
							},
							{
								id: 'YC0303',
								name: '经营风险',
								url: '/risk/operation',
								status: toStatus(rule.menu_fxjk, ['jyfxyzwf', 'jyfxsswf', 'jyfxjyyc', 'jyfxhbcf', 'jyfxxzcf', 'jyfxgsbg']),
								child: [
									{ id: 'YC030301', name: '经营异常', status: toStatus(rule.menu_fxjk, 'jyfxjyyc') },
									{ id: 'YC030302', name: '工商变更', status: toStatus(rule.menu_fxjk, 'jyfxgsbg') },
									{ id: 'YC030303', name: '严重违法', status: toStatus(rule.menu_fxjk, 'jyfxyzwf') },
									{ id: 'YC030304', name: '税收违法', status: toStatus(rule.menu_fxjk, 'jyfxsswf') },
									{ id: 'YC030305', name: '行政处罚', status: toStatus(rule.menu_fxjk, 'jyfxxzcf') },
									{ id: 'YC030306', name: '环保处罚', status: toStatus(rule.menu_fxjk, 'jyfxhbcf') },
								],
							},

						],
					},
				],
			},
			{
				id: 'YC11',
				name: '信息搜索',
				url: '/info/search',
				status: rule.menu_hxcx || rule.menu_xxss,
				backup: ['/inquiry', '/search'],
				children: [
					{
						id: 'YC07',
						name: '画像查询',
						rootUrl: true,
						url: '/info/search/portrait',
						backup: ['/inquiry'],
						status: rule.menu_hxcx,
					},
					{
						id: 'YC05',
						name: '分类搜索',
						url: '/info/search/several',
						backup: ['/search'],
						status: rule.menu_xxss,
					},
				],
			},
			{
				id: 'YC04',
				name: '业务管理',
				url: '/business/view',
				status: rule.menu_ywgl,
				backup: ['/business/debtor/detail', '/business/detail'],
				dot: false,
				children: [
					{
						id: 'YC0401',
						name: '业务视图',
						url: '/business/view',
						backup: ['/business/detail'],
						status: toStatus(rule.menu_ywgl, 'ywglywst'),
					},
					{
						id: 'YC0402',
						name: '债务人',
						url: '/business/view/debtor',
						backup: ['/business/debtor/detail'],
						status: toStatus(rule.menu_ywgl, 'ywglzwr'),
					},
				],
			},
			{
				id: 'YC06',
				name: '机构管理',
				url: '/organization',
				status: rule.menu_jjgl,
				dot: false,
				children: [
					{
						id: 'YC0601',
						name: '推送设置',
						url: '/organization/setting',
						reg: /\/organization\/setting/,
						status: toStatus(rule.menu_jjgl, 'jggltssz'),
					},
					{
						id: 'YC0603',
						name: '机构统计',
						url: '/organization',
						reg: /\/organization(?!\/setting|(?!\/user))/,
						rootUrl: true,
						status: toStatus(rule.menu_jjgl, 'jggljgtj'),
					},
					{
						id: 'YC0602',
						name: '账号列表',
						url: '/organization/user',
						reg: /\/organization\/user/,
						status: toStatus(rule.menu_jjgl, 'jgglzhlb'),
					},
				],
			},
			{
				id: 'YC07',
				name: '账号开通',
				url: '/account',
				status: toStatus(rule.else, 'dljg'),
				dot: false,
			},
		];
		base.forEach((item) => {
			if (item.status) {
				const _item = {
					id: item.id,
					name: item.name,
					url: item.url,
					status: true,
					dot: item.dot,
					backup: item.backup,
				};
				if (item.children) {
					_item.children = item.children.filter(it => it.status);
					_item.newUrl = `${_item.children[0].url}${_item.children[0].param || ''}`;
					// console.log(_item.newUrl, _item.url);
				}
				_RES.push(_item);
			}
		});

		const toGetRes = (ary, ID) => {
			const type = typeof ID;
			if (type === 'string') {
				return ID ? ary.filter(item => item.id === ID)[0] : ary;
			} if (type === 'object') {
				return ary.filter((item) => {
					let res = false;
					ID.forEach((i) => {
						if (i === item.id)res = true;
					});
					return res;
				});
			}
			return ary;
		};
		const ruleObj = toGetRes(_RES, moduleID);
		if (childID) return ((ruleObj || {}).children || []).filter(item => item.id === childID)[0];
		return ruleObj;
	},


};

/**
 * 返回对应的权限是否存在
 * @param field
 * @param childField 传入一个字符串或者是数组
 */
export const	roleState = (field, childField) => {
	const rule = global.ruleSource || {};
	const _field = `menu_${field || ''}`;
	const ruleObject = rule[_field];
	if (Array.isArray(childField) && childField.length > 0) {
		let isRule = 0;
		childField.forEach((item) => {
			isRule += Boolean(ruleObject.children[item]);
		});
		return isRule > 0;
	}
	return ruleObject ? Boolean(ruleObject.children[childField]) : false;
};
