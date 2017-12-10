export const GET_USERS_LIST = 'GET_USERS_LIST';
export const GET_USERS_LIST_SUCCEEDED = 'GET_USERS_LIST_SUCCEEDED';
export const GET_USERS_LIST_ERROR = 'GET_USERS_LIST_ERROR';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCEEDED = 'GET_USER_SUCCEEDED';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_USER_SUCCEEDED = 'SAVE_USER_SUCCEEDED';
export const SAVE_USER_ERROR = 'SAVE_USER_ERROR';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCEEDED = 'DELETE_USER_SUCCEEDED';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCEEDED = 'ADD_USER_SUCCEEDED';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';


/**
 * @description Actions for working with users
 * @param {array} ids
 * @returns {object}
 * */
export function getUsersList(ids) {
  return {
    type: GET_USERS_LIST,
    ids,
  };
}

/**
 * @description Get single user by id
 * @param {string} id
 * @returns {object}
 * */
export function getUser(id) {
  return {
    type: GET_USER,
    id,
  };
}

/**
 * @description Updates changed fields in user's data
 * @param {string} fields
 * @returns {object}
 * */
export function saveUser(fields) {
  return {
    type: SAVE_USER,
    fields,
  };
}

/**
 * @description delete users by id
 * @param {array} ids
 * @returns {object}
 * */
export function deleteUser(ids) {
  return {
    type: DELETE_USER,
    ids,
  };
}

/**
 * @description add new user
 * @param {object} fields
 * @returns {object}
 * */
export function addUser(fields) {
  return {
    type: ADD_USER,
    fields,
  };
}
