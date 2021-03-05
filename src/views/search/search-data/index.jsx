import './style.scss';

const Components = {};
const modulesFiles = require.context('./', true, /\.jsx$/);
modulesFiles.keys().map(modulesFiles).filter(i => i.Name).forEach((i) => {
	Components[i.Name] = i.default;
});

export default Components;

// AUCTION: ƒ a(props, context)
// BANKRUPTCY: ƒ a(props, context)
// FINANCE: ƒ a(props, context)
// LAND: ƒ a(props, context)
// LAWSUITS: ƒ a(props, context)
// WRIT: ƒ a(props, context)


// import Auction from './auction';
// import Lawsuits from './lawsuits';
// import Writ from './writ';
// import Finance from './finance';
// import Bankruptcy from './bankruptcy';
// import Land from './land';
