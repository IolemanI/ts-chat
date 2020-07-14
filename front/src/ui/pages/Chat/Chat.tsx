import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

import { RouterPathEnum } from '../index';
import { join, sendMessage } from '../../../redux/controllers/chat.controller';
import './Chat.css';

interface IProps {
  join: Function;
  sendMessage: Function;
  account: {
    name: string,
  };
  room: Array<any>;
  messages: Array<any>;
  history: History;
}

const Chat: React.StatelessComponent<IProps> = (props: IProps) => {
  const [message, setMessage] = useState('');

  if (!props.account.name) {
    props.history.push(RouterPathEnum.LOGIN);
    return null;
  }

  const handleInputChange = ({ target }) => {
    setMessage(target.value);
  };
  const handleSendClick = async () => {
    props.sendMessage(message);
  };

  return (
    <div className="chat-page-root">
      <div className="chat-bar">
        <input type="text" onChange={handleInputChange} value={message} />
        <button onClick={handleSendClick}>Send</button>
      </div>

      <div className="container">
        <ul className="room-members">
          {props.room.map(item => (<li>{item.name}</li>))}
        </ul>
        <ul className="messages">
          {props.messages.map(item => (<li><span>{item.author}</span> - {item.message}</li>))}
        </ul>
      </div>
      
    </div>
  );
}

export default connect(
  (store: any) => ({
    account: store.account,
    room: store.chat.room,
    messages: store.chat.messages,
  }),
  {
    join,
    sendMessage,
  }
)(withRouter((Chat)));
