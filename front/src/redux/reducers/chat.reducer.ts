import ActionTypes from '../constants/chatActionsTypes';

export interface IMessage {
  author: string,
  message: string,
};
export interface IAccountState {
  messages: Array<IMessage>,
  room: Array<any>,
  isConnected: boolean,
  error: string,
};
const initialState: IAccountState = {
  messages: [],
  room: [],
  isConnected: false,
  error: '',
};

export default function (state: IAccountState = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHAT_SET_CONNECTED:
      return {
        ...state,
        isConnected: action.payload,
      };
    case ActionTypes.CHAT_SET_DISCONNECTED:
      return {
        ...state,
        isConnected: action.payload,
      };
    case ActionTypes.CHAT_SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.CHAT_MESSAGE_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case ActionTypes.CHAT_SET_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    default:
      return state;
  }
}

export const actions = {
  setConnected(payload) {
    return {
      type: ActionTypes.CHAT_SET_CONNECTED,
      payload,
    };
  },
  setDisconnected(payload) {
    return {
      type: ActionTypes.CHAT_SET_DISCONNECTED,
      payload,
    };
  },
  setError(payload) {
    return {
      type: ActionTypes.CHAT_SET_ERROR,
      payload,
    };
  },
  addMessage(payload: IMessage) {
    return {
      type: ActionTypes.CHAT_MESSAGE_RECEIVED,
      payload,
    };
  },
  setRoom(payload) {
    return {
      type: ActionTypes.CHAT_SET_ROOM,
      payload,
    };
  },
};
