import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';

import { getPolicy, savePolicy, addPolicy } from 'actions/policies';
import { getUsersList } from 'actions/users';
import { getConstants } from 'actions/constants';
import { getSchedulesList } from 'actions/schedules';

import Page from 'layout/Page';
import PolicyEditForm from 'forms/PolicyEditForm';

const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    users: state.users.data,
    schedules: state.schedules.data,
    policy: state.policies.data,
    getUsersError: state.users.message,
    getSchedulesError: state.schedules.message,
    getConstantsError: state.constants.message,
    saveRequestSuccess: state.policies.requestStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getPolicy,
    savePolicy,
    addPolicy,
    getUsersList,
    getSchedulesList,
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class PolicyEdit extends Component {
  static propTypes = {
    constants: PropTypes.object,
    policy: PropTypes.array,
    users: PropTypes.array,
    schedules: PropTypes.array,
    add: PropTypes.bool,
    match: PropTypes.object.isRequired,
    getPolicy: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
    savePolicy: PropTypes.func.isRequired, // mapped action
    addPolicy: PropTypes.func.isRequired, // mapped action
    getUsersList: PropTypes.func.isRequired, // mapped action
    getSchedulesList: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    policy: [],
    users: [],
    schedules: [],
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
    this.onPolicySave = this.onPolicySave.bind(this);
    this.onPolicyAdd = this.onPolicyAdd.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    const policyId = this.props.match.params.id;
    if (!this.props.constants) {
      this.props.getConstants();
    }
    this.props.getUsersList();
    this.props.getSchedulesList();
    this.props.getPolicy(policyId);
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.saveRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Policy saved',
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
    if (newProps.getSchedulesError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getSchedulesError,
      });
    }
    if (newProps.getUsersError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getUsersError,
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
  onPolicySave(fields) {
    this.props.savePolicy(fields);
  }

  /**
   * @param {object} fields
   * @returns {null}
   * */
  onPolicyAdd(fields) {
    this.props.addPolicy(fields);
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
    const { match, add, policy, users, schedules, constants } = this.props;
    return (
      <Page>
        {match.params.id && <PolicyEditForm
          policy={policy ? policy[0] : {}}
          onPolicySave={this.onPolicySave}
          users={users}
          schedules={schedules}
        />}
        {!match.params.id && add && <PolicyEditForm
          policy={{}}
          onPolicySave={this.onPolicyAdd}
          users={users}
          schedules={schedules}
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
