export const GET_CONSTANTS = 'GET_CONSTANTS';
export const GET_CONSTANTS_SUCCEEDED = 'GET_CONSTANTS_SUCCEEDED';
export const GET_CONSTANTS_ERROR = 'GET_CONSTANTS_ERROR';

/**
 * @description Actions for working with dashboard
 * @returns {object}
 * */
export function getConstants() {
  return {
    type: GET_CONSTANTS,
  };
}
