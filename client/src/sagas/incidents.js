import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_INCIDENTS_LIST, GET_INCIDENTS_LIST_SUCCEEDED, GET_INCIDENTS_LIST_ERROR,
  ACKNOWLEDGE, ACKNOWLEDGE_SUCCEEDED, ACKNOWLEDGE_ERROR,
  RESOLVE, RESOLVE_SUCCEEDED, RESOLVE_ERROR,
} from 'actions/incidents';

const incidentsApi = new Api('incidents');

function* fetchIncidents(action) {
  try {
    const incidentsList = yield incidentsApi.get(action.requestParams);
    yield put({type: GET_INCIDENTS_LIST_SUCCEEDED, incidentsList});
  } catch (e) {
    yield put({type: GET_INCIDENTS_LIST_ERROR, message: e.message});
  }
}
function* acknowledgeIncidents(action) {
  try {
    const ackStatus = yield incidentsApi.update(action.requestParams);
    yield put({type: ACKNOWLEDGE_SUCCEEDED, ackStatus});
  } catch (e) {
    yield put({type: ACKNOWLEDGE_ERROR, message: e.message});
  }
}
function* resolveIncidents(action) {
  try {
    const resolveStatus = yield incidentsApi.update(action.requestParams);
    yield put({type: RESOLVE_SUCCEEDED, resolveStatus});
  } catch (e) {
    yield put({type: RESOLVE_ERROR, message: e.message});
  }
}

const incidentsSagas = [
  takeEvery(GET_INCIDENTS_LIST, fetchIncidents),
  takeEvery(ACKNOWLEDGE, acknowledgeIncidents),
  takeEvery(RESOLVE, resolveIncidents),
];

export default incidentsSagas;
