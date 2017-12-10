import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { withRouter } from 'react-router';
import icons from 'glyphicons';

import './index.scss';

@withRouter
export default class ServicesList extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    services: PropTypes.array,
    onServiceDelete: PropTypes.func.isRequired,
  };
  static defaultProps = {
    services: [],
  };
  /**
   * @constructor
   * @param {array} props
   * @returns {null}
   * */
  constructor(props) {
    super(props);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.onServiceDelete = this.onServiceDelete.bind(this);
  }

  /**
   * @param {string} serviceId
   * @returns {null}
   * */
  onServiceDelete(serviceId) {
    this.props.onServiceDelete(serviceId);
  }

  /**
   * @param {string} serviceId
   * @returns {null}
   * */
  handleEditButtonClick(serviceId) {
    this.props.history.push(`/services/edit/${serviceId}`);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { services } = this.props;
    return (
      <div className="animated fadeIn users-list">
        {services && services.length > 0 &&
        <div className="container">
          <div className="row">
            <div className="col users-list-header">Service name</div>
            <div className="col users-list-header">Notifications status</div>
            <div className="col users-list-header">Incidents</div>
            <div className="col" />
          </div>
          {services.map((item) => {
            return (<div className="row" key={item.id}>
              <div className="col">{item.name}</div>
              <div className="col">{`Notifications for this service are ${item.notificationsDisabled ? 'disabled' : 'enabled'}.`}</div>
              <div className="col">{item.incidentsCount ? item.incidentsCount : '-'}</div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Edit user"
                  onClick={() => {
                    this.handleEditButtonClick(item.id);
                  }}
                >{icons.edit}</button>
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Delete service"
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.onServiceDelete(item.id);
                  }}
                >{icons.crossHeavy}</button>
              </div>
            </div>);
          })}
        </div>
        }
        {services && services.length === 0 &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}
