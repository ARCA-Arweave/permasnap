import { ActionTypes } from './actionTypes'


export interface SaveTimestampAction {
	type: ActionTypes.SAVE_TIMESTAMP
	block: number
	timestamp: number
}

export const saveTimestamp = (block: number, timestamp: number): SaveTimestampAction => {
	return {
		type: ActionTypes.SAVE_TIMESTAMP,
		block,
		timestamp,
	}
}

