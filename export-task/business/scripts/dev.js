"use strict";

const fs = require('fs');
const path = require('path');
const ENV = process.env.NODE_ENV;
const root = path.resolve(__dirname+'/../');
const _dataPath = path.resolve(__dirname+'../../../_analog-data');

const imgData = require('../../_assets/img/index');
const { zgBgImgData, bgImgData, deIconData,	personData,	businessData,	disIconData,	disEdIconData,	accurateImgData } = imgData;

const { dev } =require('../src/str');

let htmlResult = dev.main;
let htmlCover = dev.cover;

/* 导出详情-封面 */
function exportCover(source, exportType,domainName) {
	var domainType = {
		1:{key:'yc',value:bgImgData}, //  源诚
		2:{key:'zhongguan',value:zgBgImgData}, // (正式环境域名)中冠
		3:{key:'zhongguandev',value:zgBgImgData} // (测试环境域名)中冠
	}
	var d = JSON.parse(source) || {};
	var bgImgSource = domainType[domainName] ? domainType[domainName].value : bgImgData;
	htmlCover = htmlCover.replace("../../_assets/img/watermark.png", bgImgSource);
	var dataTime = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日";
	htmlCover = htmlCover.replace(/{base.queryTime}/g, dataTime);
	var userInfo = '', data = '';
	if (exportType === 'debtor') {
		data = d.DB10101 || {};
		htmlCover = htmlCover.replace(/{base.title}/, "债务人详情查询报告");
		userInfo = ("<div class='exp-name'>" + (data.obligorName || '-') + "<br/>" + (data.obligorNumber ? ("(" + data.obligorNumber + ")") : "") + "</div>");
	} else {
		data = d.BB10101 || {};
		htmlCover = htmlCover.replace(/{base.title}/, "业务详情");
		userInfo = ("<div class='exp-name' style='margin-bottom: 30px'>业务编号：" + (data.caseNumber || '-') + "</div><div class='exp-name'>借款人：" + data.obligorName + "</div>");
	}
	htmlCover = htmlCover.replace(/{base.userInfo}/, userInfo);
	return htmlCover;
}

