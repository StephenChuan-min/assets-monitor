import { init } from 'rematch';


const todoModel = {
	state: [],
	reducers: {
		add(state, record) {
			return state.concat({
				...record,
				uid: setTimeout(() => {}),
			});
		},
		delete(state, uidSet) {
			return state.filter(record => (
				uidSet.findIndex(uid => uid === record.uid) === -1
			));
		},
		modify(state, record) {
			return state.map(item => (
				item.uid === record.uid ? { ...record } : item
			));
		},
	},
};
const doneModel = {
	state: [],
	reducers: {
		add(state, records) {
			return state.concat(records);
		},
	},
};


export default init({
	models: {
		todoModel,
		doneModel,
	},
});
