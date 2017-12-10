import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_POLICIES_LIST, GET_POLICIES_LIST_SUCCEEDED, GET_POLICIES_LIST_ERROR,
  GET_POLICY, GET_POLICY_SUCCEEDED, GET_POLICY_ERROR,
  SAVE_POLICY, SAVE_POLICY_SUCCEEDED, SAVE_POLICY_ERROR,
  DELETE_POLICY, DELETE_POLICY_SUCCEEDED, DELETE_POLICY_ERROR,
  ADD_POLICY, ADD_POLICY_SUCCEEDED, ADD_POLICY_ERROR,
} from 'actions/policies';

const policiesApi = new Api('policies');

/**
 * Policies workers
 */
function* fetchPolicies() {
  try {
    const policiesList = yield policiesApi.get();
    yield put({type: GET_POLICIES_LIST_SUCCEEDED, policiesList});
  } catch (e) {
    yield put({type: GET_POLICIES_LIST_ERROR, message: e.message});
  }
}
function* fetchPolicy(action) {
  try {
    const policy = yield policiesApi.get({id: action.id});
    yield put({type: GET_POLICY_SUCCEEDED, policy});
  } catch (e) {
    yield put({type: GET_POLICY_ERROR, message: e.message});
  }
}
function* savePolicy(action) {
  try {
    const saveStatus = yield policiesApi.update(action.fields);
    yield put({type: SAVE_POLICY_SUCCEEDED, saveStatus});
  } catch (e) {
    yield put({type: SAVE_POLICY_ERROR, message: e.message});
  }
}
function* deletePolicy(action) {
  try {
    const deleteStatus = yield policiesApi.delete({ids: action.ids});
    yield put({type: DELETE_POLICY_SUCCEEDED, deleteStatus});
  } catch (e) {
    yield put({type: DELETE_POLICY_ERROR, message: e.message});
  }
}
function* addPolicy(action) {
  try {
    const addStatus = yield policiesApi.add(action.fields);
    yield put({type: ADD_POLICY_SUCCEEDED, addStatus});
  } catch (e) {
    yield put({type: ADD_POLICY_ERROR, message: e.message});
  }
}


const policiesSagas = [
  takeEvery(GET_POLICIES_LIST, fetchPolicies),
  takeEvery(GET_POLICY, fetchPolicy),
  takeEvery(SAVE_POLICY, savePolicy),
  takeEvery(DELETE_POLICY, deletePolicy),
  takeEvery(ADD_POLICY, addPolicy),
];

export default policiesSagas;
