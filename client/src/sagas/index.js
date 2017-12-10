import { all } from 'redux-saga/effects';
import usersSagas from './users';
import incidentsSagas from './incidents';
import servicesSagas from './services';
import policiesSagas from './policies';
import schedulesSagas from './schedules';
import scheduleEventsSagas from './scheduleEvents';
import dashboardSagas from './dashboard';
import constantsSagas from './constants';


function* rootSaga() {
  yield all([
    ...usersSagas,
    ...incidentsSagas,
    ...servicesSagas,
    ...policiesSagas,
    ...schedulesSagas,
    ...scheduleEventsSagas,
    ...dashboardSagas,
    ...constantsSagas,
  ]);
}

export default rootSaga;
