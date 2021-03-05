import province from './province';
import city from './city';
import county from './county';
import town from './town';

const eg = {
	base: 'sc',
	name: '<em>夏</em><em>回</em><em>族</em><em>自</em><em>治</em><em>区</em>'.replace(/<(\/|)em>/g, ''),
	regLocation: '成都市崇州市崇阳镇西江场镇',
};

const method = (data) => {
	const backup = Object.assign({}, data);
	backup.name = backup.name.replace(/<(\/|)em>/g, '');
	const assist = {
		province: province.filter(i => i.base === data.base)[0],

	};
	if (/(自治区|省|市)/.test(assist.province.name)) {
		const p = assist.province;
		if (p.base === 'nx' || p.base === 'xj') {
			assist.provinceList = [p.name.slice(0, 2), p.name.slice(0, 5), p.name];
		} else {
			const _index = assist.province.name.match(/(自治区|省|市)/)[2];
			assist.provinceList = [p.name.slice(0, _index), p.name];
		}
	}
};

method(eg);
