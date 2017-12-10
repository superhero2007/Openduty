import { put, takeEvery } from 'redux-saga/effects';
import Api from 'helpers/RestApi';

import {
  GET_USERS_LIST, GET_USERS_LIST_SUCCEEDED, GET_USERS_LIST_ERROR,
  GET_USER, GET_USER_SUCCEEDED, GET_USER_ERROR,
  SAVE_USER, SAVE_USER_SUCCEEDED, SAVE_USER_ERROR,
  DELETE_USER, DELETE_USER_SUCCEEDED, DELETE_USER_ERROR,
  ADD_USER, ADD_USER_SUCCEEDED, ADD_USER_ERROR,
} from 'actions/users';

const usersApi = new Api('users');

/**
 * Users workers
 */
function* fetchUsersList(action) {
  try {
    const usersList = yield usersApi.get({ids: action.ids});
    yield put({type: GET_USERS_LIST_SUCCEEDED, usersList});
  } catch (e) {
    yield put({type: GET_USERS_LIST_ERROR, message: e.message});
  }
}
function* fetchUser(action) {
  try {
    const user = yield usersApi.get({id: action.id});
    yield put({type: GET_USER_SUCCEEDED, user});
  } catch (e) {
    yield put({type: GET_USER_ERROR, message: e.message});
  }
}
function* saveUser(action) {
  try {
    const saveStatus = yield usersApi.update(action.fields);
    yield put({type: SAVE_USER_SUCCEEDED, saveStatus});
  } catch (e) {
    yield put({type: SAVE_USER_ERROR, message: e.message});
  }
}
function* deleteUser(action) {
  try {
    const deleteStatus = yield usersApi.delete({ids: action.ids});
    yield put({type: DELETE_USER_SUCCEEDED, deleteStatus});
  } catch (e) {
    yield put({type: DELETE_USER_ERROR, message: e.message});
  }
}
function* addUser(action) {
  try {
    const addStatus = yield usersApi.add(action.fields);
    yield put({type: ADD_USER_SUCCEEDED, addStatus});
  } catch (e) {
    yield put({type: ADD_USER_ERROR, message: e.message});
  }
}


const usersSagas = [
  takeEvery(GET_USERS_LIST, fetchUsersList),
  takeEvery(GET_USER, fetchUser),
  takeEvery(SAVE_USER, saveUser),
  takeEvery(DELETE_USER, deleteUser),
  takeEvery(ADD_USER, addUser),
];
export default usersSagas;
