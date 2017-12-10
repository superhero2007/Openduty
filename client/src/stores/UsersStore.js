import {observable, action} from 'mobx';
import RestApi from 'helpers/RestApi';

export default class UsersStore {
  /**
   * @type Object
   */
  @observable usersList;
  @observable user;

  /**
   * @constructor
   */
  constructor() {
    this.api = new RestApi('users');
  }

  @action
  fetchList() {
    this.api.get()
      .then((result) => {
        if (result && result.status === 200) {
          this.usersList = result.data;
          return this.usersList;
        }
        return null; // @TODO: Error handling
      });
  }

  @action
  getOne(id) {
    return this.api.get({id})
      .then((result) => {
        if (result && result.status === 200) {
          this.user = result.data[0];
          return this.user;
        }
        return null; // @TODO: Error handling
      });
  }
}
