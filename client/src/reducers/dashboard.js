import {
  GET_DASHBOARD_LOG, GET_DASHBOARD_LOG_SUCCEEDED, GET_DASHBOARD_LOG_ERROR,
} from 'actions/dashboard';

const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
  /**
   *  single dasboard log
   */
  case GET_DASHBOARD_LOG: {
    return {
      data: [],
      ...state,
    };
  }
  case GET_DASHBOARD_LOG_SUCCEEDED: {
    const { dashboardLog } = action;
    return {
      ...state,
      data: dashboardLog.data,
    };
  }
  case GET_DASHBOARD_LOG_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default dashboardReducer;
