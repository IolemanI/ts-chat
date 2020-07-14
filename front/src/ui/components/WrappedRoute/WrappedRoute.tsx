import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

interface IProps {
  component: any;
  title: string;
}

const defaultTitle = 'Test Assignment';

const WrappedRoute = ({ component: Component, title, ...ctx }: IProps) => (
  <Route
    {...ctx}
    render={props => (
      <React.Fragment>
        <Helmet>
          <title>{title ? `${defaultTitle} | ${title}` : defaultTitle}</title>
        </Helmet>

        <Component {...props} title={title} />
      </React.Fragment>
    )}
  />
);

export default connect(
  null,
  null,
)(WrappedRoute);
