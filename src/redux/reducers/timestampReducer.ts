import { Action, ActionTypes } from '../actions'
import { TimestampsCache } from './reducerTypes'

export const timestampsCacheReducer = (
	state: TimestampsCache = {},
	action: Action
): TimestampsCache => {
	switch (action.type) {
		case ActionTypes.SAVE_TIMESTAMP:
			let item: TimestampsCache = {}
			item[action.payload.blockHeight] = action.payload.timestamp
			return Object.assign({},state,item);
		default:
			return state;
	}
}