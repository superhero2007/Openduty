import {
  GET_POLICIES_LIST, GET_POLICIES_LIST_SUCCEEDED, GET_POLICIES_LIST_ERROR,
  GET_POLICY, GET_POLICY_SUCCEEDED, GET_POLICY_ERROR,
  SAVE_POLICY, SAVE_POLICY_SUCCEEDED, SAVE_POLICY_ERROR,
  DELETE_POLICY, DELETE_POLICY_SUCCEEDED, DELETE_POLICY_ERROR,
  ADD_POLICY, ADD_POLICY_SUCCEEDED, ADD_POLICY_ERROR,
} from 'actions/policies';

const policiesListReducer = (state = {}, action) => {
  switch (action.type) {
  /**
   *  policies list
   */
  case GET_POLICIES_LIST: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_POLICIES_LIST_SUCCEEDED: {
    const { policiesList } = action;
    return {
      ...state,
      data: policiesList.data,
    };
  }
  case GET_POLICIES_LIST_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  single policy
   */
  case GET_POLICY: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_POLICY_SUCCEEDED: {
    const { policy } = action;
    return {
      ...state,
      data: policy.data,
    };
  }
  case GET_POLICY_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  save policy
   */
  case SAVE_POLICY: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case SAVE_POLICY_SUCCEEDED: {
    const { saveStatus } = action;
    return {
      ...state,
      requestStatus: saveStatus.status,
    };
  }
  case SAVE_POLICY_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  delete policy
   */
  case DELETE_POLICY: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case DELETE_POLICY_SUCCEEDED: {
    const { deleteStatus } = action;
    return {
      ...state,
      requestStatus: deleteStatus.status,
    };
  }
  case DELETE_POLICY_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  add policy
   */
  case ADD_POLICY: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case ADD_POLICY_SUCCEEDED: {
    const { addStatus } = action;
    return {
      ...state,
      requestStatus: addStatus.status,
    };
  }
  case ADD_POLICY_ERROR: {
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

export default policiesListReducer;
