import {observable, action} from 'mobx';
import RestApi from 'helpers/RestApi';

export default class IncidentsStore {
  /**
   * @type Object
   */
  @observable incidentsList;

  /**
   * @description Properties to store last request params
   * */
  @observable filters;
  @observable sortField;

  /**
   * @constructor
   */
  constructor() {
    this.filters = {};
    this.sortField = '';
    this.api = new RestApi('incidents');
  }

  @action
  fetchList() {
    this.api.get({
      serviceId: this.filters.selectedService,
      eventType: this.filters.selectedEventType,
      sortField: this.sortField,
    })
      .then((result) => {
        if (result && result.status === 200) {
          this.incidentsList = result.data;
          return this.incidentsList;
        }
        return null; // @TODO: Error handling
      });
  }

  @action
  acknowledge(idsList) {
    return this.updateIncidentStatus(idsList, 'acknowledged');
  }

  @action
  resolve(idsList) {
    return this.updateIncidentStatus(idsList, 'resolved');
  }

  updateIncidentStatus(idsList, statusText) {
    this.api.update({
      id: idsList,
      eventType: statusText,
    })
      .then((response) => {
        if (response.status === 200) {
          return this.fetchList();
        }
        return null; // @TODO: Errors handling
      });
  }
}
