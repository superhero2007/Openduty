import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';

import { getUser, saveUser, addUser } from 'actions/users';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import UserEditForm from 'forms/UserEditForm';

const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    user: state.users.data,
    getUserError: state.users.message,
    getConstantsError: state.constants.message,
    saveRequestSuccess: state.users.requestStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getUser,
    saveUser,
    addUser,
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class UserEdit extends Component {
  static propTypes = {
    constants: PropTypes.object,
    match: PropTypes.object.isRequired,
    user: PropTypes.array,
    add: PropTypes.bool,
    saveUser: PropTypes.func.isRequired, // mapped action
    addUser: PropTypes.func.isRequired, // mapped action
    getUser: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    user: [],
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
    this.onUserSave = this.onUserSave.bind(this);
    this.onUserAdd = this.onUserAdd.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    const userId = this.props.match.params.id;
    if (!this.props.constants) {
      this.props.getConstants();
    }
    this.props.getUser(userId);
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.saveRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'User saved',
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
    if (newProps.getUserError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getUserError,
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
  onUserSave(fields) {
    this.props.saveUser(fields);
  }

  /**
   * @param {object} fields
   * @returns {null}
   * */
  onUserAdd(fields) {
    this.props.addUser(fields);
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
    const { user, constants, match, add } = this.props;

    return (
      <Page>
        {constants && match.params.id && <UserEditForm
          user={user ? user[0] : null}
          onUserSave={this.onUserSave}
          notificationTypes={constants.notificationTypes}
        />}
        {constants && !match.params.id && add && <UserEditForm
          user={{}}
          onUserSave={this.onUserAdd}
          notificationTypes={constants.notificationTypes}
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
