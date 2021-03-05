// 过滤数组对象
const flat = arr => arr && [].concat(...arr.map(item => [].concat(item, ...flat(item.children))));
export default flat;
