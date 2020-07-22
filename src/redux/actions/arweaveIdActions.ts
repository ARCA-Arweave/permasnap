import { ActionTypes } from './actionTypes'
import { Timestamp } from '../reducers/reducerTypes'
import { ArweaveId } from 'arweave-id'


export interface SaveArweaveIdAction {
	type: ActionTypes.SAVE_ARWEAVEID
	address: string
	payload: ArweaveId
}

export const saveArweaveId = (address:string, payload: ArweaveId): SaveArweaveIdAction => {
	return {
		type: ActionTypes.SAVE_ARWEAVEID,
		address,
		payload,
	}
}
