import { combineReducers } from 'redux';
import users from './users';
import incidents from './incidents';
import services from './services';
import policies from './policies';
import schedules from './schedules';
import scheduleEvents from './scheduleEvents';
import dashboard from './dashboard';
import constants from './constants';

const openDutyApp = combineReducers({
  users,
  incidents,
  services,
  policies,
  schedules,
  scheduleEvents,
  dashboard,
  constants,
});

export default openDutyApp;
