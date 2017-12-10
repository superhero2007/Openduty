export const GET_SCHEDULES_LIST = 'GET_SCHEDULES_LIST';
export const GET_SCHEDULES_LIST_SUCCEEDED = 'GET_SCHEDULES_LIST_SUCCEEDED';
export const GET_SCHEDULES_LIST_ERROR = 'GET_SCHEDULES_LIST_ERROR';

export const GET_SCHEDULE = 'GET_SCHEDULE';
export const GET_SCHEDULE_SUCCEEDED = 'GET_SCHEDULE_SUCCEEDED';
export const GET_SCHEDULE_ERROR = 'GET_SCHEDULE_ERROR';

export const SAVE_SCHEDULE = 'SAVE_SCHEDULE';
export const SAVE_SCHEDULE_SUCCEEDED = 'SAVE_SCHEDULE_SUCCEEDED';
export const SAVE_SCHEDULE_ERROR = 'SAVE_SCHEDULE_ERROR';

export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const DELETE_SCHEDULE_SUCCEEDED = 'DELETE_SCHEDULE_SUCCEEDED';
export const DELETE_SCHEDULE_ERROR = 'DELETE_SCHEDULE_ERROR';

export const ADD_SCHEDULE = 'ADD_SCHEDULE';
export const ADD_SCHEDULE_SUCCEEDED = 'ADD_SCHEDULE_SUCCEEDED';
export const ADD_SCHEDULE_ERROR = 'ADD_SCHEDULE_ERROR';


/**
 * @description Actions for working with schedules
 * @param {array} ids
 * @returns {object}
 * */
export function getSchedulesList(ids) {
  return {
    type: GET_SCHEDULES_LIST,
    ids,
  };
}

/**
 * @description Get single schedule by id
 * @param {string} id
 * @returns {object}
 * */
export function getSchedule(id) {
  return {
    type: GET_SCHEDULE,
    id,
  };
}

/**
 * @description Update changed fields in schedule's data
 * @param {string} fields
 * @returns {object}
 * */
export function saveSchedule(fields) {
  return {
    type: SAVE_SCHEDULE,
    fields,
  };
}

/**
 * @description delete schedules by id
 * @param {array} ids
 * @returns {object}
 * */
export function deleteSchedule(ids) {
  return {
    type: DELETE_SCHEDULE,
    ids,
  };
}

/**
 * @description add new schedule
 * @param {object} fields
 * @returns {object}
 * */
export function addSchedule(fields) {
  return {
    type: ADD_SCHEDULE,
    fields,
  };
}
