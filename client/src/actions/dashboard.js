export const GET_DASHBOARD_LOG = 'GET_DASHBOARD_LOG';
export const GET_DASHBOARD_LOG_SUCCEEDED = 'GET_DASHBOARD_LOG_SUCCEEDED';
export const GET_DASHBOARD_LOG_ERROR = 'GET_DASHBOARD_LOG_ERROR';

/**
 * @description Actions for working with dashboard
 * @param {array} serviceId
 * @returns {object}
 * */
export function getDashboardLog(serviceId) {
  return {
    type: GET_DASHBOARD_LOG,
    serviceId,
  };
}
