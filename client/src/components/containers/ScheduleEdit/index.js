import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';

import { getSchedule, saveSchedule, addSchedule } from 'actions/schedules';
import { getScheduleEvent, saveScheduleEvent, addScheduleEvent } from 'actions/scheduleEvents';
import { getUsersList } from 'actions/users';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import ScheduleEditForm from 'forms/ScheduleEditForm';
import ScheduleEventEditForm from 'forms/ScheduleEventEditForm';

const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    schedule: state.schedules.data,
    scheduleEvent: state.scheduleEvents.data,
    users: state.users.data,
    getUsersError: state.users.message,
    getScheduleEventsError: state.scheduleEvents.message,
    getScheduleError: state.schedules.message,
    getConstantsError: state.constants.message,
    saveRequestSuccess: state.schedules.requestStatus,
    saveEventRequestSuccess: state.scheduleEvents.requestStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getSchedule,
    saveSchedule,
    addSchedule,
    getScheduleEvent,
    saveScheduleEvent,
    addScheduleEvent,
    getUsersList,
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Schedules extends Component {
  static propTypes = {
    constants: PropTypes.object,
    match: PropTypes.object.isRequired,
    users: PropTypes.array,
    schedule: PropTypes.array,
    scheduleEvent: PropTypes.array,
    add: PropTypes.bool,
    addEvent: PropTypes.bool,
    getSchedule: PropTypes.func.isRequired, // mapped action
    getScheduleEvent: PropTypes.func.isRequired, // mapped action
    getUsersList: PropTypes.func.isRequired, // mapped action
    saveSchedule: PropTypes.func.isRequired, // mapped action
    addSchedule: PropTypes.func.isRequired, // mapped action
    saveScheduleEvent: PropTypes.func.isRequired, // mapped action
    addScheduleEvent: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    users: [],
    schedule: [],
    scheduleEvent: [],
    add: false,
    addEvent: false,
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
    this.loadSchedule = this.loadSchedule.bind(this);
    this.onScheduleSave = this.onScheduleSave.bind(this);
    this.onScheduleAdd = this.onScheduleAdd.bind(this);
    this.loadScheduleEvent = this.loadScheduleEvent.bind(this);
    this.onScheduleEventAdd = this.onScheduleEventAdd.bind(this);
    this.onScheduleEventSave = this.onScheduleEventSave.bind(this);
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
    if (newProps.saveRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Schedule saved',
      });
    }
    if (newProps.saveEventRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Schedule event saved',
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
    if (newProps.getScheduleEventsError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getScheduleEventsError,
      });
    }
    if (newProps.getScheduleError) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'danger',
        headline: 'ERROR: ',
        message: newProps.getScheduleError,
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
  onScheduleSave(fields) {
    this.props.saveSchedule(fields);
  }

  /**
   * @param {object} fields
   * @returns {null}
   * */
  onScheduleAdd(fields) {
    this.props.addSchedule(fields);
  }

  /**
   * @param {object} fields
   * @returns {null}
   * */
  onScheduleEventSave(fields) {
    this.props.saveScheduleEvent(fields);
  }

  /**
   * @description Creates new event via API
   * @param {object} fields
   * @returns {null}
   * */
  onScheduleEventAdd(fields) {
    this.props.addScheduleEvent(fields);
  }

  /**
   * @description Initiates schedule loading by id
   * @returns {null}
   * */
  loadSchedule() {
    const scheduleId = this.props.match.params.id;
    this.props.getSchedule(scheduleId);
  }

  /**
   * @description Initiates schedule event loading by id
   * @returns {null}
   * */
  loadScheduleEvent() {
    const eventId = this.props.match.params.eventId;
    this.props.getScheduleEvent(eventId);
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
    const { constants, match, add, addEvent, users, schedule, scheduleEvent } = this.props;
    return (
      <Page>
        {/* Schedules */}
        {match.params.id && <ScheduleEditForm
          schedule={schedule ? schedule[0] : {}}
          initialAction={this.loadSchedule}
          onScheduleSave={this.onScheduleSave}
        />}
        {!match.params.id && add && <ScheduleEditForm
          schedule={{}}
          onScheduleSave={this.onScheduleAdd}
        />}
        {/* Schedule events */}
        {constants && match.params.eventId && <ScheduleEventEditForm
          scheduleEvent={scheduleEvent ? scheduleEvent[0] : {}}
          users={users}
          initialAction={this.loadScheduleEvent}
          onScheduleEventSave={this.onScheduleEventSave}
          formats={constants.datepickerFormats}
        />}
        {constants && !match.params.eventId && match.params.scheduleId && addEvent && <ScheduleEventEditForm
          scheduleEvent={{}}
          users={users}
          calendarId={match.params.calendarId}
          onScheduleEventSave={this.onScheduleEventAdd}
          formats={constants.datepickerFormats}
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
