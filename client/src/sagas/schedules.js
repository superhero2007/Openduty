import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_SCHEDULES_LIST, GET_SCHEDULES_LIST_SUCCEEDED, GET_SCHEDULES_LIST_ERROR,
  GET_SCHEDULE, GET_SCHEDULE_SUCCEEDED, GET_SCHEDULE_ERROR,
  SAVE_SCHEDULE, SAVE_SCHEDULE_SUCCEEDED, SAVE_SCHEDULE_ERROR,
  DELETE_SCHEDULE, DELETE_SCHEDULE_SUCCEEDED, DELETE_SCHEDULE_ERROR,
  ADD_SCHEDULE, ADD_SCHEDULE_SUCCEEDED, ADD_SCHEDULE_ERROR,
} from 'actions/schedules';

const schedulesApi = new Api('schedules');

/**
 * Schedules workers
 */
function* fetchSchedules(action) {
  try {
    const schedulesList = yield schedulesApi.get({ids: action.ids});
    yield put({type: GET_SCHEDULES_LIST_SUCCEEDED, schedulesList});
  } catch (e) {
    yield put({type: GET_SCHEDULES_LIST_ERROR, message: e.message});
  }
}
function* fetchSchedule(action) {
  try {
    const schedule = yield schedulesApi.get({id: action.id});
    yield put({type: GET_SCHEDULE_SUCCEEDED, schedule});
  } catch (e) {
    yield put({type: GET_SCHEDULE_ERROR, message: e.message});
  }
}
function* saveSchedule(action) {
  try {
    const saveStatus = yield schedulesApi.update(action.fields);
    yield put({type: SAVE_SCHEDULE_SUCCEEDED, saveStatus});
  } catch (e) {
    yield put({type: SAVE_SCHEDULE_ERROR, message: e.message});
  }
}
function* deleteSchedule(action) {
  try {
    const deleteStatus = yield schedulesApi.delete({ids: action.ids});
    yield put({type: DELETE_SCHEDULE_SUCCEEDED, deleteStatus});
  } catch (e) {
    yield put({type: DELETE_SCHEDULE_ERROR, message: e.message});
  }
}
function* addSchedule(action) {
  try {
    const addStatus = yield schedulesApi.add(action.fields);
    yield put({type: ADD_SCHEDULE_SUCCEEDED, addStatus});
  } catch (e) {
    yield put({type: ADD_SCHEDULE_ERROR, message: e.message});
  }
}


const schedulesSagas = [
  takeEvery(GET_SCHEDULES_LIST, fetchSchedules),
  takeEvery(GET_SCHEDULE, fetchSchedule),
  takeEvery(SAVE_SCHEDULE, saveSchedule),
  takeEvery(DELETE_SCHEDULE, deleteSchedule),
  takeEvery(ADD_SCHEDULE, addSchedule),
];

export default schedulesSagas;
