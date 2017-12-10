import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Router, Route, Switch, Redirect} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// views
import Dashboard from 'containers/Dashboard';
import Incidents from 'containers/Incidents';
import Services from 'containers/Services';
import ServiceEdit from 'containers/ServiceEdit';
import Policies from 'containers/Policies';
import PolicyEdit from 'containers/PolicyEdit';
import Schedules from 'containers/Schedules';
import ScheduleEdit from 'containers/ScheduleEdit';
import ScheduleWatch from 'containers/ScheduleWatch';
import Users from 'containers/Users';
import UserEdit from 'containers/UserEdit';

// Reducers
import reducers from './reducers';
// Sagas
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const history = createBrowserHistory();

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/dashboard" name="Dashboard" component={Dashboard} />
            <Route path="/incidents" name="Incidents" component={Incidents} />

            <Route exact path="/services" name="Services" component={Services} />
            <Route path="/services/edit/:id" component={ServiceEdit} />
            <Route
              path="/services/add/"
              render={(props) => {
                return <ServiceEdit {...props} add />;
              }}
            />
            <Route exact path="/policies" name="Policies" component={Policies} />
            <Route path="/policies/edit/:id" component={PolicyEdit} />
            <Route
              path="/policies/add/"
              render={(props) => {
                return <PolicyEdit {...props} add />;
              }}
            />

            <Route exact path="/schedules" name="Schedules" component={Schedules} />
            <Route path="/schedules/edit/:id" component={ScheduleEdit} />
            <Route path="/schedules/watch/:id" component={ScheduleWatch} />
            <Route
              path="/schedules/add/"
              render={(props) => {
                return <ScheduleEdit {...props} add />;
              }}
            />
            <Route path="/schedules/events/edit/:eventId" component={ScheduleEdit} />
            <Route
              path="/schedules/events/add/:scheduleId"
              render={(props) => {
                return <ScheduleEdit {...props} addEvent />;
              }}
            />

            <Route exact path="/users" name="Users" component={Users} />
            <Route path="/users/edit/:id" component={UserEdit} />
            <Route
              path="/users/add/"
              render={(props) => {
                return <UserEdit {...props} add />;
              }}
            />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Router>
      </Provider>);
  }
}

