import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_SERVICES_LIST, GET_SERVICES_LIST_SUCCEEDED, GET_SERVICES_LIST_ERROR,
  GET_SERVICE, GET_SERVICE_SUCCEEDED, GET_SERVICE_ERROR,
  SAVE_SERVICE, SAVE_SERVICE_SUCCEEDED, SAVE_SERVICE_ERROR,
  DELETE_SERVICE, DELETE_SERVICE_SUCCEEDED, DELETE_SERVICE_ERROR,
  ADD_SERVICE, ADD_SERVICE_SUCCEEDED, ADD_SERVICE_ERROR,
} from 'actions/services';

const servicesApi = new Api('services');

/**
 * Services workers
 */
function* fetchServices(action) {
  try {
    const servicesList = yield servicesApi.get({ids: action.ids});
    yield put({type: GET_SERVICES_LIST_SUCCEEDED, servicesList});
  } catch (e) {
    yield put({type: GET_SERVICES_LIST_ERROR, message: e.message});
  }
}
function* fetchService(action) {
  try {
    const service = yield servicesApi.get({id: action.id});
    yield put({type: GET_SERVICE_SUCCEEDED, service});
  } catch (e) {
    yield put({type: GET_SERVICE_ERROR, message: e.message});
  }
}
function* saveService(action) {
  try {
    const saveStatus = yield servicesApi.update(action.fields);
    yield put({type: SAVE_SERVICE_SUCCEEDED, saveStatus});
  } catch (e) {
    yield put({type: SAVE_SERVICE_ERROR, message: e.message});
  }
}
function* deleteService(action) {
  try {
    const deleteStatus = yield servicesApi.delete({ids: action.ids});
    yield put({type: DELETE_SERVICE_SUCCEEDED, deleteStatus});
  } catch (e) {
    yield put({type: DELETE_SERVICE_ERROR, message: e.message});
  }
}
function* addService(action) {
  try {
    const addStatus = yield servicesApi.add(action.fields);
    yield put({type: ADD_SERVICE_SUCCEEDED, addStatus});
  } catch (e) {
    yield put({type: ADD_SERVICE_ERROR, message: e.message});
  }
}


const servicesSagas = [
  takeEvery(GET_SERVICES_LIST, fetchServices),
  takeEvery(GET_SERVICE, fetchService),
  takeEvery(SAVE_SERVICE, saveService),
  takeEvery(DELETE_SERVICE, deleteService),
  takeEvery(ADD_SERVICE, addService),
];

export default servicesSagas;
