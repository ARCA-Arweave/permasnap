import { Action, ActionTypes } from '../actions';
import { IPsnapPhoto } from './reducerTypes';

export const txListReducer = (
  state: IPsnapPhoto[] = [], 
  action: Action
): IPsnapPhoto[] => {
  switch (action.type) {
    case ActionTypes.ADD_TXITEM:
      return [...state, action.payload]
    case ActionTypes.DELETE_TXITEM:
      return state.filter((item: IPsnapPhoto) => item.id !== action.payload);
    default:
      return state;
  }
};
