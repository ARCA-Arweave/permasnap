import { ActionTypes } from './actionTypes'
import { ICachedImage } from '../reducers/reducerTypes'
import { ArweaveId } from 'arweave-id'

export interface SelectImageAction {
	type: ActionTypes.SELECT_IMAGE
	payload: string
}
export interface CreateImageAction {
	type: ActionTypes.CREATE_IMAGE
	payload: ICachedImage
}
export interface UpdateImageTimeAction {
	type: ActionTypes.UPDATE_IMAGE_TIMESTAMP
	txid: string
	timestamp: number
}
export interface UpdateImageUserAction {
	type: ActionTypes.UPDATE_IMAGE_USER
	txid: string
	user: ArweaveId
}
export interface UpdateImageURIAction {
	type: ActionTypes.UPDATE_IMAGE_URI
	txid: string
	uri: string
	imgSrc: string
}

export const createImage = (item: ICachedImage): CreateImageAction => {
	return {
		type: ActionTypes.CREATE_IMAGE,
		payload: item,
	}
}
export const updateImageTime = (txid: string, timestamp: number): UpdateImageTimeAction => {
	return {
		type: ActionTypes.UPDATE_IMAGE_TIMESTAMP,
		txid,
		timestamp,
	}
}
export const updateImageUser = (txid: string, user: ArweaveId): UpdateImageUserAction => {
	return {
		type: ActionTypes.UPDATE_IMAGE_USER,
		txid,
		user,
	}
}
export const updateImageURI = (txid: string, uri: string, imgSrc:string): UpdateImageURIAction => {
	return {
		type: ActionTypes.UPDATE_IMAGE_URI,
		txid,
		uri,
		imgSrc,
	}
}
export const selectImage = (txid: string): SelectImageAction => {
	return {
		type: ActionTypes.SELECT_IMAGE,
		payload: txid,
	}
}
