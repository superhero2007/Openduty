import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';

import { getDashboardLog } from 'actions/dashboard';
import { getServicesList } from 'actions/services';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import DashboardFilters from 'forms/DashboardFilters';
import DashboardLog from 'partials/DashboardLog';


const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    dashboardLog: state.dashboard.data,
    services: state.services.data,
    getServicesError: state.services.message,
    getdashboardError: state.dashboard.message,
    getConstantsError: state.constants.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getServicesList,
    getDashboardLog,
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Dashboard extends Component {
  static propTypes = {
    constants: PropTypes.object,
    dashboardLog: PropTypes.array,
    services: PropTypes.array,
    getServicesList: PropTypes.func.isRequired, // mapped action
    getDashboardLog: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    dashboardLog: [],
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
      },
      alerts: [],
    };
    this.onFiltersChange = this.onFiltersChange.bind(this);
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
    if (newProps.getdashboardError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getdashboardError,
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
   * @returns {null}
   * */
  updateList() {
    this.props.getDashboardLog(this.state.filters.selectedService);
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
    const { dashboardLog, services, constants } = this.props;
    return (
      <Page>
        <div className="animated fadeIn container-fluid incidents-list">
          <DashboardFilters
            servicesList={services}
            onFiltersChange={this.onFiltersChange}
          />
          <DashboardLog
            dashboardLog={dashboardLog}
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
