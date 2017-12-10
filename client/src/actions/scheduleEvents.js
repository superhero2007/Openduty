export const GET_SCHEDULE_EVENTS_LIST = 'GET_SCHEDULE_EVENTS_LIST';
export const GET_SCHEDULE_EVENTS_LIST_SUCCEEDED = 'GET_SCHEDULE_EVENTS_LIST_SUCCEEDED';
export const GET_SCHEDULE_EVENTS_LIST_ERROR = 'GET_SCHEDULE_EVENTS_LIST_ERROR';

export const GET_SCHEDULE_EVENT = 'GET_SCHEDULE_EVENT';
export const GET_SCHEDULE_EVENT_SUCCEEDED = 'GET_SCHEDULE_EVENT_SUCCEEDED';
export const GET_SCHEDULE_EVENT_ERROR = 'GET_SCHEDULE_EVENT_ERROR';

export const SAVE_SCHEDULE_EVENT = 'SAVE_SCHEDULE_EVENT';
export const SAVE_SCHEDULE_EVENT_SUCCEEDED = 'SAVE_SCHEDULE_EVENT_SUCCEEDED';
export const SAVE_SCHEDULE_EVENT_ERROR = 'SAVE_SCHEDULE_EVENT_ERROR';

export const DELETE_SCHEDULE_EVENT = 'DELETE_SCHEDULE_EVENT';
export const DELETE_SCHEDULE_EVENT_SUCCEEDED = 'DELETE_SCHEDULE_EVENT_SUCCEEDED';
export const DELETE_SCHEDULE_EVENT_ERROR = 'DELETE_SCHEDULE_EVENT_ERROR';

export const ADD_SCHEDULE_EVENT = 'ADD_SCHEDULE_EVENT';
export const ADD_SCHEDULE_EVENT_SUCCEEDED = 'ADD_SCHEDULE_EVENT_SUCCEEDED';
export const ADD_SCHEDULE_EVENT_ERROR = 'ADD_SCHEDULE_EVENT_ERROR';


/**
 * @description Gets events for given schedule by schedule id
 * @param {string} scheduleId
 * @returns {object}
 * */
export function getScheduleEventsList(scheduleId) {
  return {
    type: GET_SCHEDULE_EVENTS_LIST,
    scheduleId,
  };
}

/**
 * @description Get single schedule event by id
 * @param {string} id
 * @returns {object}
 * */
export function getScheduleEvent(id) {
  return {
    type: GET_SCHEDULE_EVENT,
    id,
  };
}

/**
 * @description Updates changed fields in schedule event's data
 * @param {string} fields
 * @returns {object}
 * */
export function saveScheduleEvent(fields) {
  return {
    type: SAVE_SCHEDULE_EVENT,
    fields,
  };
}

/**
 * @description delete schedule events by id
 * @param {array} ids
 * @returns {object}
 * */
export function deleteScheduleEvent(ids) {
  return {
    type: DELETE_SCHEDULE_EVENT,
    ids,
  };
}

/**
 * @description add new schedule event
 * @param {object} fields
 * @returns {object}
 * */
export function addScheduleEvent(fields) {
  return {
    type: ADD_SCHEDULE_EVENT,
    fields,
  };
}
