/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './constants/routes.json';
import App from './containers/App';
import CustomerRecordPage from './containers/CustomerRecordPage';
import CustomersPage from './containers/CustomersPage';

export default function Routes() {
  return (
    <App>
      <Layout>
        <Switch>
          <Route
            path={routes.CUSTOMERS.router}
            component={CustomersPage}
            strict
          />
          <Route
            path={routes.CUSTOMER_RECORD.router}
            component={CustomerRecordPage}
            strict
          />
        </Switch>
      </Layout>
    </App>
  );
}
