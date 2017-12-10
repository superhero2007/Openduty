export const GET_INCIDENTS_LIST = 'GET_INCIDENTS_LIST';
export const GET_INCIDENTS_LIST_SUCCEEDED = 'GET_INCIDENTS_LIST_SUCCEEDED';
export const GET_INCIDENTS_LIST_ERROR = 'GET_INCIDENTS_LIST_ERROR';

export const ACKNOWLEDGE = 'ACKNOWLEDGE';
export const ACKNOWLEDGE_SUCCEEDED = 'ACKNOWLEDGE_SUCCEEDED';
export const ACKNOWLEDGE_ERROR = 'ACKNOWLEDGE_ERROR';

export const RESOLVE = 'RESOLVE';
export const RESOLVE_SUCCEEDED = 'RESOLVE_SUCCEEDED';
export const RESOLVE_ERROR = 'RESOLVE_ERROR';

/**
 * @description Actions for working with incidents
 * @param {object} requestParams
 * @returns {object}
 * */
export function getIncidentsList(requestParams) {
  return {
    type: GET_INCIDENTS_LIST,
    requestParams,
  };
}

/**
 * @description Actions to mark multiple incidents as acknowledged
 * @param {array} ids
 * @returns {object}
 * */
export function acknowledge(ids) {
  return {
    type: ACKNOWLEDGE,
    requestParams: {
      id: ids,
      eventType: 'acknowledge',
    },
  };
}

/**
 * @description Actions to mark multiple incidents as resolved
 * @param {array} ids
 * @returns {object}
 * */
export function resolve(ids) {
  return {
    type: RESOLVE,
    requestParams: {
      id: ids,
      eventType: 'resolve',
    },
  };
}
