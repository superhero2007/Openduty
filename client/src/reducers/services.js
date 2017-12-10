import {
  GET_SERVICES_LIST, GET_SERVICES_LIST_SUCCEEDED, GET_SERVICES_LIST_ERROR,
  GET_SERVICE, GET_SERVICE_SUCCEEDED, GET_SERVICE_ERROR,
  SAVE_SERVICE, SAVE_SERVICE_SUCCEEDED, SAVE_SERVICE_ERROR,
  DELETE_SERVICE, DELETE_SERVICE_SUCCEEDED, DELETE_SERVICE_ERROR,
  ADD_SERVICE, ADD_SERVICE_SUCCEEDED, ADD_SERVICE_ERROR,
} from 'actions/services';

const servicesListReducer = (state = {}, action) => {
  switch (action.type) {
  /**
   *  services list
   */
  case GET_SERVICES_LIST: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_SERVICES_LIST_SUCCEEDED: {
    const { servicesList } = action;
    return {
      ...state,
      data: servicesList.data,
    };
  }
  case GET_SERVICES_LIST_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  single service
   */
  case GET_SERVICE: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_SERVICE_SUCCEEDED: {
    const { service } = action;
    return {
      ...state,
      data: service.data,
    };
  }
  case GET_SERVICE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  save service
   */
  case SAVE_SERVICE: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case SAVE_SERVICE_SUCCEEDED: {
    const { saveStatus } = action;
    return {
      ...state,
      requestStatus: saveStatus.status,
    };
  }
  case SAVE_SERVICE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  delete service
   */
  case DELETE_SERVICE: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case DELETE_SERVICE_SUCCEEDED: {
    const { deleteStatus } = action;
    return {
      ...state,
      requestStatus: deleteStatus.status,
    };
  }
  case DELETE_SERVICE_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  add service
   */
  case ADD_SERVICE: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case ADD_SERVICE_SUCCEEDED: {
    const { addStatus } = action;
    return {
      ...state,
      requestStatus: addStatus.status,
    };
  }
  case ADD_SERVICE_ERROR: {
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

export default servicesListReducer;
