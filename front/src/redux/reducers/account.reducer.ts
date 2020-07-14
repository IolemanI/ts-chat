import AccountActionTypes from '../constants/accountActionsTypes';

export interface IAccountState {
  name: string;
  error: string;
};
const initialState: IAccountState = {
  name: '',
  error: '',
};

export default function (state: IAccountState = initialState, action) {
  switch (action.type) {
    case AccountActionTypes.ACCOUNT_SET_NAME:
      return {
        ...state,
        name: action.payload
      };
    case AccountActionTypes.ACCOUNT_SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const actions = {
  setName(payload) {
    return {
      type: AccountActionTypes.ACCOUNT_SET_NAME,
      payload,
    };
  },
  setError(payload) {
    return {
      type: AccountActionTypes.ACCOUNT_SET_ERROR,
      payload,
    };
  },
};
