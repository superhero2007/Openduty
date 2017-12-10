import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class ScheduleEventEditForm extends Component {
  static propTypes = {
    scheduleEvent: PropTypes.object,
    formats: PropTypes.object.isRequired,
    users: PropTypes.array,
    onScheduleEventSave: PropTypes.func.isRequired,
    initialAction: PropTypes.func,
  };
  static defaultProps = {
    scheduleEvent: {},
    users: [],
    initialAction: null,
  };

  /**
   * @constructor
   * @param {array} props
   * @returns {null}
   * */
  constructor(props) {
    super(props);
    this.state = {};

    this.onInputChange = this.onInputChange.bind(this);
    this.saveScheduleEvent = this.saveScheduleEvent.bind(this);
  }

  componentWillMount() {
    if (this.props.initialAction) {
      this.props.initialAction();
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.id && newProps.scheduleEvent && newProps.scheduleEvent.id) {
      this.setState({id: newProps.scheduleEvent.id});
    }
  }

  /**
   * @param {object} evt
   * @returns {null}
   * */
  onInputChange(evt) {
    const target = evt.target;
    let value = target.value;

    if (target.type === 'checkbox') {
      value = target.checked;
    }
    this.setState({[target.name]: value});
  }

  /**
   *  @description Updates schedule with changed fields
   *  @param {function} evt
   *  @returns {null}
   */
  saveScheduleEvent(evt) {
    evt.preventDefault();
    this.props.onScheduleEventSave(this.state);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { scheduleEvent, users, formats } = this.props;
    return (
      <div className="animated fadeIn">
        {scheduleEvent && <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-event-start">Start:</label>
            <div className="col-sm-10">
              <DatePicker
                selected={this.state.start || moment(scheduleEvent.start) || {}}
                onChange={(selectedDate) => {
                  this.onInputChange({target: {
                    name: 'start',
                    type: 'datePicker',
                    value: selectedDate,
                    selectedDate,
                  }});
                }}
                showTimeSelect
                dateFormat={formats.dateFormat}
                timeFormat={formats.timeFormat}
                timeIntervals={formats.timeIntervals}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-event-end">End:</label>
            <div className="col-sm-10">
              <DatePicker
                selected={this.state.end || moment(scheduleEvent.end) || {}}
                onChange={(selectedDate) => {
                  this.onInputChange({target: {
                    name: 'end',
                    type: 'datePicker',
                    value: selectedDate,
                  }});
                }}
                showTimeSelect
                dateFormat={formats.dateFormat}
                timeFormat={formats.timeFormat}
                timeIntervals={formats.timeIntervals}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-event-form-onCall">On Call</label>
            <div className="col-sm-10">
              <select
                name="onCall"
                value={this.state.onCall || scheduleEvent.onCall || ''}
                onChange={this.onInputChange}
                className="custom-select"
                id="schedule-form-onCall"
              >
                {users && users.map((user) => {
                  return <option key={user.id} value={user.id}>{user.username}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-event-form-fallback">Fallback</label>
            <div className="col-sm-10">
              <select
                name="fallback"
                value={this.state.fallback || scheduleEvent.fallback || ''}
                onChange={this.onInputChange}
                className="custom-select"
                id="schedule-form-fallback"
              >
                {users && users.map((user) => {
                  return <option key={user.id} value={user.id}>{user.username}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-event-form-recurring">Recurring</label>
            <div className="col-sm-10">
              <select
                name="recurring"
                value={this.state.recurring || scheduleEvent.recurring || ''}
                onChange={this.onInputChange}
                className="custom-select"
                id="schedule-form-recurring"
              >
                <option value="">----</option>;
                <option value="monthly">Monthly</option>;
                <option value="weekly">Weekly</option>;
                <option value="daily">Daily</option>;
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-event-recurringPeriodEnd">Recurring ends:</label>
            <div className="col-sm-10">
              <DatePicker
                name="recurringPeriodEnd"
                isClearable
                selected={this.state.recurringPeriodEnd || moment(scheduleEvent.recurringPeriodEnd) || {}}
                onChange={(selectedDate) => {
                  this.onInputChange({target: {
                    name: 'recurringPeriodEnd',
                    type: 'datePicker',
                    value: selectedDate,
                  }});
                }}
                showTimeSelect
                dateFormat={formats.dateFormat}
                timeFormat={formats.timeFormat}
                timeIntervals={formats.timeIntervals}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-event-form-description">Description</label>
            <div className="col-sm-10">
              <input
                name="description"
                value={this.state.description || scheduleEvent.description || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="schedule-form-name"
                placeholder="Schedule event description"
              />
            </div>
          </div>

          <button className="btn btn-primary" onClick={this.saveScheduleEvent}>Save</button>
        </form>
        }
        {(!scheduleEvent || scheduleEvent.length < 1) &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}

