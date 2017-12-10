import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_DASHBOARD_LOG, GET_DASHBOARD_LOG_SUCCEEDED, GET_DASHBOARD_LOG_ERROR,
} from 'actions/dashboard';

const dashboardApi = new Api('dashboard');

/**
 * DashboardLogs workers
 */
function* fetchDashboardLog(action) {
  try {
    const dashboardLog = yield dashboardApi.get({serviceId: action.serviceId});
    yield put({type: GET_DASHBOARD_LOG_SUCCEEDED, dashboardLog});
  } catch (e) {
    yield put({type: GET_DASHBOARD_LOG_ERROR, message: e.message});
  }
}

const dashboardSagas = [
  takeEvery(GET_DASHBOARD_LOG, fetchDashboardLog),
];
export default dashboardSagas;
