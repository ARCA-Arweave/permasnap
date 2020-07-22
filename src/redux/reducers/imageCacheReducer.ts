import { Action, ActionTypes } from '../actions'
import { CachedImagesObject } from './reducerTypes'

export const imageCacheReducer = (
	state: CachedImagesObject = {},
	action: Action
): CachedImagesObject => {
	switch (action.type) {
		case ActionTypes.UPDATE_IMAGE:
			let item: CachedImagesObject = {}
			let txid = action.payload.txid
			item[txid] = action.payload
			if(state[txid]!==undefined){ 
				item[txid] = Object.assign({},state[txid],item[txid])
			}
			return Object.assign({},state,item);
		case ActionTypes.SELECT_IMAGE:
			//TODO: touch last accessed for use in LRU
			return state; //do nothing
		default:
			return state;
	}
}