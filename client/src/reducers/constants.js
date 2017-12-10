import {
  GET_CONSTANTS, GET_CONSTANTS_SUCCEEDED, GET_CONSTANTS_ERROR,
} from 'actions/constants';

const constantsReducer = (state = {}, action) => {
  switch (action.type) {
  case GET_CONSTANTS: {
    return {
      ...state,
      data: null,
    };
  }
  case GET_CONSTANTS_SUCCEEDED: {
    const { constants } = action;
    return {
      ...state,
      data: constants.data,
    };
  }
  case GET_CONSTANTS_ERROR: {
    const { message } = action;
    return {
      ...state,
      message,
      data: null,
    };
  }
  default:
    return {
      ...state,
    };
  }
};

export default constantsReducer;