/* 导出详情-内容 */
function exportTemplate(source, exportType, name, domainName) {
	var dd = {
		overview: {
			name: '概览',
			about: '{overview.content}',
			status:'EP',
			child: [
				{ id: "DO1000" ,title:'资产概况',status:'EP',
					child:[
						{ id:"DO10100",title:"相关资产拍卖",status:'EP'},
						{ id:"DO10200",title:"代位权信息",status:'E'},
						{ id:"DO10200",title:"代位权信息 (裁判文书) ",status:'P'},
						{ id:"DO10300",title:"土地信息",status:'BE'},
						{ id:"DO10400",title:"无形资产信息",status:'BE'},
						{ id:"DO10500",title:"股权质押信息",status:'BE'},
						{ id:"DO10600",title:"动产抵押信息",status:'BE'},
						{ id:"DO10700",title:"相关招投标信息",status:'BE'},
					]
				},
				{ id: "DO2000" ,title:'风险信息',status:'EP',
					child:[
						{ id:"DO20400",title:"失信记录",status:'EP'},
						{ id:"DO20600",title:"涉诉信息",status:'E'},
						{ id:"DO20600",title:"涉诉信息 (裁判文书) ", status:'P'},
						{ id:"DO30200",title:"破产重组信息",status:'E'},
						{ id:"DO30300",title:"经营风险信息",status:'E'},
						{ id:"DO30500",title:"税收违法",status:'P'},
					]
				},
				{
					id: "DO5000", title: '工商基本信息', status: 'E',
					child: [
						{id: "DO50000", title: "基本信息", status: 'E', show: true, type: 1 },
						{id: "DO50000", title: "股东情况", status: 'E' , type: 2},
						{id: "DO50000", title: "企业规模", status: 'E', show: true, type: 3 },
					]
				},
			]
		},
		assets: {
			name: '资产',
			about: '{assets.content}',
			status: 'BEP',
			child: [
				{id: 'A10101', title: '资产拍卖_精准匹配', status: 'BEP'},
				{id: 'A10102', title: '资产拍卖_模糊匹配', status: 'BEP'},
				{id: 'A10301', title: '土地信息_出让结果', status: 'BE'},
				{id: 'A10302', title: '土地信息_土地转让', status: 'BE'},
				{id: 'A10303', title: '土地信息_土地抵押', status: 'BE'},
				{id: 'A10401', title: '无形资产_排污权', status: 'BE'},
				{id: 'A10402', title: '无形资产_矿业权', status: 'BE'},
				{id: 'A10403', title: '无形资产_商标专利', status: 'BE'},
				{id: 'A10404', title: '无形资产_建筑建造资质', status: 'BE'},
				{id: 'A10301', title: '土地信息_出让结果', status: 'BE'},
				{id: 'A10302', title: '土地信息_土地转让', status: 'BE'},
				{id: 'A10303', title: '土地信息_土地抵押', status: 'BE'},
				{id: 'A10201', title: '代位权_立案', status: 'BEP'},
				{id: 'A10202', title: '代位权_开庭', status: 'BEP'},
				{id: 'A10203', title: '代位权_裁判文书', status: 'BEP'},
				{id: 'A10501', title: '股权质押_股权出质', status: 'BE'},
				{id: 'A10502', title: '股权质押_股权质权', status: 'BE'},
				{id: 'A10601', title: '动产抵押_抵押', status: 'BE'},
				{id: 'A10602', title: '动产抵押_抵押权', status: 'BE'},
				{id: 'A10901', title: '查/解封资产', status: 'BE'},
				{id: 'A10801', title: '金融资产_竞价项目', status: 'BE'},
				{id: 'A10802', title: '金融资产_招商项目', status: 'BE'},
				{id: 'A10803', title: '金融资产_公示项目', status: 'BE'},
				{id: 'A10701', title: '招投标', status: 'BE'},
				{id: 'A11001', title: '不动产登记_精准匹配', status: 'BE'},
				{id: 'A11002', title: '不动产登记_模糊匹配', status: 'BE'},
				{id: 'A12001', title: '车辆信息', status: 'BE'},
				{id: 'A13001', title: '在建工程_建设单位', status: 'BE'},
				{id: 'A13002', title: '在建工程_中标单位', status: 'BE'},
				{id: 'A13003', title: '在建工程_施工单位', status: 'BE'},
			]
		},
		risk: {
			name: '风险',
			about: '{risk.content}',
			status: 'BEP',
			child: [
				{id: 'R30201', title: '破产重组', status: 'BE'},
				{id: 'R20604', title: '涉诉文书', status: 'P'},
				{id: 'R20401', title: '失信记录_列入', desc: '列入', status: 'BEP'},
				{id: 'R20402', title: '失信记录_已移除', desc: '已移除', status: 'BEP'},
				{id: 'R20501', title: '限制高消费', status: 'BEP'	},
				{id: 'R20604', title: '涉诉文书', status: 'P'},
				{id: 'R20601', title: '涉诉信息_立案', status: 'BE'},
				{id: 'R20602', title: '涉诉信息_开庭', status: 'BE'},
				{id: 'R20603', title: '涉诉信息_裁判文书', status: 'BE'},
				{id: 'R30301', title: '经营异常', status: 'BE'},
				{id: 'R30401', title: '严重违法', status: 'BE'},
				{id: 'R30501', title: '税收违法', status: 'BEP'},
				{id: 'R30601', title: '行政处罚', status: 'BE'},
				{id: 'R30701', title: '环保处罚', status: 'BE'},
			]
		},
		info: {
			name: '工商基本详情',
			about: '{info.content}',
			field: 'info',
			status: 'E',
			child: [
				{id: 'I50101', title: '基本信息', status: 'E', show: true, className: 'table-baseInfo'},
				{id: 'I50201', title: '主要人员', status: 'E'},
				{id: 'I50301', title: '股东信息', status: 'E'},
				{id: 'I50501', title: '分支机构', status: 'E'},
				{id: 'I50601', title: '对外投资', status: 'E'},
				{id: 'I50701', title: '工商变更', status: 'E', className: 'page-break-style'},
			]
		},
	};
	var _dataSource = JSON.parse(source);

	// 导出类型
	var TYPE = '';
	var Status = '';
	if (exportType === 'debtor') {
		TYPE = 'D';
		var debtorName = name || _dataSource['DB10101'].obligorName;
		Status = debtorName.length > 4 ? 'E' : 'P';
	} else {
		TYPE = 'B';
		Status = 'B';
	}
	var ET = Status;
	// public enumeration object
	var s = {
		identity: {
			0: "未知",
			1: "作为违法人",
			2: "作为法人",
			3: "作为财务",
			9: "其他"
		},
		// 案件类型 1：普通 2：破产 3：执行 4：终本
		caseType: {
			1: "普通案件",
			2: "破产案件",
			3: "执行案件",
			4: "终本案件",
			99: "执恢案件"
		},
		// 1：注销人 2：权利人 3：新权利人 4：原权利人 5：抵押人 6：抵押权人 7：被执行人 8：申请执行人 0：未知
		realEstateRoleType:{
			0: "未知",
			1: "注销人",
			2: "权利人",
			3: "新权利人",
			4: "原权利人",
			5: "抵押人",
			6: "抵押权人",
			7: "被执行人",
			8: "申请执行人",
		},
		// 角色名称
		roleType: {
			0: "未知",
			1: "中标单位",
			2: "勘察单位",
			3: "建设单位",
			4: "施工单位",
			5: "监理单位",
			6: "设计单位",
			7: "发包单位",
			8: "承包单位",
			9: "中标候选人",
			10: "招标人",
			11: "工程总承包单位",
		},
		// （1-即将开始、3-正在进行、5-已成交、7-已流拍、9-中止、11-撤回）
		auction: {
			1: {t: '即将开始', dot: 'warning'},
			3: {t: '正在进行', dot: 'normal'},
			5: {t: '已成交', dot: 'success'},
			7: {t: '已流拍', dot: 'gary'},
			9: {t: '中止', dot: 'gary'},
			11: {t: '撤回', dot: 'gary'},
			13: {t: '结束', dot: 'gary'}
		},
		process: {
			0: {t: '未跟进', tag: ''},
			3: {t: '跟进中', tag: 'regStatus-orange'},
			6: {t: '跟进中', tag: 'regStatus-orange'},
			9: {t: '已完成', tag: 'regStatus-green'},
			12: {t: '已忽略', tag: 'regStatus-gray'},
			15: {t: '已放弃', tag: 'regStatus-gray'},
		},
		certificateType: {
			0: "未知",
			1: "采矿权",
			2: "探矿权",
		},
		rightsType: {
			0: "未知",
			1: "商标",
			2: "专利",
		},
		category: {
			200794003: '其他交通工具',
			50025970: '土地',
			50025975: '工程',
			50025974: '矿权',
			122406001: '无形资产',
			56936003: '机械设备',
			50025973: '林权',
			200778005: '海域',
			125228021: '船舶',
		  125088031: '股权',
		  50025971: '实物资产',
		  50025972: '机动车',
		  201290015: '奢侈品',
		  50025969: '房产',
		  56956002: '债权',
		  50025976: '其他',
			0: '未知',
		},
		projectType: {
			'1': '股权项目',
			'2': '债权项目',
			'3': '资产项目',
			'4': '租赁项目',
			'5': '增资项目',
			'6': '其他项目',
			'-1': '未知'
		},
		projectUnitType: {
			0: "未知",
			1: "建筑工程",
			2: "装饰工程",
			3: "市政道路工程",
			4: "其他",
		},
		domainType: {
			1:{key:'yc',value:bgImgData}, //  源诚
			2:{key:'zhongguan',value:zgBgImgData}, // (正式环境域名)中冠
			3:{key:'zhongguandev',value:zgBgImgData} // (测试环境域名)中冠
		},
	};
	// public function object
	var f = {
		time: function (date, formatStr, isSelf) {
			var _this = "";
			if (typeof date === 'string') return date;
			if (!date && date !== 0) return '-';
			if (date === 0) _this = new Date(null);
			else if (date) _this = new Date((isSelf ? date : date * 1000));
			else _this = new Date();
			var format = "yyyy-MM-dd";
			if (formatStr === 'm') format = "yyyy-MM-dd hh:mm";
			if (formatStr === 's') format = "yyyy-MM-dd hh:mm:ss";
			var o = {
				'M+': _this.getMonth() + 1,// 月份
				'd+': _this.getDate(),// 日
				'h+': _this.getHours(),// 小时
				'm+': _this.getMinutes(),// 分
				's+': _this.getSeconds(),// 秒
				'q+': Math.floor((_this.getMonth() + 3) / 3),// 季度
				S: _this.getMilliseconds() // 毫秒
			};
			var fmt = format;
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear().toString()).substr(4 - RegExp.$1.length));
			Object.keys(o).forEach(function (k) {
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k].toString()).substr((o[k].toString()).length));
				}
			});
			return fmt;
		},
		replaceHtml: function (ary, option) {
			var field = (option || {}).field || '';
			var source = (option || {}).source || {};
			ary.forEach(function (i) {
				if (typeof i === 'object') htmlResult = htmlResult.replace(i.f, i.v);
				else if (typeof i === 'string') htmlResult = htmlResult.replace("{" + field + "." + i + "}", source[i]);
			})
		},
		urlDom: function (title, url, defaultWord) {
			var content = title || defaultWord || "-";
			return (url ? "<a href=\"" + url + "\" target=\"_blank\" class=\"t3\">" + content + "</a>"
				: ("<span class='t2 f-b-400'>" + content + "</span>"));
		},
		tag: function (value, className) {
			if (!value) return '';
			var _className = className ? ('tag ' + className) : 'tag';
			return "<span class=\"" + _className + "\">" + value + "</span>";
		},
		threeDigit: function (item, unit, num, defaultWord) {
			if (!item && item === 0) return (defaultWord || '-');
			var type = parseFloat(item);
			if (isNaN(type)) return item;
			var num1 = type;
			if (num !== 'none') {
				var FixedNum = num !== undefined ? num : 2;
				num1 = type.toFixed(FixedNum);
			}
			var str = "".concat(num1);
			if (str.length <= 3) return str;

			var pointer = str.split('.')[1];
			var str1 = str.split('.')[0];
			var arr = str1.split('');
			var arr1 = arr.slice(0);
			var i = 1;
			for (var j = 0; j <= i; j += 1) {
				if (i * 3 < arr.length) {
					arr1.splice(arr.length - 3 * i, 0, ',');
					i += 1;
				}
			}
			if (pointer) {
				arr1.push('.');
				arr1.push(pointer);
			}
			return arr1.join('') + (unit || '');
		},
		normalList: function (list, subscript, cotClass) {
			var result = '';
			var separator = '<div class=\"n-line\"></div>';
			var getDesc = function (item, index) {
				var dot = item.dot ? ("<i class=\"" + item.dot + "\"></i>") : '';
				return (dot + (item.t ? ("<u>" + item.t + "</u>") : '') + (subscript === index && cotClass ? "<span class=\"" + cotClass + "\">" + item.cot +"</span>" : (item.cot || '-')));
			};
			list.forEach(function (i, index) {
				if (!i) result += '';
				else {
					if (i.length !== undefined) {
						result += "<li>";
						i.forEach(function (childItem) {
							if (childItem.ET) {
								result += (childItem.ET === 'B' ? (separator + getDesc(childItem, index)) : '')
							} else {
								result += (separator + getDesc(childItem, index));
							}
						});
						result += "</li>";
					} else {
						if (i.ET) {
							result += (i.ET === 'B' ? ("<li>" + getDesc(i, index) + "</li>") : '')
						} else {
							result += ("<li>" + getDesc(i, index) + "</li>")
						}
					}
				}
			});
			return result;
		},
		partiesList: function (data, inline, ignore) {
			var res = inline ? '<li>' : '';
			if (data.length && typeof data === 'object') {
				(data || []).forEach(function (item) {
					if (item.role !== ignore) {
						res += ((inline ? '<div class=\"n-line\"></div>' : "<li>") + ("<u>" + item.role + "</u>"));
						var childStr = [];
						item.child.forEach(function (i) {
							if (i.birthday || i.gender) {
								var result = [];
								if (i.gender === 1) result.push('男');
								if (i.gender === 2) result.push('女');
								if (i.birthday) result.push(f.time(i.birthday));
								childStr.push(i.name + "(" + result.join(" ") + ")");
							} else {
								childStr.push(i.name)
							}
						});
						res += (childStr.join('、') + (inline ? "" : "</li>"));
					}
				})
			}
			res += inline ? '</li>' : '';
			return res;
		},
		handleParties: function (data) {
			if (!data) return '--';
			var source = [];
			data.forEach(function (i) {
				if (source.length === 0) {
					source.push({
						index: source.length,
						role: i.role,
						roleType: i.roleType,
						child: [i]
					});
				} else {
					var _result = source.filter(function (item) {
						return item.role === i.role;
					})[0];
					if (_result) {
						source[_result.index].child.push(i);
					} else {
						source.push({
							index: source.length,
							role: i.role,
							roleType: i.roleType,
							child: [i]
						});
					}
				}
			});
			source.sort(function (a, b) {
				return a.roleType - b.roleType
			});
			return source;
		},
		disStatus: function (value, close) {
			var style = close ? 'right:-4px' : '';
			var dishonestStatus = '';
			if (value === 1) dishonestStatus = "<div class='img-icon'><span class=\"img-icon-dishonest img-icon-dishonest\" style=" + style + "></span></div>";
			if (value === 2) dishonestStatus = "<div class='img-icon'><span class=\"img-icon-dishonest img-icon-dishonest-ed\" style=" + style + "></span></div>";
			return dishonestStatus;
		},
		toRegStatus: function (val) {
			if (val) {
				if (val.match(/(存续|在业)/)) return 'regStatus-green';
				if (val.match(/(迁出|其他)/)) return 'regStatus-orange';
				if (val.match(/(撤销|吊销|清算|停业|注销)/)) return 'regStatus-red';
				return "";
			}
			return '';
		},
		toGetYearList:function (list,field) {
			if(list.length>5){
				list.sort(function (a,b) { return b.year-a.year;});
				var base = (list.slice(0, 4)).sort(function (a, b) {return a.year - b.year;});
				var other = list.slice(4);
				var otherText= other[0].year;
				var otherCount = 0;
				other.forEach(function (item) { otherCount+=item.count; });
				base.unshift({
					count:otherCount,
					year:otherText+'及以前'
				});
				return base;
			}
			if(field){
				list.sort(function (a, b) {return a[field] - b[field];})
			}
			list.forEach(function (item) {
				if (item.year === 0) item.year = '未知';
				if (/\d{4}/.test(item.year)) item.year=(item.year+'').replace(/(\d{4})/,'$1年');
			});
			return list;
		},
	};
	var w = function (value, o) {
		var option = o || {};
		if (value === '-') return (option.defaultWord || '-');
		var showStr = option.show ? option.prefix : '';
		return value ? ((option.prefix || '') + value + (option.unit || '')) : (showStr + (option.defaultWord || '-'));
	};
	// 枚举映射
	var mapping = {
		year: {label: 'year', value: 'count'},
		caseType: {label: 'type', value: 'count'},
		typeName: {label: 'typeName', value: 'count'},
	};
	var enumerate = {
		stock:[
			{id: 1, value: "股权持有人"},
			{id: 2, value: "股权质权人"},
		],
		mortgage: [
			{id: 1, value: "抵押物所有人"},
			{id: 2, value: "抵押权人"},
		],
		auctionType: [
			{id: 1, value: "即将开始"},
			{id: 3, value: "正在进行"},
			{id: 5, value: "已成交"},
			{id: 7, value: "已流拍"},
			{id: 9, value: "中止"},
			{id: 11, value: "撤回"},
		],
	};

	var matchReason = function (data) {
		var reason = data.reason;
		var pushType = data.pushType;
		if (reason) {
			var mStr = '';
			try {
				var _reason = JSON.parse(reason);
				var rs = {
					name: '',
					user_name: '',
				};
				_reason.forEach(function (item) {
					if (item.name) rs.name = item;
					if (item.used_name) rs.used_name = item;
				});
				if (pushType === 0) {
					mStr = (data.obligorName && TYPE === 'B' ? ("全文匹配，匹配债务人为" + data.obligorName) : '全文匹配')
				} else if (pushType === 1) {
					if (rs.name) mStr += rs.name.hl.join('、');
					if (rs.user_name) mStr += rs.user_name.hl.join('、');
				}
			} catch (e) {
			}
			return mStr || '-';
		}
		return "-";
	};
	var map = function (ary, field) {
		var array = ary || [];
		return array.map(function (i) {
			return field ? i[field] : i
		})
	};
	var bgImgSource = s.domainType[domainName] ? s.domainType[domainName].value : bgImgData;
	f.replaceHtml([
		{f: "../../_assets/img/watermark.png", v: bgImgSource},
		{f: "../../_assets/img/debtor.png", v: deIconData},
		{f: "../../_assets/img/person.png", v: personData},
		{f: "../../_assets/img/business.png", v: businessData},
		{f: "../../_assets/img/icon_dishonest_ed.png", v: disEdIconData},
		{f: "../../_assets/img/icon_shixin.png", v: disIconData},
		{f: "../../_assets/img/icon-accurate.png", v: accurateImgData},
		{f: "{base.queryTime}", v: f.time()}]);

	/* draw normal table */
	var drawTable = function (data, option) {
		var thStr = "<tr>";
		var trArray = [];
		option.forEach(function (i) {
			trArray.push(i.f);
			thStr += "<th " + (i.w ? ("style=\"width:" + i.w + "px\"") : '') + ">" + i.t + "</th>"
		});
		thStr += "</tr>";
		var trStr = '';

		data.forEach(function (i, index) {
			trStr += '<tr>';
			trArray.forEach(function (f) {
				var value = '';
				if (typeof f === 'function') value = f(i);
				else value = f === 'index' ? index + 1 : i[f];
				trStr += ('<td>' + (value || '-') + '</td>')
			});
			trStr += '</tr>';
		});
		return thStr + trStr;
	};

	var BB = {
		obligorName: function (item) {
			if (item) {
				var str = item.obligorName;
				str += (f.disStatus(item.dishonestStatus, 'close') +
					f.tag(item.bankruptcy ? '破产/重整风险' : '', 'regStatus-red'));
				return str;
			}
			return '-';

		},
		obligorPushType: function (item) {
			if (item) {
				return item.obligorPushType ? '开启' : '关闭';
			}
			return '-';
		},
		time: function (item) {
			if (item) {
				return f.time(item.changeTime) || "-";
			}
			return '-';
		}
	};

	/* handle tax parties */
	var handleTax = function (ary) {
		var id = TYPE === 'D' ? _dataSource['DB10101'].id : _dataSource['BB10101'].id;
		var result = {
			debtorIdentityTypeStr: [],
			parties: [],
			showTaxpayer: true,
		};
		(ary || []).forEach(function (i) {
			if (TYPE === 'B' && i.identityType === 1) result.showTaxpayer = false;
			if (i.obligorId === id) {
				if (i.identityType === 1) result.showTaxpayer = false;
				else {
					result.debtorIdentityTypeStr.push(s.identity[i.identityType])
				}
			}
			result.parties.push([
				{
					t: '当事人',
					cot: w(i.name, {unit: (i.name.length <= 4 ? ('（' + i.idNumber + '）') : '')}),
					ET: ET
				},
				{cot: f.tag(s.identity[i.identityType], 'marginLeft0')}
			])
		});
		return result;
	};

	/* return taxon html */
	var drawContent = function methods(option, data) {
		var taxon = option.id;
		var tableClass = (option.className || '') + (/I/.test(option.id) ? ' table-border' : '') + (/[AR]/.test(option.id) ? ' table-td-s-30' : '');
		var list = '';
		var dot = true;
		switch (taxon) {
			// 业务相关人列表
			case 'BB10102': {
				list = drawTable(data.list, [
					{t: '相关人名称', f: BB.obligorName},
					{t: '证件号/统一社会信用代码', f: 'obligorNumber'},
					{t: '角色', f: 'roleText'},
					{t: '推送状态', f: BB.obligorPushType},
				]);
				break;
			}
			// 关联业务列表 || 相关业务列表
			case 'DB10102': {
				list = drawTable(data.list, [
					{t: '业务编号', f: 'caseNumber'},
					{t: '债务人角色', f: 'roleText'},
					{t: '负责人/机构', f: 'orgName'},
				]);
				break;
			}
			// 资产拍卖_精准匹配
			case 'A10101':
			// 资产拍卖_模糊匹配
			case 'A10102': {
				data.list.forEach(function (i) {
					var process = i.process !== 0 ? (s.process[i.process] || {}) : {};
					var auction = s.auction[i.status] || {};
					var optionPrice = {unit: '元', defaultWord: '未知'};
					var priceSpan = "<span></span>"
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.tag(process.t, process.tag)
						+ f.normalList([
							{t: '匹配原因', cot: matchReason(i), dot: dot},
							{t: '审核备注', cot: i.remark},
						])
						+ "</td><td>"
						+ f.normalList([
							{cot: auction.t, dot: auction.dot},
							{t: '处置机关', cot: w(i.court, {defaultWord: "未知"})},
							{t: '开拍时间', cot: f.time(i.start, 's')},
							{t: '评估价', cot: w(f.threeDigit(i.consultPrice), optionPrice)},
							(i.status === 1 ? {t: '起拍价', cot: w(f.threeDigit(i.initialPrice), optionPrice)} : ''),
							(i.status === 5 ? {t: '成交价', cot: w(f.threeDigit(i.currentPrice), optionPrice)} : ''),
							((i.status !== 5 && i.status !== 1) ? {t: '当前价', cot: w(f.threeDigit(i.currentPrice), optionPrice)} : ''),
						]) + "</td></tr>";
				});
				break;
			}
			// 涉诉信息_立案
			case 'R20601':
			// 代位权_立案
			case 'A10201': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.caseNumber, i.url)
						+ f.tag(s.caseType[i.caseType], 'case-tag')
						+ f.normalList([
							{t: '立案日期', cot: i.gmtRegister},
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{t: '审理法院', cot: i.court}
						]) + "</td></tr>";
				});
				break;
			}
			// 涉诉信息_开庭
			case 'R20602':
			// 代位权_开庭
			case 'A10202': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.caseNumber, i.url)
						+ f.tag(i.caseReason)
						+ f.normalList([
							{t: '开庭日期', cot: i.gmtTrial},
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{t: '审理法院', cot: i.court}
						]) + "</td></tr>";
				});
				break;
			}
			// 涉诉信息_裁判文书
			case 'R20603':
			// 涉诉文书
			case 'R20604':
			// 代位权_裁判文书
			case 'A10203': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.tag(i.caseType, 'case-tag')
						+ f.tag(i.caseReason)
						+ f.normalList([
							[{t: '判决日期', cot: f.time(i.gmtJudgment)}, {t: '发布日期', cot: f.time(i.gmtPublish)}],
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{cot: i.caseNumber, dot: dot},
							{t: '审理法院', cot: i.court}
						]) + "</td></tr>";
				});
				break;
			}
			// 土地信息_出让结果
			case 'A10301': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.projectName, i.url)
						+ f.tag(i.landUse)
						+ f.normalList([
							{cot: (w(i.administrativeRegion) + ' ' + w(i.landAddress))},
							{t: '土地使用权人', cot: i.obligorName, ET: ET},
							[
								{t: '签订日期', cot: f.time(i.singedTime)},
								{t: '面积', cot: w(i.landArea, {unit: '公顷'})},
								{t: '使用年限', cot: w(i.transferTerm, {unit: '年'})},
							]
						])
						+ f.partiesList(f.handleParties(i.parties))
						+ "</td><td>" + f.normalList([
							{cot: w(i.finalPrice, {unit: '万元', prefix: '成交价格：', show: true}), dot: 'success'},
							{t: '批准单位', cot: i.approver},
							{t: '供地方式', cot: i.supplyWay},
						]) + "</td></tr>";
				});
				break;
			}
			// 土地信息_土地转让
			case 'A10302': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.landAddress, i.url)
						+ f.tag(i.landUse)
						+ f.normalList([{cot: w(i.administrativeRegion)}])
						+ f.partiesList(f.handleParties(i.parties))
						+ f.normalList([
							[
								{t: '成交日期', cot: f.time(i.dealingTime),},
								{t: '面积', cot: w(i.landArea, {unit: '公顷'})},
								{t: '使用年限', cot: w(i.landUsageTerm, {unit: '年'})}
							]
						])
						+ "</td><td>" + f.normalList([
							{cot: w(i.transferPrice, {unit: '万元', prefix: '转让价格：', show: true}), dot: 'success'},
							{t: '转让方式', cot: i.transferMode},
						]) + "</td></tr>";
				});
				break;
			}
			// 土地信息_土地抵押
			case 'A10303': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.landAddress, i.url)
						+ f.tag(i.landUse)
						+ f.normalList([{cot: w(i.administrativeRegion)}])
						+ f.partiesList(f.handleParties(i.parties))
						+ f.normalList([
							[
								{t: '登记日期', cot: f.time(i.startTime)},
								{t: '面积', cot: w(i.landArea, {unit: '公顷'})},
								{t: '评估金额', cot: w(i.consultPrice, {unit: '万元'})},
							],
							{t: '土地使用权证号', cot: w(i.landUseCertificateNumber)}
						])
						+ "</td><td>" + f.normalList([
							{cot: w(i.mortgageAmount, {unit: "万元", prefix: '抵押金额：', show: true}), dot: 'success'},
							{t: '抵押面积', cot: w(i.mortgageArea, {unit: '公顷'})},
							{t: '土地他项权证号', cot: w(i.otherObligeeCertificateNumber)},
							{t: '登记结束日期', cot: f.time(i.endTime)},
						]) + "</td></tr>";
				});
				break;
			}
			// 无形资产_排污权
			case 'A10401': {
				data.list.forEach(function (i) {
					var gmtValidityPeriod = (i.gmtValidityPeriodEnd && i.gmtValidityPeriodStart)
						? (i.gmtValidityPeriodStart + ' 至 ' + i.gmtValidityPeriodEnd) : '-';
					var statusInfo = i.status === '正常' ? [{cot: '正常', dot: 'success'}] : [
						{cot: i.status, dot: dot},
						{t: (i.status + '原因'), cot: i.reason},
						{t: (i.status + '时间'), cot: i.gmtIssueTime},
					];
					list += "<tr><td>"
						+ f.urlDom(i.licenseNumber, i.url)
						+ f.normalList([
							{cot: i.industry},
							[
								{t: '持证单位', cot: i.companyName, ET: ET},
								{t: '发证日期', cot: i.gmtPublishTime},
								{t: '有效期', cot: gmtValidityPeriod}
							]
						])
						+ "</td><td>" + f.normalList(statusInfo) + "</td></tr>";
				});
				break;
			}
			// 无形资产_矿业权
			case 'A10402': {
				data.list.forEach(function (i) {
					var gmtValidityPeriod = (i.gmtValidityPeriodEnd && i.gmtValidityPeriodStart)
						? (i.gmtValidityPeriodStart + ' 至 ' + i.gmtValidityPeriodEnd) : '-';
					list += "<tr><td>"
						+ f.urlDom(i.licenseNumber, i.url)
						+ f.tag(s.certificateType[i.certificateType])
						+ f.normalList([
							{cot: (w(i.mineralSpecies) + ' ' + w(i.projectName))},
							[
								{t: '探/采矿权人', cot: i.rightsHolder, ET: ET},
								{t: '发布日期', cot: i.gmtPublishTime},
								{t: '有效期', cot: gmtValidityPeriod},
								{t: '面积', cot: i.area ? f.threeDigit(i.area, '平方米') : '-'},
							]
						])
						+ "</td></tr>";
				});
				break;
			}
			// 无形资产_商标专利
			case 'A10403': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.rightsName, i.url)
						+ f.tag(s.rightsType[i.rightsType])
						+ f.normalList([{t: '申请人/权利人', cot: i.obligorName, ET: ET},])
						+ "</td><td>" + f.normalList([{t: '公告日期', cot: i.noticeTime}]) + "</td></tr>";
				});
				break;
			}
			// 无形资产_建筑建造资质
			case 'A10404': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.qualificationName, i.url)
						+ f.normalList([
							{cot: (w(i.qualificationType) + ' ' + w(i.qualificationLevel))},
							[
								{t: '持证单位', cot: i.obligorName, ET: ET},
								{t: '发布日期', cot: i.issueTime},
								{t: '有效期', cot: i.validityPeriod},
								{t: '证书编号', cot: i.certificateNumber},
							]
						])
						+ "</td></tr>";
				});
				break;
			}
			// 股权质押_股权出质
			case 'A10501': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom('股权标的企业 ' + (i.companyName || '未公示'))
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '出质人', cot: (i.pledgorList ? map(i.pledgorList, 'pledgor').join('、') : '-'), ET: ET},
								{t: '质权人', cot: (i.pledgeeList ? map(i.pledgeeList, 'pledgee').join('、') : '-')},
								{t: '出质股权数额', cot: w(i.equityAmount)},
							],
						])
						+ "</td><td>" + f.normalList([
							{
								cot: w((i.state === 0 ? '有效' : '无效'), {unit: (i.state === 0 ? '（<u>匹配时间</u>' + f.time(i.gmtCreate) + '）' : '')}),
								dot: i.state === 0 ? 'success' : 'dot'
							},
							{t: '登记编号', cot: w(i.regNumber)},
						]) + "</td></tr>";
				});
				break;
			}
			// 不动产登记-精准匹配
			case 'A11001': {
				data.list.forEach(function (i) {
					var roleName = s.realEstateRoleType[i.role];
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.normalList([
							[
								{t: '权证类型', cot: i.certificateType},
								{t: '权证号', cot: i.certificateNumber},
							],
							[
								{t: '债务人角色', cot: roleName},
								{t: '不动产坐落', cot: i.realEstateLocated}
							]
						])
						+ "</td><td>" + f.normalList([
							{t: '发布日期', cot: i.publishTime},
						]) + "</td></tr>";
				});
				break;
			}
			// 不动产登记-模糊匹配
			case 'A11002': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.normalList([
							[
								{t: '权证类型', cot: i.certificateType},
								{t: '权证号', cot: i.certificateNumber},
							],
							{t: '不动产坐落', cot: i.realEstateLocated}
						])
						+ "</td><td>" + f.normalList([
							{t: '发布日期', cot: i.publishTime},
						]) + "</td></tr>";
				});
				break;
			}
			// 车辆信息
			case 'A12001': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.vehicleNumber, i.url)
						+ f.tag(i.vehicleType)

						+ "</td><td>" + f.normalList([
							{t: '公示日期', cot: i.publishTime},
						]) + "</td></tr>";
				});
				break;
			}
			// 股权质押_股权质权
			case 'A10502': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom('股权标的企业 ' + (i.companyName || '未公示'))
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '质权人', cot: (i.pledgeeList ? map(i.pledgeeList, 'pledgee').join('、') : '-'), ET: ET},
								{t: '出质人', cot: (i.pledgorList ? map(i.pledgorList, 'pledgor').join('、') : '-')},
								{t: '出质股权数额', cot: w(i.equityAmount)},
							],
						])
						+ "</td><td>" + f.normalList([
							{
								cot: w((i.state === 0 ? '有效' : '无效'), {unit: (i.state === 0 ? '（<u>匹配时间</u>' + f.time(i.gmtCreate) + '）' : '')}),
								dot: i.state === 0 ? 'success' : 'dot'
							},
							{t: '登记编号', cot: w(i.regNumber)},
						]) + "</td></tr>";
				});
				break;
			}
			// 动产抵押_抵押
			case 'A10601': {
				data.list.forEach(function (i) {
					var statusInfo = i.status ? [
						{cot: w('有效', {unit: '（<u>匹配时间</u>' + f.time(i.gmtCreate) + '）'}), dot: 'success'},
						{t: '登记编号', cot: i.regNum},
					] : [
						{cot: '无效', dot: dot},
						{t: '注销时间', cot: f.time(i.cancelDate)},
						{t: '注销原因', cot: i.cancelReason},
						{t: '登记编号', cot: i.regNum},
					];
					list += "<tr><td>"
						+ f.urlDom('抵押物 ' + i.pawnName || '-')
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '抵押物所有人', cot: i.owner, ET: ET},
								{t: '抵押权人', cot: i.people},
							],
							[
								{t: '担保债权数额', cot: w(f.threeDigit(i.amount), {unit: '元'})},
								{t: '债务人履行债务的期限', cot: w(i.term)},
							]
						])
						+ "</td><td>" + f.normalList(statusInfo) + "</td></tr>";
				});
				break;
			}
			// 动产抵押_抵押权
			case 'A10602': {
				data.list.forEach(function (i) {
					var statusInfo = i.status ? [
						{cot: w('有效', {unit: '（<u>匹配时间</u>' + f.time(i.gmtCreate) + '）'}), dot: 'success'},
						{t: '登记编号', cot: i.regNum},
					] : [
						{cot: '无效', dot: dot},
						{t: '注销时间', cot: f.time(i.cancelDate)},
						{t: '注销原因', cot: i.cancelReason},
						{t: '登记编号', cot: i.regNum},
					];
					list += "<tr><td>"
						+ f.urlDom('抵押物 ' + i.pawnName || '-')
						+ f.normalList([
							{t: '登记日期', cot: f.time(i.regDate)},
							[
								{t: '抵押权人', cot: i.people, ET: ET},
								{t: '抵押物所有人', cot: i.owner},
							],
							[
								{t: '担保债权数额', cot: w(i.amount, {unit: '元'})},
								{t: '债务人履行债务的期限', cot: w(i.term)},
							]
						])
						+ "</td><td>" + f.normalList(statusInfo) + "</td></tr>";
				});
				break;
			}
			// 招投标
			case 'A10701':
			// 环保处罚
			case 'R30701': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.normalList([{t: '相关单位', cot: i.obName, ET: ET},])
						+ "</td><td>" + f.normalList([{t: '发布日期', cot: f.time(i.publishTime)}]) + "</td></tr>";
				});
				break;
			}
			// 金融资产_竞价项目
			case 'A10801': {
				data.list.forEach(function (i) {
					var auction = s.auction[i.status] || {};
					var optionPrice = {unit: '元', defaultWord: '未知'};
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ "</td><td class='financialbid'>" + f.normalList([
							{cot: auction.t, dot: auction.dot},
							{t: '评估价', cot: w(f.threeDigit(i.consultPrice), optionPrice)},
							{t: (i.status === 5 ? '成交价': '当前价'), cot: w(f.threeDigit(i.currentPrice), optionPrice)},
							{t: '开拍时间', cot: f.time(i.start, 's')},
							{t: '结束时间', cot: f.time(i.end, 's')},
						], i.status === 5 ? 2: '', 'success') + "</td></tr>";
				});
				break;
			}
			// 金融资产_招商项目
			case 'A10802': {
				data.list.forEach(function (i) {
					var category = s.category[i.category] || "";
					var auction = s.auction[i.status] || {};
					list += "<tr><td class=\"" + (i.accurateType === 1 ? "accurate " : "" )+ "p-top-space\">"
						+ ( category ? f.tag(category, 'horizontal-space') : '')
						+ f.urlDom(i.title, i.url)
						+ "</td><td>" + f.normalList([
							{cot: auction.t, dot: auction.dot},
							{t: '发布日期', cot: i.publishTime},
						]) + "</td></tr>";
				});
				break;
			}
			// 金融资产_公示项目
			case 'A10803': {
				data.list.forEach(function (i) {
					var projectType = s.projectType[i.projectType + ''] || {};
					list += "<tr><td>"
						+ f.tag(projectType, 'right-space')
						+ f.urlDom(i.title, i.sourceUrl)
						+ "</td><td>" + f.normalList([
							{t: '发布日期', cot: i.gmtPublish},
						]) + "</td></tr>";
				});
				break;
			}
			// 在建工程_建设单位
			case 'A13001': {
				data.list.forEach(function (i) {
					var projectTypeName = s.projectUnitType[i.projectType];
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.tag(projectTypeName)
						+ f.normalList([
							[
								{t: '建设性质', cot: i.nature},
								{t: '总投资', cot: w(f.threeDigit(i.totalInvestment), {unit: '元'}) },
							],
							{t: '项目所在地', cot: i.projectLocation},
						])
						+ "</td><td>" + f.normalList([
							{t: '计划开工日期', cot: i.planBeginTime},
						]) + "</td></tr>";
				});
				break;
			}
			// 在建工程_中标单位
			case 'A13002': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.normalList([
							[
								{t: '招标类型', cot: i.biddingType},
								{t: '招标方式', cot: i.biddingMode},
								{t: '中标金额', cot: w(f.threeDigit(i.winningPrice), {unit: '元'}) },
							],
						])
						+ "</td><td>" + f.normalList([
							{t: '中标日期', cot: i.winningTime},
						]) + "</td></tr>";
				});
				break;
			}
			// 在建工程_施工单位
			case 'A13003': {
				data.list.forEach(function (i) {
					var roleList = '';
					i.parties[0].role.forEach(function (it, index) {
						var punctuation = index === i.parties[0].role.length - 1 ? '' : '，';
						roleList += s.roleType[it] + punctuation;
					});
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.normalList([
							[
								{t: '角色', cot: roleList},
								{t: '合同金额', cot: w(f.threeDigit(i.contractPrice), {unit: '元'}) },
								{t: '合同工期', cot: i.projectPeriod},
							],
							i.projectLocation && {t: '项目所在地', cot: i.projectLocation},
						])
						+ "</td><td>" + f.normalList([
							{t: '发证日期', cot: i.issuingTime},
						]) + "</td></tr>";
				});
				break;
			}
			// 查/解封资产
			// i.dataType： 2 文书 1：不动产
			case 'A10901': {
				tableClass = '';
				data.list.forEach(function (i) {
					var unblockTitle = i.dataType === 2 ? f.urlDom(i.title, i.url) : (i.information ? i.information : i.address);
					list += "<tr><td>"
						+ unblockTitle
						+ "</td>" +
						"<td class=\"w-200\">" + f.normalList([
							{t: '关联案号', cot: i.caseNumber},
							{t: '执行法院', cot: i.court},
						]) + "</td>" +
						"<td class=\"w-200\">" + f.normalList([
							i.dataType === 2 ? {t: '判决日期', cot: i.judementTime} : {t: '查封日期', cot: i.sealUpTime},
							i.dataType === 2 ? {t: '发布日期', cot: i.publishTime} : {t: '解封日期', cot: i.unsealingTime},
						]) + "</td></tr>";
				});
				break;
		}
			// 破产重组
			case 'R30201': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.title, i.url)
						+ f.normalList([[
							{t: '破产/重整风险企业', cot: i.obligorName, ET: ET},
							{t: '发布日期', cot: f.time(i.publishDate)}
						]])
						+ "</td><td>" + f.normalList([{t: '受理法院', cot: i.court}]) + "</td></tr>";
				});
				break;
			}
			// 失信记录_列入
			case 'R20401':
			// 失信记录_已移除
			case 'R20402': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.caseCode, i.url)
						+ f.normalList([
							[
								{t: '债务人', cot: i.name, ET: ET},
								{t: '失信被执行人行为具体情形', cot: i.disruptType}
							],
							{t: '生效法律文书确定义务', cot: i.duty},
							{t: '被执行人的履行情况', cot: i.performance}
						])
						+ "</td><td>" + f.normalList([
							{t: '执行法院', cot: f.time(i.court)},
							{t: '发布日期', cot: f.time(i.gmtPublishDate)},
						]) + "</td></tr>";
				});
				break;
			}
			// 限制高消费
			case 'R20501': {
				data.list.forEach(function (i) {
					// 1：企业 2：个人
					var associatedObject = i.obligorType === 1 ? i.personName : i.companyName;
					list += "<tr>"
						+ "<td>"
						+ "<li>" + i.caseNumber + "</li>"
						+ f.normalList(i.obligorType === 2 && !i.companyName ? [] : [
							{t: '关联对象', cot: associatedObject}
						])
						+ "</td>"
						+ "<td>" + f.normalList([
							{t: '立案日期', cot: i.registerDate},
						]) + "</td>"
						+ "</tr>";
				});
				break;
			}
			// 经营异常
			case 'R30301': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.putReason)
						+ f.normalList([
							[
								{t: '相关单位', cot: i.name, ET: ET},
								{t: '列入日期', cot: f.time(i.gmtPutDate)},
							],
							{t: '决定机关', cot: i.putDepartment},
						])
						+ "</td><td>" + f.normalList(i.gmtRemoveDate ? [
							{dot: dot, cot: '已移除'},
							{t: '移除日期', cot: f.time(i.gmtRemoveDate)},
							{t: '移除原因', cot: i.removeReason},
							{t: '移除机关', cot: i.removeDepartment},
						] : [
							{dot: 'success', cot: '未移除'},
						]) + "</td></tr>";
				});
				break;
			}
			// 严重违法
			case 'R30401': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.type)
						+ f.normalList([
							{t: '相关单位', cot: i.name, ET: ET},
							[
								{t: '列入日期', cot: f.time(i.gmtPutDate)},
								{t: '决定机关', cot: i.putDepartment},
							],
							{t: '列入原因', cot: w(i.putReason)},
							{t: '具体事实', cot: i.fact},
						])
						+ "</td><td>" + f.normalList(i.gmtRemoveDate || i.removeReason || i.removeDepartment ? [
							{dot: dot, cot: '已移除'},
							{t: '移除日期', cot: f.time(i.gmtRemoveDate)},
							{t: '移除原因', cot: w(i.removeReason)},
							{t: '移除机关', cot: w(i.removeDepartment)},
						] : [
							{dot: 'success', cot: '未移除'},
						]) + "</td></tr>";
				});
				break;
			}
			// 税收违法
			case 'R30501': {
				data.list.forEach(function (i) {
					var resParty = handleTax(i.parties);
					var taxStr = (i.taxpayers || []).join('、');
					var TypeStr = '';
					resParty.debtorIdentityTypeStr.forEach(function (i) {
						if (i && ET !== 'B') TypeStr += f.tag(i, '')
					});
					list += "<tr><td>"
						+ f.urlDom(i.caseNature, i.url)
						+ TypeStr
						+ (ET === 'B' ? f.normalList(resParty.parties) : '')
						+ f.normalList([
							{t: '违法事实', cot: w(i.illegalFacts)},
							{t: '处罚情况', cot: w(i.punish)},
						])
						+ "</td><td>" + f.normalList([
							(resParty.showTaxpayer ? {dot: dot, cot: w(taxStr, {prefix: '纳税人：'})} : ''),
							{t: '发布日期', cot: f.time(i.publishDate)},
						]) + "</td></tr>";
				});
				break;
			}
			// 行政处罚
			case 'R30601': {
				data.list.forEach(function (i) {
					list += "<tr><td>"
						+ f.urlDom(i.type)
						+ f.normalList([
							{t: '相关单位', cot: i.obligorName, ET: ET},
							{t: '决定文书号', cot: i.punishNumber},
							{t: '处罚内容', cot: i.content},
						])
						+ "</td><td>" + f.normalList([
							{t: '决定机关', cot: i.departmentName},
							{t: '决定日期', cot: f.time(i.decisionDate)},
						]) + "</td></tr>";
				});
				break;
			}
			// 基本信息
			case 'I50101': {
				list = "<tr><td>法定代表人</td><td>{legalPerson}</td><td>组织机构代码</td><td>{orgNumber}</td></tr><tr><td>统一社会信用代码</td><td>{creditCode}</td><td>纳税人识别号</td><td>{taxNumber}</td></tr><tr><td>成立日期</td><td>{establishTime}</td><td>营业期限</td><td>{timeLimit}</td></tr><tr><td>注册资本</td><td>{regCapital}</td><td>实缴资本</td><td>{actualCapital}</td></tr><tr><td>经营状态</td><td>{regStatus}</td><td>登记机关</td><td>{regInstitute}</td></tr><tr><td>企业类型</td><td>{companyOrgType}</td><td>核准日期</td><td>{approvedTime}</td></tr><tr><td>所属行业</td><td>{industry}</td><td>工商注册号</td><td>{regNumber}</td></tr><tr><td>人员规模</td><td>{scale}</td><td>参保人数</td><td>{insuranceNum}</td></tr><tr><td>英文名</td><td>{englishName}</td><td>注册地址</td><td>{regLocation}</td></tr><tr><td>经营范围</td><td colspan='3'>{businessScope}</td></tr>";
				["legalPersonName", "regStatus", "regCapital", "establishTime", "regLocation", "legalPerson", "orgNumber", "creditCode", "taxNumber", "establishTime", "regCapital", "actualCapital", "regStatus", "regInstitute", "companyOrgType", "approvedTime", "industry", "regNumber", "scale", "insuranceNum", "englishName", "businessScope", "regLocation"].forEach(function (item) {
					list = list.replace("{" + item + "}", data[item] || '-')
				});
				var timeLimit = (source.fromTime && source.toTime) ? ("自 " + (source.fromTime || '-') + " 至 " + (source.toTime || '-')) : "-";
				list = list.replace("{timeLimit}", timeLimit);
				break;
			}
			// 主要人员
			case 'I50201': {
				list = drawTable(data, [
					{t: '序号', f: 'index', w: '40'},
					{t: '姓名', f: 'name'},
					{t: '职务', f: 'job'}
				]);
				break;
			}
			// 股东信息
			case 'I50301': {
				list = drawTable(data, [
					{t: '序号', f: 'index', w: 40},
					{t: '股东基本信息', f: 'name'},
					{t: '出资比例', f: 'rate'},
					{t: '认缴出资额', f: 'amount'},
				]);
				break;
			}
			// 分支机构
			case 'I50501': {
				list = drawTable(data.list, [
					{t: '序号', f: 'index', w: 40},
					{t: '机构名称', f: 'companyName'},
					{t: '法定代表人', f: 'legalName'},
					{t: '注册资本', f: 'regCapital'},
					{t: '注册时间', f: 'regTime', w: 90},
					{t: '经营状态', f: 'regStatus'}
				]);
				break;
			}
			// 对外投资
			case 'I50601': {
				list = drawTable(data.list, [
					{t: '序号', f: 'index', w: 40},
					{t: '对外投资企业名称', f: 'companyName'},
					{t: '法定代表人', f: 'legalName'},
					{t: '注册资本', f: 'regCapital'},
					{t: '投资占比', f: 'rate'},
					{t: '注册时间', f: 'regTime', w: 90},
					{t: '经营状态', f: 'regStatus'}
				]);
				break;
			}
			// 工商变更
			case 'I50701': {
				list = drawTable(data.list, [
					{t: '序号', f: 'index', w: 30},
					{t: '变更日期', f: BB.time, w: 90},
					{t: '变更事项', f: 'changeItem', w: 70},
					{t: '变更前内容', f: 'contentBefore'},
					{t: '变更后内容', f: 'contentAfter'}
				]);
				break;
			}
			default : {
			}
		}
		return tableClass ? ("<table class='" + tableClass + "'>" + list + "</table>") : ("<table>" + list + "</table>");
	};

	/* creat child Container  */
	var childContainer = function (option, source) {
		var count = typeof source === 'object' ? (source.total || source.length || 0) : 0;
		if ((count !== 0 || option.show) && source) {
			var title = option.title + (count ? '  ' + count : '');
			return "<div><div class=\"title\"><div class=\"t2\">" + title + "</div>" +
				"</div><div class=\"content\">" + drawContent(option, source) + "</div></div>"
		}
		return ''
	};

	/* main logic entry */
	var aboutList = function (title, source, option) {
		return "<div><div class=\"title\"><div class=\"t2\">" + title + "</div>" +
			"</div><div class=\"content\">" + drawContent(option, source) + "</div></div>"
	};

	var item = _dataSource[TYPE + 'B10101'] || {};
	// 基本信息
	if (TYPE === 'B') {
		f.replaceHtml([
			{f: '{base.logo}', v: item.logoUrl || ''},
			{f: '{base.logo-icon}', v: 'business-img'},
			{f: '{base.content-type}', v: 'content-max'},
			{
				f: '{base.content}', v: (
					f.urlDom(('业务编号：' + item.caseNumber || '-')) +
					f.tag(item.businessPushType ? '当前推送状态：开启' : '当前推送状态：关闭', !item.businessPushType ? 'regStatus-gray' : '') +
					f.normalList([
						[
							{
								t: '借款人',
								cot: w(item.obligorName) + f.disStatus(item.dishonestStatus, 'close') + f.tag(item.bankruptcyStatus ? '破产/重整风险' : '', 'regStatus-red')
							},
							{t: '证件号/统一社会信用代码', cot: w(item.obligorNumber)},
							{t: '借款人推送状态', cot: w(item.obligorPushType ? '开启' : '关闭')},
						],
						[
							{t: '负责人/机构', cot: item.orgName},
							{t: '上传时间', cot: item.uploadTime},
						],
					])
				)
			},
			{
				f: '{about.list}', v: aboutList('业务相关人列表',
					{list: _dataSource["BB10102"] || []},
					{id: 'BB10102', className: 'table-border', show: true}
				)
			}]);
	}
	if (TYPE === 'D') {
		if (Status === 'E') {
			f.replaceHtml([
				{f: '{base.logo}', v: item.logoUrl?("<img src=\""+item.logoUrl+"\" alt=\"\">"):''},
				{f: '{base.logo-icon}', v: item.logoUrl?"":'debtor-img'},
				{f: '{base.content-type}', v: 'content-max'},
				{
					f: '{base.content}', v: (
						f.urlDom(item.obligorName) +
						f.disStatus(item.dishonestStatus, 'close') +
						f.tag(item.regStatus, f.toRegStatus(item.regStatus)) +
						f.tag(item.limitConsumption ? '已限高' : '', 'regStatus-orange') +
						f.tag(item.bankruptcy ? '破产/重整风险' : '', 'regStatus-red') +
						f.tag(item.pushState ? '当前推送状态：开启' : '当前推送状态：关闭', !item.pushState ? 'regStatus-gray' : '') +
						f.normalList([
							[
								{t: '法定代表人', cot: item.legalPersonName},
								{t: '注册资本', cot: w(item.regCapital)},
								{t: '成立日期', cot: w(item.establishTime)},
							],
							(item.usedName || []).length ? {t: '曾用名', cot: (item.usedName.join('、'))} : null])
					)
				}
			]);
		} else {
			f.replaceHtml([
				{f: '{base.logo}', v: ''},
				{f: '{base.logo-icon}', v: 'person-img'},
				{f: '{base.content-type}', v: 'content-min'},
				{
					f: '{base.content}', v: (
						f.urlDom(item.obligorName) +
						f.disStatus(item.dishonestStatus, 'close') +
						f.tag(item.limitConsumption ? '已限高' : '', 'regStatus-orange') +
						f.tag(item.pushState ? '当前推送状态：开启' : '当前推送状态：关闭', !item.pushState ? 'regStatus-gray' : '') +
						f.normalList([{t: '证件号', cot: item.obligorNumber}])
					)
				}
			]);
		}
		// 关联业务列表
		f.replaceHtml([{
			f: '{about.list}', v: aboutList(
				(Status === 'E' ? '关联业务列表' : '相关业务列表'),
				{list: _dataSource["DB10102"] || []},
				{id: 'DB10102', className: 'table-border', show: true}
			)
		}]);
	}

	// 计算子项总数
	var getCount = function (i,field) {
		var total = 0;
		(i||[]).forEach(function (item) { total += (item||{})[field]; });
		return total;
	};
	var getCountObj = function (i,fields) {
		var total = 0;
		(fields||[]).forEach(function (item) { total +=((i||{})[item]||0) });
		return total;
	};


	// overview 概览模块
	// item 里面有name, about, status, child(里面有三个子对象)
	var drawOverview = function (item){
		/*
		* config 里面是配置
		* config.prefix 前缀
		* config.suffix 后缀
		* config.title 标题
		* config.col 列 只需要传入列就可以了，不需要传入行数
		**/
		var drawOverViewTable = function(data, config) {
			if(!data){
				return '';
			}
			if(Array.isArray(data) && data.length === 0){
				return '';
			}
			var title = config.title ? "<li class='f-b'>" + config.title + "</li>" : '';
			if(config.col > 0){
				var row = Math.ceil(data.length / config.col);
				var res = [];
				for(var i = 1; i <= row; i += 1){
					var childList = (data || []).slice(config.col * i - config.col, config.col* i);
					var childRes = "<tr>";
					if(childList.length < config.col){
						childList = childList.concat(new Array(config.col - childList.length));
					}
					(childList || []).forEach(function (item) {
						if(item){
							childRes += item.count > 0 ? ("<td><span class=\"mg-r\">" + item.label  + "：</span>" +
								"<span class=\"fw-bold \">" + item.count + "</span><span>条" + (Array.isArray(config.remark) && config.remark.length && item.invalidCount> 0 ? "<span class=\"remark\">(" + config.remark[0] + item.invalidCount + config.remark[1] + ")</span>" : '') + "</span></td>") : '';
						}
						else {
							childRes +="<td></td>";
						}
					});
					childRes += "</tr>";
					res.push(childRes);
				}
				var selfColTable =  res.length > 0 ? "<table class='table-border'>" + res.join("") + "</table>" : null;
				return "<div class='content'>" + title + selfColTable + "</div>";
			}
			else {
				var content = "";
				(data || []).forEach(function (item) {
					content += "<td>" + item.label + "：<span class='f-b'>" + item.count + "</span> 条 </td>";
				});
				var table = "<table class='table-border'><tr>" + content + "</tr></table>";
				return "<div class='content'>" + title + table + "</div>";
			}
		};

		var getBaseInfo = function (data, config) {
			if(!data){
				return ''
			}
			var content = "<tr><td>成立日期</td><td>{establishTime}</td><td>法人</td><td>{legalPersonName}</td></tr><tr><td>注册资本</td><td>{regCapital}</td><td>注册地址</td><td>{regLocation}</td></tr><tr><td>企业状态</td><td colspan='3'>{regStatus}</td></tr>";
			["establishTime", "legalPersonName", "regCapital", "regLocation", "regStatus"].forEach(function (item) {
				content = content.replace("{" + item + "}", data[item] || '-')
			});
			if ((config.show) && data) {
				return "<div class=\"entry-title\"><div class=\"title\">" +
					"</div><div class=\"content\">" + "<table class=\"table-border mg8 table-baseInfo\">" + content + "</table>" + "</div></div>"
			}
		};

		// 股东情况
		var getShareholder = function (data, option) {
			if(!data){
				return '';
			}
			var list = drawTable(data, [
				{t: '序号', f: 'index', w: 40},
				{t: '股东基本信息', f: 'name'},
				{t: '出资比例', f: 'rate'},
				{t: '认缴出资额', f: 'amount'},
			]);
			if (data && list) {
				return "<div><div class=\"content\"><table class=\"table-border\">" + list + "</table></div></div>"
			}
		};

		var peopleInfo = function (data, config) {
			var content = "<tr><td>人员规模</td><td>{employeeNum}</td></tr>";
			["employeeNum"].forEach(function (item) {
				content = content.replace("{" + item + "}", data[item] || '-')
			});
			if ((config.show) && data) {
				return "<div class=\"entry-title\"><div class=\"title\">" +
					"</div><div class=\"content\">" + "<table class=\"table-border mg8 table-baseInfo\">" + content + "</table>" + "</div></div>"
			}
		};

		var getLabel = function (data, type) {
			if(Array.isArray(data)){
				for (var i = 0; i < data.length; i++){
					if(data[i].id === type){
						return data[i].value;
					}
				}
			}
			else {
				return '';
			}
		};

		var changeYear = function (data) {
			var list = [];
			// 判断year是否有效，如果不是有效字段，归为之以前的数据
			data.forEach(function (item) {
				if (item.year !== 0 && item.year){
					list.push(item);
				}
				else {
					list.push({year: 0, count: item.count});
				}
			});
			if(list.length > 5){
				list.sort(function (a,b) { return b.year - a.year;});
				var base = (list.slice(0, 4)).sort(function (a, b) {return a.year - b.year;});
				var other = list.slice(4);
				var otherText= other[0].year;
				var otherCount = 0;
				other.forEach(function (item) { otherCount += item.count; });
				base.unshift({
					count: otherCount,
					year: otherText + '及以前'
				});
				base.forEach(function (item) {
					if (/\d{4}/.test(item.year)) item.year= (item.year + '').replace(/(\d{4})/,'$1年');
				});
				return base;
			}
			list.forEach(function (item) {
				if (item.year === 0 || !item.year) item.year = '未知';
				if (/\d{4}/.test(item.year)) item.year= (item.year + '').replace(/(\d{4})/,'$1年');
			});
			return list;
		};

		// 转换映射，将映射值转成{label: '', count: ''}
		var mappingData = function (data, keyValue) {
			if(!data){
				return '';
			}
			if( Array.isArray(data) && data.length === 0){
				return '';
			}
			var newData = [];
			var _data = [];
			if(Array.isArray(keyValue)){
				(data || []).forEach(function(item) {
					var opItem = item;
					opItem.label = getLabel(keyValue, item.type);
					newData.push(opItem);
				})
			}
			else {
				if(keyValue === mapping.year){
					_data = changeYear(data);
					_data.forEach(function (item) {
						newData.push({
							label: item[keyValue.label],
							count: item[keyValue.value]
						});
					});
				}
				else {
					(data || []).forEach(function (item) {
						newData.push({
							label: item[keyValue.label],
							count: item[keyValue.value]
						});
					});
				}
			}
			return newData;
		};

		var intangibleAssetsMap = {
			emission: { label: "排污权" },
			mining: { label: "矿业权" },
			construct: { label: "建筑建造资质" },
			trademark: { label: "商标专利" },
		};

		var businessRisk = {
			abnormal: { label: '经营异常'},
			change: {label: '工商变更'},
			punishment: {label: '行政处罚'},
			tax: { label: '税收违法'},
			illegal: {label: '严重违法'},
			epb: { label: '环保处罚'},
		};

		// 没有标题的表格映射
		var noTitleTable = function (data, mapData) {
			var newData = [];
			Object.keys(data || {}).forEach(function(item){
				if(data[item] > 0 && mapData[item]){
					newData.push({label: mapData[item].label, count: data[item]});
				}
			});
			return newData;
		};

		// 绘制具体子项内容 - 3级
		var drawItem = function (option, data) {
			if(!data){
				return '';
			}
			if(JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]'){
				return '';
			}
			var taxon = option.id;
			var count = 0;
			var showCount = '';
			var html = '';
			switch (taxon) {
				// 资产拍卖
				case "DO10100": {
					count = data.count;
					showCount = count > 0;
					html += data.auctionResults.length > 0 ? drawOverViewTable(mappingData(data.auctionResults, enumerate.auctionType), {title: '拍卖结果分布', col: 4 }) : null;
					html += data.roleDistributions.length > 0 ? drawOverViewTable(mappingData(data.roleDistributions, mapping.typeName), {title: '角色分布' }) : null;
					break;
				}
				// 代位权
				case "DO10200":{
					count = data.count;
					showCount = count > 0;
					html += data.yearDistribution ? drawOverViewTable(mappingData(data.yearDistribution, mapping.year), {title: '年份分布'}, {suffix: '年'} ) : '';
					html += data.caseReasons ? drawOverViewTable(mappingData(data.caseReasons, mapping.caseType), {title: '案由分布', col: 4}) : '';
					html += data.caseTypes ? drawOverViewTable(mappingData(data.caseTypes, mapping.caseType), {title: '案件类型分布', col: 4}) : '';
					break;
				}
				// 土地信息
				case "DO10300":{
					count = getCount(data.infoTypes, 'count') || getCount(data.roleDistributions, 'count') || getCount(data.yearDistributions, 'count');
					showCount = count > 0;
					html += data.infoTypes ? drawOverViewTable(mappingData(data.infoTypes, mapping.typeName), {title: '信息类型分布', col: 4}) : '';
					html += data.visualRoleDistributions ? drawOverViewTable(mappingData(data.visualRoleDistributions, mapping.typeName), {title: '角色分布', col: 4}) : '';
					html += data.yearDistributions ? drawOverViewTable(mappingData(data.yearDistributions, mapping.year), {title: '年份分布'}, {suffix: '条'}) : '';
					break;
				}
				// 无效资产
				case "DO10400":{
					count = getCountObj(data,['construct','emission','mining','trademark'] );
					showCount = count > 0;
					html += data ? drawOverViewTable(noTitleTable(data, intangibleAssetsMap), { col: 4 }) : '';
					break;
				}
				// 股权质押
				case "DO10500":{
					count = getCount(data.roleDistributions,'count') || getCount(data.yearDistributions,'count');
					showCount = count > 0;
					html += data.roleDistributions ? drawOverViewTable(mappingData(data.roleDistributions, enumerate.stock), {title: '角色分布', col: 4, remark: ['其中', '条质押登记状态均为无效']}) : '';
					html += data.yearDistributions ? drawOverViewTable(mappingData(data.yearDistributions, mapping.year), {title: '年份分布'}) : '';
					break;
				}
				// 动产抵押
				case "DO10600":{
					count = getCount(data.roleDistributions,'count') ||  getCount(data.yearDistributions,'count');
					showCount = count > 0;
					html += data.roleDistributions ? drawOverViewTable(mappingData(data.roleDistributions, enumerate.mortgage), {title: '角色分布', col: 4, remark:['其中', '条抵押登记状态均为无效']}) : '';
					html += data.yearDistributions ? drawOverViewTable(mappingData(data.yearDistributions, mapping.year), {title: '年份分布' }, {suffix: '年'}, {suffix: '条'}) : '';
					break;
				}
				// 招投标
				case "DO10700":{
					count = getCount(data.yearDistributions,'count');
					showCount = count > 0;
					html += data.yearDistributions ? drawOverViewTable(mappingData(data.yearDistributions, mapping.year), {title: '年份分布'}) : '';
					break;
				}
				// 失信记录
				case "DO20400":{
					count = getCount(data.yearDistributions,'count');
					showCount = count > 0;
					html += data.yearDistributions ? drawOverViewTable(mappingData(data.yearDistributions, mapping.year), {title: '年份分布'}) : '';
					break;
				}
				// 涉诉信息
				case "DO20600":{
					count = data.count;
					showCount = count > 0;
					html += data.yearDistribution ? drawOverViewTable(mappingData(data.yearDistribution, mapping.year), {title: '年份分布'}) : '';
					html += data.caseReasons ? drawOverViewTable(mappingData(data.caseReasons, mapping.caseType), {title: '案由分布', col: 4}) : '';
					html += data.caseTypes ? drawOverViewTable(mappingData(data.caseTypes, mapping.caseType), {title: '案件类型分布', col: 4}): '' ;
					break;
				}
				// 破产重组
				case "DO30200":{
					count = getCount(data.yearDistributions,'count');
					showCount = count > 0;
					html += data.yearDistributions ? drawOverViewTable(mappingData(data.yearDistributions, mapping.year), {title: '年份分布' }) : '';
					break;
				}
				// 经营风险
				case "DO30300":{
					count = getCountObj(data,['abnormal','change','epb','illegal','punishment','tax'] );
					showCount = count > 0;
					html += data ? drawOverViewTable(noTitleTable(data, businessRisk), { col: 4 }) : '';
					break;
				}
				// 个人税收违法
				case "DO30500":{
					count = getCount(data.roleDistributions,'count');
					showCount = count > 0;
					html += data.roleDistributions ? drawOverViewTable(mappingData(data.roleDistributions, mapping.typeName), {title: '角色分布', col: 4}) : '';
					break;
				}
				// 工商基本信息
				case "DO50000":{
					if(option.type === 1){
						if(!data.baseInfo){
							return ''
						}
						if(JSON.stringify(data.baseInfo) === '{}'){
							return ''
						}
						showCount = true;
						html = data.baseInfo && getBaseInfo(data.baseInfo, option);
					}
					if(option.type === 2){
						if(!data.shareholderInfos){
							return ''
						}
						if(Array.isArray(data.shareholderInfos) && data.shareholderInfos.length === 0){
							return ''
						}
						showCount = true;
						html = getShareholder(data.shareholderInfos, option, showCount);
					}
					if(option.type === 3){
						if(!data.businessScaleInfo){
							return ''
						}
						if(JSON.stringify(data.businessScaleInfo) === '{}'){
							return ''
						}
						showCount = true;
						html = peopleInfo(data.businessScaleInfo, option);
					}
					break;
				}
				default:{}
			}
			return { count: count, html: html, showCount: (showCount !== '' ? showCount: Boolean(count)) };
		};

		// 如果存在子级，画出带有子级的table
		var drawChildTable = function (option, data, titleConfig) {
			if(!data){
				return '';
			}
			if(Array.isArray(data) && data.length > 0){
				var table = '';
				(data || []).forEach(function(item){
					if(item.count > 0){
						var res = drawItem(option, item);
						var title = option.title;
						title += titleConfig ? titleConfig[item.type].title : '';
						if(res.showCount && res.count >0) title = res.count + '条 ' + title;
						if(option.show || res.showCount){
							var content = "<div><div class=\"title\"><div class=\"t2 f-b\">" + title + "</div>" +
								"</div><div class=\"content\">" + res.html + "</div></div>";
						}
						table += content;
					}
				});
				return table;
			}
			else if(Array.isArray(data) && data.length === 0){
				return '';
			}
			else {
				return '';
			}
		};

		var childOverview = function (option, source) {
			if(!source){
				return '';
			}
			if(JSON.stringify(source) === '{}' || JSON.stringify(source) === '[]'){
				return '';
			}
		  if(option.id === "DO10100"){
				return drawChildTable(option, source.auctionInfos, {1: { title: '-三个月内'}, 2: { title: '-全部'}});
			}
		  else if(option.id === "DO10200" ){
				return drawChildTable(option, source.subrogationInfos, {1: { title: '-立案信息'}, 2: { title: '-开庭信息'}, 3: {title: '-裁判文书'}});
			}
			else if(option.id === "DO20600"){
				if(option.status === 'E'){
					return drawChildTable(option, source.litigationInfos, {1: { title: '-立案信息'}, 2: { title: '-开庭信息'}, 3: {title: '-裁判文书'}});
				}
				else {
					return drawChildTable(option, source.litigationInfos);
				}
			}
			// 判断工商基本信息是否为空，如果为空，也不显示标题
			else if(option.id === "DO50000"){
				if(option.type === 1 && JSON.stringify(source.baseInfo) === '{}'){
					return '';
				}
				if(option.type === 2 && JSON.stringify(source.shareholderInfos) === '[]'){
					return '';
				}
				if(option.type === 3 && ( JSON.stringify(source.businessScaleInfo) === '{}' || !source.businessScaleInfo.employeeNum)){
					return '';
				}
				var resInfo = drawItem(option, source);
				var titleInfo = option.title;
				if(option.show || resInfo.showCount){
					return "<div><div class=\"title\"><div class=\"t2 f-b\">" + titleInfo + "</div>" +
						"</div><div class=\"content\">" + resInfo.html + "</div></div>";
				}
			}
			else {
				var res = drawItem(option, source);
				var title = option.title;
				if(res.showCount && res.count >0) title = res.count + '条 ' + title;
				if(option.show || res.showCount){
					return "<div><div class=\"title\"><div class=\"t2 f-b\">" + title + "</div>" +
						"</div><div class=\"content\">" + res.html + "</div></div>";
				}
				return '';
			}
		};

		// item.child === [资产概况，风险信息，工商基本信息]
		var allContent = '';
		item.child.forEach(function (childItem) {
			var child ='';
			if (new RegExp(Status).test(childItem.status)){
				childItem.child.forEach(function (i) {
					if (new RegExp(Status).test(i.status)){
						child += childOverview(i, _dataSource[i.id])
					}
				});
			}
			allContent += child ? ("<div><div class=\"t1 b-b\">" + childItem.title + "</div><div class=\"wrapper\">" + child + "</div></div>") : '';
		});
		return allContent;
	};

	Object.keys(dd).forEach(function (field) {
		var item = dd[field];
		var child = '';
		var content = '';
		if(field === 'overview'){
			content = drawOverview(item);
		} else if (new RegExp(Status).test(item.status)) {
			item.child.forEach(function (i) {
				child += childContainer(i, _dataSource[TYPE + i.id])
			});
		}
		var wrapper = child ? ("<div><div class=\"t1 b-b\">" + item.name + "</div><div class=\"wrapper\">" + child + "</div></div>") : '';
		wrapper += content;
		f.replaceHtml([{f: item.about, v: wrapper}]);
	});

	return htmlResult;
}

if (ENV === 'dev') {
	var dataSource = JSON.stringify(require('./data'));
	const exportType = 'debtor';
	var strCover = (exportType) => exportCover(dataSource, exportType,2);
	var strTemplate = (exportType) => exportTemplate(dataSource, exportType,'',2);
	fs.writeFile(root + "/dist/cover.html", strCover(exportType), (error) => {
		if (error) console.log(error);
		else {
			console.log('导出模板：封面成功输出！');
			console.warn(`*************** file: ${root + "/dist/cover.html"} ****************`);
		}
	});
	fs.writeFile(root + "/dist/content.html", strTemplate(exportType), (error) => {
		if (error) console.log('error');
		else {
			console.log('导出模板：内容成功输出！');
			console.warn(`*************** file: ${root + "/dist/content.html"} ****************`);
		}
	});
}


module.exports = {
	exportCover,
	exportTemplate,
};
