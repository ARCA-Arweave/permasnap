import { WalletAction } from './wallet';
import { CurrentPhotoAction } from './currentPhoto';
import { AddTxItemAction, DeleteTxItemAction } from './txList';
import { SelectImageAction, UpdateImageAction } from './imageCacheActions'
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
  UPDATE_IMAGE = 'UPDATE_IMAGE', //create+update
  /* TimestampCache actions */
  SAVE_TIMESTAMP = 'SAVE_TIMESTAMP', 
  /* ArweaveId actions */
  SAVE_ARWEAVEID = 'SAVE_ARWEAVEID',
  /* other actions... */
}

export type Action =  WalletAction | CurrentPhotoAction | AddTxItemAction | DeleteTxItemAction | SelectImageAction | UpdateImageAction | SaveTimestampAction | SaveArweaveIdAction
// this along with the enum
//sets up an implicit type guard in the reducer
