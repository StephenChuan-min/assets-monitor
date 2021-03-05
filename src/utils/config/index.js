
const _msieBrowser = /msie/i.test(navigator.userAgent) && !(/msie 10/i.test(navigator.userAgent));

const _tableCreateTimeText = '更新日期';

global.REQ_STATUS = '';
global.GLOBAL_MEIE_BROWSER = _msieBrowser;
global.Table_CreateTime_Text = _tableCreateTimeText;

global.lTable = f => console.table(Object.keys(global.ruleSource[f].children).map(i => global.ruleSource[f].children[i]));
global.CURRENT_0RG = '';
global.PORTRAIT_INQUIRY_ALLOW = false;
global.PORTRAIT_INQUIRY_AFFIRM = true;
