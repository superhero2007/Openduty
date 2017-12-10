import {observable, action} from 'mobx';
import RestApi from 'helpers/RestApi';

export default class IncidentsStore {
  /**
   * @type Object
   */
  @observable servicesList;

  /**
   * @constructor
   */
  constructor() {
    this.api = new RestApi('services');
  }

  @action
  fetchList(sort) {
    this.api.get({sort})
      .then((result) => {
        if (result && result.status === 200) {
          this.servicesList = result.data;
          return this.servicesList;
        }
        return null; // @TODO: Error handling
      });
  }
}
