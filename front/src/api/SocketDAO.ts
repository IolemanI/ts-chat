import io from 'socket.io-client';

const API_SOKET: string = process.env.REACT_APP_API_SOKET || '';

export interface ISocket {
  id: string;
  connected: boolean;
  on: Function;
  emit: Function;
}

export enum ChatEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  JOIN = 'join',
  MESSAGE = 'message',
  NEW_JOIN = 'new_join',
  NEW_LEAVE = 'new_leave',
  NEW_MESSAGE = 'new_message',
}

let socket: ISocket;

class SocketDAO {
  public entity: any;

  constructor() {
    this.entity = {
      connect(endpoint: string = API_SOKET): Promise<ISocket> {
        return new Promise(resolve => {
          socket = io.connect(endpoint, {
            path:
              process.env.NODE_ENV === 'production'
                ? '/api/socket.io'
                : '/socket.io',
          });
          socket.on(ChatEvent.CONNECT, () => {
            resolve(socket);
          });
        });
      },
      isConnected(): boolean {
        return socket.connected;
      },

      join(name: string): void {
        socket.emit(ChatEvent.JOIN, name);
      },
      sendMessage(message: string): void {
        socket.emit(ChatEvent.MESSAGE, {
          id: socket.id,
          message,
        });
      },
    };
  }
}

export default new SocketDAO().entity;
