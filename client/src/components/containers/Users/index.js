import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';
import { withRouter } from 'react-router';
import icons from 'glyphicons';

import { getUsersList, deleteUser } from 'actions/users';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import UsersList from 'partials/UsersList';

/**
 * @param {object} state
 * @returns {object}
 * */
const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    users: state.users.data,
    getUsersError: state.users.message,
    getConstantsError: state.constants.message,
    deleteRequestSuccess: state.users.requestStatus,
  };
};

/**
 * @param {func} dispatch
 * @returns {object}
 * */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getUsersList,
    deleteUser,
  }, dispatch);
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Users extends Component {
  static propTypes = {
    constants: PropTypes.object,
    history: PropTypes.object.isRequired,
    users: PropTypes.array,
    getUsersList: PropTypes.func.isRequired, // mapped action
    deleteUser: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    users: [],
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
    this.deleteUser = this.deleteUser.bind(this);
    this.showAddUserForm = this.showAddUserForm.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    if (!this.props.constants) {
      this.props.getConstants();
    }
    this.props.getUsersList();
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.deleteRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'User deleted',
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
   * @returns {null}
   * */
  deleteUser(id) {
    this.props.deleteUser(id);
  }

  /**
   * @returns {null}
   * */
  showAddUserForm() {
    this.props.history.push('/users/add/');
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
    const { users, constants } = this.props;
    return (
      <Page>
        <button
          type="button"
          className="btn btn-light"
          aria-label="Add user"
          onClick={this.showAddUserForm}
        >{icons.plus}</button>
        <UsersList
          users={users}
          onUserDelete={this.deleteUser}
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

