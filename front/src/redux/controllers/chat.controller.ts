import { actions } from '../reducers/chat.reducer';
import SocketDAO, { ChatEvent } from '../../api/SocketDAO';

export const connectSocket = () => async (dispatch, getState) => {
  try {
    const socket = await SocketDAO.connect();

    console.log('socket', socket);
    
    if (socket && socket.id) {
      await dispatch(actions.setConnected(true));
    }

    socket.on(ChatEvent.CONNECT, (s) => {
      dispatch(actions.setConnected(true));
    });
    socket.on(ChatEvent.NEW_JOIN, data => {
      dispatch(actions.setRoom(data));
    });
    socket.on(ChatEvent.NEW_LEAVE, data => {
      dispatch(actions.addMessage({ author: 'system', message: `${data.name} leaved the chat.` }));
      dispatch(actions.setRoom(data.room));
    });
    socket.on(ChatEvent.NEW_MESSAGE, data => {
      dispatch(actions.addMessage(data));
    });
    socket.on(ChatEvent.DISCONNECT, () => {
      dispatch(actions.setConnected(false));
    });
  } catch (e) {
    console.error(e.message, e);
    await dispatch(actions.setError(e.message));
  }
};


export const join = () => async (dispatch, getState) => {
  const { name } = getState().account;

  try {
    SocketDAO.join(name);
  } catch (e) {
    console.error(e.message, e);
    await dispatch(actions.setError(e.message));
  }
};

export const sendMessage = message => async dispatch => {
  try {
    SocketDAO.sendMessage(message);
  } catch (e) {
    console.error(e.message, e);
    await dispatch(actions.setError(e.message));
  }
};
