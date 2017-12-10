import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { AlertList } from 'react-bs-notifier';
import icons from 'glyphicons';


import { getSchedulesList, deleteSchedule } from 'actions/schedules';
import { getConstants } from 'actions/constants';


import Page from 'layout/Page';
import SchedulesList from 'partials/SchedulesList';

/**
 * @param {object} state
 * @returns {object}
 * */
const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    schedules: state.schedules.data,
    getSchedulesError: state.schedules.message,
    getConstantsError: state.constants.message,
    deleteRequestSuccess: state.schedules.requestStatus,
  };
};

/**
 * @param {func} dispatch
 * @returns {object}
 * */
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getSchedulesList,
    deleteSchedule,
  }, dispatch);
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Schedules extends Component {
  static propTypes = {
    constants: PropTypes.object,
    schedules: PropTypes.array,
    history: PropTypes.object.isRequired,
    getSchedulesList: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
    deleteSchedule: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    schedules: [],
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
    this.deleteSchedule = this.deleteSchedule.bind(this);
    this.showAddScheduleForm = this.showAddScheduleForm.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    if (!this.props.constants) {
      this.props.getConstants();
    }
    this.props.getSchedulesList();
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.deleteRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Schedule deleted',
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

    if (alerts.length > 0) {
      this.setState({alerts});
    }
  }

  /**
   * @param {object} requestParams
   * @returns {null}
   * */
  deleteSchedule(requestParams) {
    this.props.deleteSchedule(requestParams);
  }

  /**
   * @returns {null}
   * */
  showAddScheduleForm() {
    this.props.history.push('/schedules/add/');
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
    const { schedules, constants } = this.props;
    return (
      <Page>
        <button
          type="button"
          className="btn btn-light"
          aria-label="Add schedule"
          onClick={this.showAddScheduleForm}
        >{icons.plus}</button>
        <SchedulesList
          onScheduleDelete={this.deleteSchedule}
          schedulesList={schedules}
          initialAction={this.loadInitialList}
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
