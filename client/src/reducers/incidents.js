import {
  GET_INCIDENTS_LIST, GET_INCIDENTS_LIST_SUCCEEDED, GET_INCIDENTS_LIST_ERROR,
  ACKNOWLEDGE, ACKNOWLEDGE_SUCCEEDED, ACKNOWLEDGE_ERROR,
  RESOLVE, RESOLVE_SUCCEEDED, RESOLVE_ERROR,
} from 'actions/incidents';

const incidentsListReducer = (state = {}, action) => {
  switch (action.type) {
  case GET_INCIDENTS_LIST: {
    return {
      ...state,
      data: [],
    };
  }
  case GET_INCIDENTS_LIST_SUCCEEDED: {
    const { incidentsList } = action;
    return {
      ...state,
      data: incidentsList.data,
    };
  }
  case GET_INCIDENTS_LIST_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  case ACKNOWLEDGE: {
    return {
      ...state,
      ackStatus: null,
    };
  }
  case ACKNOWLEDGE_SUCCEEDED: {
    const { ackStatus } = action;
    return {
      ...state,
      ackStatus: ackStatus.status,
    };
  }
  case ACKNOWLEDGE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      ackStatus: null,
    };
  }
  case RESOLVE: {
    return {
      ...state,
      resolveStatus: null,
    };
  }
  case RESOLVE_SUCCEEDED: {
    const { resolveStatus } = action;
    return {
      ...state,
      resolveStatus: resolveStatus.status,
    };
  }
  case RESOLVE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      resolveStatus: null,
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default incidentsListReducer;
