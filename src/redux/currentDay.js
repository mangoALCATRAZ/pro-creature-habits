
export const UPDATE_DATE = 'UPDATE_DATE';

const date = new Date();

const currentDayReducer = (state=[date.getDate(), date.getMonth(), date.getFullYear()].join(','), action) => {
	switch(action.type) {
		case UPDATE_DATE:
			const date1 = new Date();
			return [date1.getDate(), date1.getMonth(), date1.getFullYear()].join(',');
		default:
			return state;
	}
}

export default currentDayReducer;
