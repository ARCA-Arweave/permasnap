import { ActionTypes } from './actionTypes'
import { Timestamp } from '../reducers/reducerTypes'


export interface SaveTimestampAction {
	type: ActionTypes.SAVE_TIMESTAMP
	payload: Timestamp
}

export const saveTimestamp = (item: Timestamp): SaveTimestampAction => {
	return {
		type: ActionTypes.SAVE_TIMESTAMP,
		payload: item,
	}
}

