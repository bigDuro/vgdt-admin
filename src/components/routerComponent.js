import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from '../containers/Dashboard';
import LoadBoard from '../containers/LoadBoard';
import BrokerBoard from '../containers/BrokerBoard';
import DriverBoard from '../containers/DriverBoard';
import Invoices from '../containers/Invoices';
import LoadForm from '../containers/LoadForm';
import BrokerForm from '../containers/BrokerForm';

export default function RouterComponent(props) {
  const { history } = props
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/vgdt-admin/dashboard" component={LoadBoard} />
          <Route exact path="/vgdt-admin/loads" component={LoadBoard} />
          <Route path="/vgdt-admin/loads/:id" component={LoadForm} />
          <Route exact path="/vgdt-admin/brokers" component={BrokerBoard} />
          <Route path="/vgdt-admin/brokers/:id" component={BrokerForm} />
          <Route exact path="/vgdt-admin/invoices" component={Invoices} />
          <Route exact path="/vgdt-admin/drivers" component={DriverBoard} />
          <Route exact path="/vgdt-admin/" component={Dashboard} />
        </Switch>
    </Router>
  );
}
