import { Action, ActionTypes } from '../actions'
import { ArweaveIdCache } from './reducerTypes'

export const arweaveIdCacheReducer = (
	state: ArweaveIdCache = {},
	action: Action
): ArweaveIdCache => {
	switch (action.type) {
		case ActionTypes.SAVE_ARWEAVEID:
			let item: ArweaveIdCache = {}
			item[action.address] = action.payload
			return Object.assign({},state,item);
		default:
			return state;
	}
}