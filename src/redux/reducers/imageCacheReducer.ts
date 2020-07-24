import { Action, ActionTypes } from '../actions'
import { CachedImagesObject } from './reducerTypes'

export const imageCacheReducer = (
	state: CachedImagesObject = {},
	action: Action
): CachedImagesObject => {
	let newState: CachedImagesObject
	switch (action.type) {
		case ActionTypes.CREATE_IMAGE:
			newState = {}
			let txid = action.payload.txid
			newState[txid] = action.payload
			if(state[txid]!==undefined){ 
				newState[txid] = Object.assign({}, state[txid], newState[txid]) //already have nested object
			}
			return Object.assign({}, state, newState)

		case ActionTypes.UPDATE_IMAGE_TIMESTAMP:
			newState = {}
			let item = Object.assign({},state[action.txid])
			item.timestamp = action.timestamp
			newState[action.txid] = item
			return Object.assign({}, state, newState)

		case ActionTypes.UPDATE_IMAGE_USER:
			newState = {}
			let item2 = Object.assign({},state[action.txid])
			item2.user = action.user
			newState[action.txid] = item2
			return Object.assign({}, state, newState)

		case ActionTypes.UPDATE_IMAGE_URI:
			newState = {}
			newState[action.txid] = Object.assign({},state[action.txid])
			newState[action.txid].uri = action.uri
			newState[action.txid].imgSrc = action.imgSrc
			return Object.assign({}, state, newState)

		case ActionTypes.SELECT_IMAGE:
			//TODO: touch last accessed for use in LRU
			return state; //do nothing
			
		default:
			return state;
	}
}