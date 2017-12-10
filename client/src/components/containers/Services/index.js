import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';
import { withRouter } from 'react-router';
import icons from 'glyphicons';


import { getServicesList, deleteService } from 'actions/services';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import ServicesList from 'partials/ServicesList';

/**
 * @param {object} state
 * @returns {object}
 * */
const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    services: state.services.data,
    getServicesError: state.services.message,
    getConstantsError: state.constants.message,
    deleteRequestSuccess: state.services.requestStatus,
  };
};

/**
 * @param {func} dispatch
 * @returns {object}
 * */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getServicesList,
    deleteService,
  }, dispatch);
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Services extends Component {
  static propTypes = {
    constants: PropTypes.object,
    history: PropTypes.object.isRequired,
    services: PropTypes.array.isRequired,
    getServicesList: PropTypes.func.isRequired, // mapped action
    deleteService: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    services: [],
  };

  /**
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
    };
    this.deleteService = this.deleteService.bind(this);
    this.showAddServiceForm = this.showAddServiceForm.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    if (!this.props.constants) {
      this.props.getConstants();
    }
    this.props.getServicesList();
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.deleteRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Service deleted',
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
   * @param {object} requestParams
   * @returns {null}
   * */
  deleteService(requestParams) {
    this.props.deleteService(requestParams);
  }

  /**
   * @returns {null}
   * */
  showAddServiceForm() {
    this.props.history.push('/services/add/');
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
    const { services, constants } = this.props;
    return (
      <Page>
        <button
          type="button"
          className="btn btn-light"
          aria-label="Add service"
          onClick={this.showAddServiceForm}
        >{icons.plus}</button>
        <ServicesList
          onServiceDelete={this.deleteService}
          services={services}
        />
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
