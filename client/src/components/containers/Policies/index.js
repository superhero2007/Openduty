import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import icons from 'glyphicons';
import { AlertList } from 'react-bs-notifier';

import { getPoliciesList, deletePolicy } from 'actions/policies';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import PoliciesList from 'partials/PoliciesList';

/**
 * @param {object} state
 * @returns {object}
 * */
const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    policies: state.policies.data,
    getPoliciesError: state.policies.message,
    getConstantsError: state.constants.message,
    deleteRequestSuccess: state.policies.requestStatus,
  };
};

/**
 * @param {func} dispatch
 * @returns {object}
 * */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getPoliciesList,
    deletePolicy,
  }, dispatch);
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Policies extends Component {
  static propTypes = {
    constants: PropTypes.object,
    policies: PropTypes.array,
    history: PropTypes.object.isRequired,
    getPoliciesList: PropTypes.func.isRequired, // mapped action
    deletePolicy: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };

  static defaultProps = {
    constants: null,
    policies: [],
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
    this.deletePolicy = this.deletePolicy.bind(this);
    this.showAddPolicyForm = this.showAddPolicyForm.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    if (!this.props.constants) {
      this.props.getConstants();
    }
    this.props.getPoliciesList();
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.deleteRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Policy deleted',
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
    if (newProps.getPoliciesError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getPoliciesError,
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
  deletePolicy(requestParams) {
    this.props.deletePolicy(requestParams);
  }

  /**
   * @returns {null}
   * */
  showAddPolicyForm() {
    this.props.history.push('/policies/add/');
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
    const { policies, constants } = this.props;
    return (
      <Page>
        <div className="animated fadeIn container-fluid policies-list">
          <button
            type="button"
            className="btn btn-light"
            aria-label="Add policy"
            onClick={this.showAddPolicyForm}
          >{icons.plus}</button>
          <PoliciesList
            onPolicyDelete={this.deletePolicy}
            policiesList={policies}
          />
          {this.state.alerts && this.state.alerts.length > 0 && <AlertList
            position={constants ? constants.alertsPosition : 'top-right'}
            alerts={this.state.alerts}
            timeout={constants ? constants.alertsTimeout : 5000}
            dismissTitle="Close"
            onDismiss={this.clearMessage}
          />}
        </div>
      </Page>
    );
  }
}
