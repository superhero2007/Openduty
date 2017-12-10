import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';

import { getService, saveService, addService } from 'actions/services';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import ServiceEditForm from 'forms/ServiceEditForm';

const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    service: state.services.data && state.services.data[0],
    getServiceError: state.services.message,
    getConstantsError: state.constants.message,
    saveRequestSuccess: state.services.requestStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getService,
    saveService,
    addService,
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ServiceEdit extends Component {
  static propTypes = {
    constants: PropTypes.object,
    match: PropTypes.object.isRequired,
    service: PropTypes.object,
    add: PropTypes.bool,
    saveService: PropTypes.func.isRequired, // mapped action
    addService: PropTypes.func.isRequired, // mapped action
    getService: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    service: null,
    add: false,
  };

  /**
   * @constructor
   * @param {array} props
   * @returns {null}
   * */
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
    };
    this.onServiceSave = this.onServiceSave.bind(this);
    this.onServiceAdd = this.onServiceAdd.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    if (!this.props.constants) {
      this.props.getConstants();
    }
    const serviceId = this.props.match.params.id;
    this.props.getService(serviceId);
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.saveRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Service saved',
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
    if (newProps.getServiceError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getServiceError,
      });
    }

    if (alerts.length > 0) {
      this.setState({alerts});
    }
  }

  /**
   * @param {object} fields
   * @returns {null}
   * */
  onServiceSave(fields) {
    this.props.saveService(fields);
  }

  /**
   * @param {object} fields
   * @returns {null}
   * */
  onServiceAdd(fields) {
    this.props.addService(fields);
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
    const { constants, service, match, add } = this.props;
    return (
      <Page>
        {match.params.id && <ServiceEditForm
          service={service}
          initialAction={this.loadService}
          onServiceSave={this.onServiceSave}
        />}
        {!match.params.id && add && <ServiceEditForm
          service={{}}
          onServiceSave={this.onServiceAdd}
        />}
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
