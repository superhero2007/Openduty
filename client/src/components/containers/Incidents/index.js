import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';

import { getIncidentsList, acknowledge, resolve } from 'actions/incidents';
import { getServicesList } from 'actions/services';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import IncidentsFilters from 'forms/IncidentsFilters';
import IncidentsList from 'partials/IncidentsList';

const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    incidents: state.incidents.data,
    services: state.services.data,
    ackStatus: state.incidents.ackStatus,
    resolveStatus: state.incidents.resolveStatus,
    getServicesError: state.services.message,
    getincidentsError: state.incidents.message,
    getConstantsError: state.constants.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getIncidentsList,
    getServicesList,
    acknowledge,
    resolve,
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Incidents extends Component {
  static propTypes = {
    constants: PropTypes.object,
    incidents: PropTypes.array,
    services: PropTypes.array,
    getServicesList: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
    getIncidentsList: PropTypes.func.isRequired, // mapped action
    acknowledge: PropTypes.func.isRequired, // mapped action
    resolve: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    incidents: [],
    services: [],
  };

  /**
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        selectedService: '',
        selectedEventType: '',
      },
      sortField: '',
      alerts: [],
    };
    this.onFiltersChange = this.onFiltersChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onIncidentsResolved = this.onIncidentsResolved.bind(this);
    this.onIncidentsAcknowledged = this.onIncidentsAcknowledged.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    if (!this.props.constants) {
      this.props.getConstants();
    }
    this.props.getServicesList();
    this.updateList();
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.ackStatus) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Incidents marked as "acknowledged"',
      });
    }
    if (newProps.resolveStatus) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Incidents marked as "resolved"',
      });
    }
    if (newProps.getincidentsError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getincidentsError,
      });
    }
    if (newProps.getConstantsError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getConstantsError,
      });
    }
    if (newProps.getServicesError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getServicesError,
      });
    }

    if (alerts.length > 0) {
      this.setState({alerts});
    }
  }

  /**
   * @param {object} filters
   * @returns {null}
   * */
  onFiltersChange(filters) {
    this.setState({filters}, () => {
      this.updateList();
    });
  }

  /**
   * @param {string} sortField
   * @returns {null}
   * */
  onSortChange(sortField) {
    this.setState({sortField}, () => {
      this.updateList();
    });
  }

  /**
   * @param {array} ids
   * @returns {null}
   * */
  onIncidentsAcknowledged(ids) {
    this.props.acknowledge(ids);
  }

  /**
   * @param {array} ids
   * @returns {null}
   * */
  onIncidentsResolved(ids) {
    this.props.resolve(ids);
  }

  /**
   * @returns {null}
   * */
  updateList() {
    this.props.getIncidentsList({filters: this.state.filters, sortField: this.state.sortField});
  }

  /**
   *  @description Clears the message on dismiss
   *  @param {object} alert
   *  @returns {null}
   */
  clearMessage(alert) {
    const alerts = this.state.alerts;
    const idx = alerts.indexOf(alert);

    if (idx >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)],
      });
    }
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { constants, incidents, services } = this.props;
    return (
      <Page>
        <div className="animated fadeIn container-fluid incidents-list">
          {constants && services && <IncidentsFilters
            servicesList={services}
            possibleValues={constants.eventTypes}
            onFiltersChange={this.onFiltersChange}
          />
          }
          <IncidentsList
            onResolved={this.onIncidentsResolved}
            onAcknowledged={this.onIncidentsAcknowledged}
            onSortChange={this.onSortChange}
            incidentsList={incidents}
          />
        </div>
        {this.state.alerts && this.state.alerts.length > 0 && <AlertList
          position={constants ? constants.alertsPosition : 'top-right'}
          alerts={this.state.alerts}
          timeout={constants ? constants.alertsTimeout : 5000}
          dismissTitle="Close"
          onDismiss={this.clearMessage}
        />}
      </Page>
    );
  }
}
