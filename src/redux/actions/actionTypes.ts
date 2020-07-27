import { WalletAction } from './wallet';
import { CurrentPhotoAction } from './currentPhoto';
import { AddTxItemAction, DeleteTxItemAction } from './txList';
import { SelectImageAction, CreateImageAction, UpdateImageTimeAction, UpdateImageUserAction, UpdateImageURIAction } from './imageCacheActions'
import { SaveTimestampAction } from './timestampActions';
import { SaveArweaveIdAction } from './arweaveIdActions';

export enum ActionTypes {
  /* wallet actions */
  CHANGE_WALLET = 'CHANGE_WALLET',
  /* currentPhoto actions */
  SET_CURRENT_PHOTO = 'SET_CURRENT_PHOTO',
  /* txList actions */
  DELETE_TXITEM = 'DELETE_TXITEM',
  ADD_TXITEM = 'ADD_TXITEM',
  /* ImageCache actions */
  SELECT_IMAGE = 'SELECT_IMAGE', //for LRU
  CREATE_IMAGE = 'CREATE_IMAGE', //create+update
  UPDATE_IMAGE_TIMESTAMP = 'UPDATE_IMAGE_TIMESTAMP', //update
  UPDATE_IMAGE_USER = 'UPDATE_IMAGE_USER', //update
  UPDATE_IMAGE_URI = 'UPDATE_IMAGE_URI',
  /* TimestampCache actions */
  SAVE_TIMESTAMP = 'SAVE_TIMESTAMP', 
  /* ArweaveId actions */
  SAVE_ARWEAVEID = 'SAVE_ARWEAVEID',
  /* other actions... */
}

export type Action =  WalletAction 
  | CurrentPhotoAction 
  | AddTxItemAction | DeleteTxItemAction 
  | SelectImageAction | CreateImageAction | UpdateImageTimeAction | UpdateImageUserAction |UpdateImageURIAction
  | SaveTimestampAction 
  | SaveArweaveIdAction 
// this along with the enum
//sets up an implicit type guard in the reducer
