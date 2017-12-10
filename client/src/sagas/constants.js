import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_CONSTANTS, GET_CONSTANTS_SUCCEEDED, GET_CONSTANTS_ERROR,
} from 'actions/constants';

const constantsApi = new Api('constants');

/**
 * Constants workers
 */
function* fetchConstants() {
  try {
    const constants = yield constantsApi.get();
    yield put({type: GET_CONSTANTS_SUCCEEDED, constants});
  } catch (e) {
    yield put({type: GET_CONSTANTS_ERROR, message: e.message});
  }
}

const constantsSagas = [
  takeEvery(GET_CONSTANTS, fetchConstants),
];
export default constantsSagas;
