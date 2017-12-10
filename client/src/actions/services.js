export const GET_SERVICES_LIST = 'GET_SERVICES_LIST';
export const GET_SERVICES_LIST_SUCCEEDED = 'GET_SERVICES_LIST_SUCCEEDED';
export const GET_SERVICES_LIST_ERROR = 'GET_SERVICES_LIST_ERROR';

export const GET_SERVICE = 'GET_SERVICE';
export const GET_SERVICE_SUCCEEDED = 'GET_SERVICE_SUCCEEDED';
export const GET_SERVICE_ERROR = 'GET_SERVICE_ERROR';

export const SAVE_SERVICE = 'SAVE_SERVICE';
export const SAVE_SERVICE_SUCCEEDED = 'SAVE_SERVICE_SUCCEEDED';
export const SAVE_SERVICE_ERROR = 'SAVE_SERVICE_ERROR';

export const DELETE_SERVICE = 'DELETE_SERVICE';
export const DELETE_SERVICE_SUCCEEDED = 'DELETE_SERVICE_SUCCEEDED';
export const DELETE_SERVICE_ERROR = 'DELETE_SERVICE_ERROR';

export const ADD_SERVICE = 'ADD_SERVICE';
export const ADD_SERVICE_SUCCEEDED = 'ADD_SERVICE_SUCCEEDED';
export const ADD_SERVICE_ERROR = 'ADD_SERVICE_ERROR';

/**
 * @description Actions for working with incidents
 * @param {array} ids
 * @returns {object}
 * */
export function getServicesList(ids) {
  return {
    type: GET_SERVICES_LIST,
    ids,
  };
}

/**
 * @description Get single service by id
 * @param {string} id
 * @returns {object}
 * */
export function getService(id) {
  return {
    type: GET_SERVICE,
    id,
  };
}

/**
 * @description Update service by id
 * @param {string} fields
 * @returns {object}
 * */
export function saveService(fields) {
  return {
    type: SAVE_SERVICE,
    fields,
  };
}

/**
 * @description delete services by id list
 * @param {array} ids
 * @returns {object}
 * */
export function deleteService(ids) {
  return {
    type: DELETE_SERVICE,
    ids,
  };
}

/**
 * @description add new service
 * @param {object} fields
 * @returns {object}
 * */
export function addService(fields) {
  return {
    type: ADD_SERVICE,
    fields,
  };
}

