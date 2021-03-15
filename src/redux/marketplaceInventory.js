export const PURCHASE = 'PURCHASE';
export const FILTER_ALL = 'FILTER_ALL'
export const FILTER = 'FILTER';

import {Images} from "../components/Images";

let defaultState = ['pizza', 'shoes', 'burger', 'shirt', 'carrot', 'ball', 'water', 'blue_shoes',
					'black_shirt', 'blue_shirt', 'black_shoes', 'red_ball', 'black_ball'];
defaultState.sort();

const marketplaceInventoryReducer = (state=defaultState, action) => {
	switch (action.type) {
		case PURCHASE:
			if(Images[action.data].category === 'food') {
				return state;
			}
			const index = state.indexOf(action.data);
			const copyItems = [...state];
			copyItems.splice(index, 1);
			defaultState = defaultState.filter(e => e !== action.data);
			return copyItems;
		case FILTER_ALL:
			return defaultState
		case FILTER:
			return defaultState.filter(item => Images[item].category === action.data);
		default:
			return state;
	}
}

export default marketplaceInventoryReducer;
