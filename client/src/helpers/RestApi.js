import axios from 'axios';

export default class RestApi {
  constructor(endpointEntity) {
    this.endpointEntity = `/api/${endpointEntity}/`;
  }

  get(requestData) {
    RestApi.cleanEmptyParams(requestData);
    return axios.get(`${this.endpointEntity}get`, {params: requestData});
  }

  add(requestData) {
    return axios.put(`${this.endpointEntity}add`, requestData);
  }

  update(requestData) {
    return axios.post(`${this.endpointEntity}update`, requestData);
  }

  delete(requestData) {
    RestApi.cleanEmptyParams(requestData);
    return axios.delete(`${this.endpointEntity}delete`, {params: requestData});
  }
  static cleanEmptyParams(requestData) {
    if (requestData) {
      const paramKeys = Object.keys(requestData);

      // cleans empty parameter keys
      paramKeys.forEach((param) => {
        if (!requestData[param]) {
          delete requestData[param];
        }
      });
    }
  }
}
