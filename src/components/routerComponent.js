import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import CommonBoard from '../containers/CommonBoard';
import CommonForm from '../containers/CommonForm';
import AssetManager from '../containers/AssetManager';

export default function RouterComponent(props) {
  const { history } = props
  return (
    <Router history={history}>
        <Switch>
          <Route exact path="/vgdt-admin/assets" component={AssetManager} />
          <Route exact path="/vgdt-admin/:table" component={CommonBoard} />
          <Route exact path="/vgdt-admin/:table/add" component={CommonForm} />
          <Route exact path="/vgdt-admin/:table/add/:updateTable/:recordIdToUpdate" component={CommonForm} />
          <Route exact path="/vgdt-admin/:table/:id" component={CommonForm} />
          <Route exact path="/" component={CommonBoard} />
        </Switch>
    </Router>
  );
}
