import { ActionTypes } from './actionTypes'
import { ICachedImage } from '../reducers/reducerTypes'

export interface SelectImageAction {
	type: ActionTypes.SELECT_IMAGE
	payload: string
}
export interface UpdateImageAction {
	type: ActionTypes.UPDATE_IMAGE
	payload: ICachedImage
}

export const updateImage = (item: ICachedImage): UpdateImageAction => {
	return {
		type: ActionTypes.UPDATE_IMAGE,
		payload: item,
	}
}
export const selectImage = (id: string): SelectImageAction => {
	return {
		type: ActionTypes.SELECT_IMAGE,
		payload: id,
	}
}
