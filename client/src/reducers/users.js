import {
  GET_USERS_LIST, GET_USERS_LIST_SUCCEEDED, GET_USERS_LIST_ERROR,
  GET_USER, GET_USER_SUCCEEDED, GET_USER_ERROR,
  SAVE_USER, SAVE_USER_SUCCEEDED, SAVE_USER_ERROR,
  DELETE_USER, DELETE_USER_SUCCEEDED, DELETE_USER_ERROR,
  ADD_USER, ADD_USER_SUCCEEDED, ADD_USER_ERROR,
} from 'actions/users';

const usersListReducer = (state = {}, action) => {
  switch (action.type) {
  /**
   *  users list
   */
  case GET_USERS_LIST: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_USERS_LIST_SUCCEEDED: {
    const { usersList } = action;
    return {
      ...state,
      data: usersList.data,
    };
  }
  case GET_USERS_LIST_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  single user
   */
  case GET_USER: {
    return {
      ...state,
      data: [],
      requestStatus: null,
    };
  }
  case GET_USER_SUCCEEDED: {
    const { user } = action;
    return {
      ...state,
      data: user.data,
    };
  }
  case GET_USER_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: [],
    };
  }
  /**
   *  save user
   */
  case SAVE_USER: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case SAVE_USER_SUCCEEDED: {
    const { saveStatus } = action;
    return {
      ...state,
      requestStatus: saveStatus.status,
    };
  }
  case SAVE_USER_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  delete user
   */
  case DELETE_USER: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case DELETE_USER_SUCCEEDED: {
    const { deleteStatus } = action;
    return {
      ...state,
      requestStatus: deleteStatus.status,
    };
  }
  case DELETE_USER_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      requestStatus: null,
    };
  }
  /**
   *  add user
   */
  case ADD_USER: {
    return {
      ...state,
      requestStatus: null,
    };
  }
  case ADD_USER_SUCCEEDED: {
    const { addStatus } = action;
    return {
      ...state,
      requestStatus: addStatus.status,
    };
  }
  case ADD_USER_ERROR: {
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

export default usersListReducer;
