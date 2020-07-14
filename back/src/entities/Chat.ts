import socketIo from 'socket.io';

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

export enum ChatEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  DISCONNECTING = 'disconnecting',
  JOIN = 'join',
  MESSAGE = 'message',

  // client events
  NEW_JOIN = 'new_join',
  NEW_LEAVE = 'new_leave',
  NEW_MESSAGE = 'new_message',
}

export interface ChatMessage { 
  id: string;
  message: string;
}
export interface ChatRoomItem { 
  id: string;
  name: string;
}

const ROOM_NAME = 'my_room';

export default class ChatServer {
  private io: SocketIO.Server;
  private room: Array<ChatRoomItem>;

  constructor(server: any) {
    this.io = socketIo(server);
    this.room = [];
    this.listen();
  }

  private listen(): void {
    this.io.on(ChatEvent.CONNECT, (socket: any) => {
      console.log('Client connected.', socket.id);

      socket.on(ChatEvent.JOIN, (name: string) => {
        if (!name) return;
        socket.clientName = name;

        socket.join(ROOM_NAME);
        this.room.push({
          id: socket.id,
          name,
        });
        console.log('\n[server](join - this.room)', socket.id, this.room);

        this.io.to(ROOM_NAME).emit(ChatEvent.NEW_JOIN, this.room);
      });

      socket.on(ChatEvent.MESSAGE, (data: ChatMessage) => {
        const author = this.room.find((client: ChatRoomItem) => client.id === data.id);

        if (!author) return;

        console.log('\n[server](message): ', author, JSON.stringify(data));
        this.io.to(ROOM_NAME).emit(ChatEvent.NEW_MESSAGE, {
          author: author.name,
          message: data.message,
        });
      });

      socket.on(ChatEvent.DISCONNECT, () => {
        console.log('[server](disconnected)', socket.id);
        const author = this.room.find(client => client.id === socket.id);

        if (!author) return;

        this.room = this.room.filter(client => client.id !== socket.id);

        this.io.to(ROOM_NAME).emit(ChatEvent.NEW_LEAVE, {
          id: socket.id,
          name: author.name,
          room: this.room,
        });
      });
    });
  }
}