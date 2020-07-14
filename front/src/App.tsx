import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, BrowserRouter } from 'react-router-dom';

import WrappedRoute from './ui/components/WrappedRoute/WrappedRoute';
import { connectSocket } from './redux/controllers/chat.controller';

import routes from './ui/pages';
import './App.css';

interface IProps {
  connectSocket: Function;
}

const App: React.StatelessComponent<IProps> = (props: IProps) => {
  props.connectSocket();

  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Switch>
              {routes.map(route => (
                <WrappedRoute
                  key={route.path}
                  {...props}
                  {...route}
                />
              ))}
            </Switch>
          </BrowserRouter>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default connect(
  (store: any) => ({
    account: store.account,
  }),
  {
    connectSocket,
  },
)(App);