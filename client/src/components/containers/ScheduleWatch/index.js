import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AlertList } from 'react-bs-notifier';

import { getSchedule, addSchedule } from 'actions/schedules';
import { getScheduleEventsList, deleteScheduleEvent } from 'actions/scheduleEvents';
import { getConstants } from 'actions/constants';

import Page from 'layout/Page';
import ScheduleCalendar from 'partials/ScheduleCalendar';

const mapStateToProps = (state) => {
  return {
    constants: state.constants.data,
    schedule: state.schedules.data,
    scheduleEvents: state.scheduleEvents.data,
    getScheduleError: state.schedules.message,
    getScheduleEventsError: state.scheduleEvents.message,
    getConstantsError: state.constants.message,
    deleteRequestSuccess: state.scheduleEvents.requestStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getConstants,
    getSchedule,
    addSchedule,
    getScheduleEventsList,
    deleteScheduleEvent,
  }, dispatch);
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SchedulesWatch extends Component {
  static propTypes = {
    constants: PropTypes.object,
    match: PropTypes.object.isRequired,
    schedule: PropTypes.array,
    scheduleEvents: PropTypes.array,
    getSchedule: PropTypes.func.isRequired, // mapped action
    getScheduleEventsList: PropTypes.func.isRequired, // mapped action
    deleteScheduleEvent: PropTypes.func.isRequired, // mapped action
    getConstants: PropTypes.func.isRequired, // mapped action
  };
  static defaultProps = {
    constants: null,
    schedule: [],
    scheduleEvents: [],
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
    this.deleteScheduleEvent = this.deleteScheduleEvent.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  componentWillMount() {
    const scheduleId = this.props.match.params.id;

    if (!this.props.constants) {
      this.props.getConstants();
    }

    this.props.getSchedule(scheduleId);
    this.props.getScheduleEventsList(scheduleId);
  }

  componentWillReceiveProps(newProps) {
    // Forms the array of all possible messages to show them as alerts
    const alerts = [];
    if (newProps.deleteRequestSuccess) {
      alerts.push({
        id: (new Date()).getTime(),
        type: 'success',
        message: 'Schedule event deleted',
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
   * @description Deletes event selected in calendar view
   * @returns {null}
   * */
  deleteScheduleEvent(eventId) {
    this.props.deleteScheduleEvent(eventId);
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
    const { schedule, scheduleEvents, match, constants } = this.props;

    return (
      <Page>
        {constants && match.params.id && <ScheduleCalendar
          schedule={schedule ? schedule[0] : {}}
          scheduleEvents={scheduleEvents}
          onEventDelete={this.deleteScheduleEvent}
          formats={constants.calendarFormats}
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
