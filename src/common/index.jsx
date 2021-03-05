import Tabs from './tabs';
import Badge from './badge';
import Button from './button';
import Input from './input';
import Spin from './spin';
import Download from './download';
import Table from './commonTable';
import SelectedNum from './selectedNum';
import Ellipsis from './ellipsis';
import Icon from './icon';
import NoContent from './noContent';
import DatePicker from './commonDatePicker';
import BreadCrumb from './bread-crumb';
import LiItem from './li-item';
import NavTab from './nav-tab';

const timeRule = {
	disabledStartDate: (startValue, endValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		// if (typeof endValue === 'string')
		if (typeof endValue === 'string') {
			const year = endValue.slice(0, 4);
			const month = Number(endValue.slice(5, 7)) - 1;
			const day = endValue.slice(8, 10);
			const _endValue = new Date(year, month, day);
			_endValue.setHours(23, 59, 59, 0);
			return startValue.getTime() >= _endValue.getTime();
		}
		return false;
	},
	disabledEndDate: (endValue, startValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		if (typeof startValue === 'string') {
			const year = startValue.slice(0, 4);
			const month = Number(startValue.slice(5, 7)) - 1;
			const day = startValue.slice(8, 10);
			const _startValue = new Date(year, month, day);
			_startValue.setHours(0, 0, 0, 0);
			return endValue.getTime() < new Date(_startValue).getTime();
		}
		return false;
	},
};

export {
	Tabs, Badge, Button, Input, Spin, timeRule, Download, Table, SelectedNum, Ellipsis, Icon, NoContent, DatePicker, BreadCrumb, LiItem, NavTab,
};
