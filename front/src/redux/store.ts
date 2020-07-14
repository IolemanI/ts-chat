import { Store, createStore, applyMiddleware, combineReducers, Reducer } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';

import account, { IAccountState } from './reducers/account.reducer';
import chat from './reducers/chat.reducer';

export const history = createBrowserHistory();

/*
 * This is the root state of the app
 * It contains every substate of the app
 */
export interface IStoreState {
  account: IAccountState,
  chat: any,
  router: any,
}


const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const reducer: Reducer<IStoreState> = combineReducers({
  router: connectRouter(history),
  account,
  chat,
});

const store: Store<IStoreState> = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
export default store;
