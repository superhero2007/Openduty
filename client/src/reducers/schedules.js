import {
  GET_SCHEDULES_LIST, GET_SCHEDULES_LIST_SUCCEEDED, GET_SCHEDULES_LIST_ERROR,
  GET_SCHEDULE, GET_SCHEDULE_SUCCEEDED, GET_SCHEDULE_ERROR,
  SAVE_SCHEDULE, SAVE_SCHEDULE_SUCCEEDED, SAVE_SCHEDULE_ERROR,
  DELETE_SCHEDULE, DELETE_SCHEDULE_SUCCEEDED, DELETE_SCHEDULE_ERROR,
  ADD_SCHEDULE, ADD_SCHEDULE_SUCCEEDED, ADD_SCHEDULE_ERROR,
} from 'actions/schedules';

const schedulesListReducer = (state = {}, action) => {
  switch (action.type) {
  /**
   *  schedules list
   */
  case GET_SCHEDULES_LIST: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_SCHEDULES_LIST_SUCCEEDED: {
    const { schedulesList } = action;
    return {
      ...state,
      data: schedulesList.data,
    };
  }
  case GET_SCHEDULES_LIST_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  single schedule
   */
  case GET_SCHEDULE: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_SCHEDULE_SUCCEEDED: {
    const { schedule } = action;
    return {
      ...state,
      data: schedule.data,
    };
  }
  case GET_SCHEDULE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  save schedule
   */
  case SAVE_SCHEDULE: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case SAVE_SCHEDULE_SUCCEEDED: {
    const { saveStatus } = action;
    return {
      ...state,
      requestStatus: saveStatus.status,
    };
  }
  case SAVE_SCHEDULE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  delete schedule
   */
  case DELETE_SCHEDULE: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case DELETE_SCHEDULE_SUCCEEDED: {
    const { deleteStatus } = action;
    return {
      ...state,
      requestStatus: deleteStatus.status,
    };
  }
  case DELETE_SCHEDULE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  add schedule
   */
  case ADD_SCHEDULE: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case ADD_SCHEDULE_SUCCEEDED: {
    const { addStatus } = action;
    return {
      ...state,
      requestStatus: addStatus.status,
    };
  }
  case ADD_SCHEDULE_ERROR: {
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

export default schedulesListReducer;
