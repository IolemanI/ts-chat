import React from 'react';

const NotFound = React.lazy(() => import('./NotFound/NotFound'));
const Login = React.lazy(() => import('./Login/Login'));
const Chat = React.lazy(() => import('./Chat/Chat'));

export enum RouterPathEnum {
  CHAT = '/',
  LOGIN = '/login',
}

export default [
  {
    path: RouterPathEnum.LOGIN,
    component: Login,
    title: 'Login',
    exact: true,
    protect: false,
  },
  {
    path: RouterPathEnum.CHAT,
    component: Chat,
    title: 'Chat',
    exact: true,
    protect: true,
  },
  {
    path: '*',
    component: NotFound,
    title: 'Not Found',
    protect: false,
  },
];
