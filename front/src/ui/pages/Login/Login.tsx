import React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { withRouter } from 'react-router-dom';

import { RouterPathEnum } from '../index';
import { login } from '../../../redux/controllers/account.controller';
import { join } from '../../../redux/controllers/chat.controller';
import './Login.css';

interface IProps {
  login: Function;
  join: Function;
  history: History;
}

const Login: React.StatelessComponent<IProps> = (props: IProps) => {
  const handleLoginClick = async () => {
    const name = await props.login();
    if (name) {
      props.join();
      props.history.push(RouterPathEnum.CHAT);
    }
  };

  return (
    <div className="login-page-root">
      <button className="login-btn" onClick={handleLoginClick}>Get your Name</button>
    </div>
  );
}

export default connect(
  (store: any) => ({
    account: store.account,
  }),
  {
    login,
    join,
  },
)(withRouter((Login)));
