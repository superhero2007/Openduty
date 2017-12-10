import {
  GET_SCHEDULE_EVENTS_LIST, GET_SCHEDULE_EVENTS_LIST_SUCCEEDED, GET_SCHEDULE_EVENTS_LIST_ERROR,
  GET_SCHEDULE_EVENT, GET_SCHEDULE_EVENT_SUCCEEDED, GET_SCHEDULE_EVENT_ERROR,
  SAVE_SCHEDULE_EVENT, SAVE_SCHEDULE_EVENT_SUCCEEDED, SAVE_SCHEDULE_EVENT_ERROR,
  DELETE_SCHEDULE_EVENT, DELETE_SCHEDULE_EVENT_SUCCEEDED, DELETE_SCHEDULE_EVENT_ERROR,
  ADD_SCHEDULE_EVENT, ADD_SCHEDULE_EVENT_SUCCEEDED, ADD_SCHEDULE_EVENT_ERROR,
} from 'actions/scheduleEvents';

const scheduleEventsListReducer = (state = {}, action) => {
  switch (action.type) {
  /**
   *  scheduleEvents list
   */
  case GET_SCHEDULE_EVENTS_LIST: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_SCHEDULE_EVENTS_LIST_SUCCEEDED: {
    const { scheduleEventsList } = action;
    return {
      ...state,
      data: scheduleEventsList.data,
    };
  }
  case GET_SCHEDULE_EVENTS_LIST_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  single scheduleEvent
   */
  case GET_SCHEDULE_EVENT: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_SCHEDULE_EVENT_SUCCEEDED: {
    const { scheduleEvent } = action;
    return {
      ...state,
      data: scheduleEvent.data,
    };
  }
  case GET_SCHEDULE_EVENT_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  save scheduleEvent
   */
  case SAVE_SCHEDULE_EVENT: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case SAVE_SCHEDULE_EVENT_SUCCEEDED: {
    const { saveStatus } = action;
    return {
      ...state,
      requestStatus: saveStatus.status,
    };
  }
  case SAVE_SCHEDULE_EVENT_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  delete scheduleEvent
   */
  case DELETE_SCHEDULE_EVENT: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case DELETE_SCHEDULE_EVENT_SUCCEEDED: {
    const { deleteStatus } = action;
    return {
      ...state,
      requestStatus: deleteStatus.status,
    };
  }
  case DELETE_SCHEDULE_EVENT_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  add scheduleEvent
   */
  case ADD_SCHEDULE_EVENT: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case ADD_SCHEDULE_EVENT_SUCCEEDED: {
    const { addStatus } = action;
    return {
      ...state,
      requestStatus: addStatus.status,
    };
  }
  case ADD_SCHEDULE_EVENT_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default scheduleEventsListReducer;
