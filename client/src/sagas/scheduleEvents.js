import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_SCHEDULE_EVENTS_LIST, GET_SCHEDULE_EVENTS_LIST_SUCCEEDED, GET_SCHEDULE_EVENTS_LIST_ERROR,
  GET_SCHEDULE_EVENT, GET_SCHEDULE_EVENT_SUCCEEDED, GET_SCHEDULE_EVENT_ERROR,
  SAVE_SCHEDULE_EVENT, SAVE_SCHEDULE_EVENT_SUCCEEDED, SAVE_SCHEDULE_EVENT_ERROR,
  DELETE_SCHEDULE_EVENT, DELETE_SCHEDULE_EVENT_SUCCEEDED, DELETE_SCHEDULE_EVENT_ERROR,
  ADD_SCHEDULE_EVENT, ADD_SCHEDULE_EVENT_SUCCEEDED, ADD_SCHEDULE_EVENT_ERROR,
} from 'actions/scheduleEvents';

const scheduleEventsApi = new Api('scheduleEvents');

/**
 * ScheduleEvents workers
 */
function* fetchScheduleEvents(action) {
  try {
    const scheduleEventsList = yield scheduleEventsApi.get({scheduleId: action.scheduleId});
    yield put({type: GET_SCHEDULE_EVENTS_LIST_SUCCEEDED, scheduleEventsList});
  } catch (e) {
    yield put({type: GET_SCHEDULE_EVENTS_LIST_ERROR, message: e.message});
  }
}
function* fetchScheduleEvent(action) {
  try {
    const scheduleEvent = yield scheduleEventsApi.get({id: action.id});
    yield put({type: GET_SCHEDULE_EVENT_SUCCEEDED, scheduleEvent});
  } catch (e) {
    yield put({type: GET_SCHEDULE_EVENT_ERROR, message: e.message});
  }
}
function* saveScheduleEvent(action) {
  try {
    const saveStatus = yield scheduleEventsApi.update(action.fields);
    yield put({type: SAVE_SCHEDULE_EVENT_SUCCEEDED, saveStatus});
  } catch (e) {
    yield put({type: SAVE_SCHEDULE_EVENT_ERROR, message: e.message});
  }
}
function* deleteScheduleEvent(action) {
  try {
    const deleteStatus = yield scheduleEventsApi.delete({ids: action.ids});
    yield put({type: DELETE_SCHEDULE_EVENT_SUCCEEDED, deleteStatus});
  } catch (e) {
    yield put({type: DELETE_SCHEDULE_EVENT_ERROR, message: e.message});
  }
}
function* addScheduleEvent(action) {
  try {
    const addStatus = yield scheduleEventsApi.add(action.fields);
    yield put({type: ADD_SCHEDULE_EVENT_SUCCEEDED, addStatus});
  } catch (e) {
    yield put({type: ADD_SCHEDULE_EVENT_ERROR, message: e.message});
  }
}


const scheduleEventsSagas = [
  takeEvery(GET_SCHEDULE_EVENTS_LIST, fetchScheduleEvents),
  takeEvery(GET_SCHEDULE_EVENT, fetchScheduleEvent),
  takeEvery(SAVE_SCHEDULE_EVENT, saveScheduleEvent),
  takeEvery(DELETE_SCHEDULE_EVENT, deleteScheduleEvent),
  takeEvery(ADD_SCHEDULE_EVENT, addScheduleEvent),
];

export default scheduleEventsSagas;
