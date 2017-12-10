export const GET_POLICIES_LIST = 'GET_POLICIES_LIST';
export const GET_POLICIES_LIST_SUCCEEDED = 'GET_POLICIES_LIST_SUCCEEDED';
export const GET_POLICIES_LIST_ERROR = 'GET_POLICIES_LIST_ERROR';

export const GET_POLICY = 'GET_POLICY';
export const GET_POLICY_SUCCEEDED = 'GET_POLICY_SUCCEEDED';
export const GET_POLICY_ERROR = 'GET_POLICY_ERROR';

export const SAVE_POLICY = 'SAVE_POLICY';
export const SAVE_POLICY_SUCCEEDED = 'SAVE_POLICY_SUCCEEDED';
export const SAVE_POLICY_ERROR = 'SAVE_POLICY_ERROR';

export const DELETE_POLICY = 'DELETE_POLICY';
export const DELETE_POLICY_SUCCEEDED = 'DELETE_POLICY_SUCCEEDED';
export const DELETE_POLICY_ERROR = 'DELETE_POLICY_ERROR';

export const ADD_POLICY = 'ADD_POLICY';
export const ADD_POLICY_SUCCEEDED = 'ADD_POLICY_SUCCEEDED';
export const ADD_POLICY_ERROR = 'ADD_POLICY_ERROR';


/**
 * @description Actions for working with incidents
 * @param {array} ids
 * @returns {object}
 * */
export function getPoliciesList(ids) {
  return {
    type: GET_POLICIES_LIST,
    ids,
  };
}

/**
 * @description Get single policy by id
 * @param {string} id
 * @returns {object}
 * */
export function getPolicy(id) {
  return {
    type: GET_POLICY,
    id,
  };
}

/**
 * @description Updates changed fields in policy's data
 * @param {string} fields
 * @returns {object}
 * */
export function savePolicy(fields) {
  return {
    type: SAVE_POLICY,
    fields,
  };
}

/**
 * @description delete policies by id
 * @param {array} ids
 * @returns {object}
 * */
export function deletePolicy(ids) {
  return {
    type: DELETE_POLICY,
    ids,
  };
}

/**
 * @description add new policy
 * @param {object} fields
 * @returns {object}
 * */
export function addPolicy(fields) {
  return {
    type: ADD_POLICY,
    fields,
  };
}
