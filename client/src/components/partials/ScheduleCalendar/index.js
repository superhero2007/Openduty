import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { withRouter } from 'react-router';
import icons from 'glyphicons';

import './index.scss';

@withRouter
export default class ScheduleCalendar extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    formats: PropTypes.object.isRequired,
    schedule: PropTypes.object,
    onEventDelete: PropTypes.func.isRequired,
  };
  static defaultProps = {
    schedule: {},
  };

  /**
   * @constructor
   * @param {array} props
   * @returns {null}
   * */
  constructor(props) {
    super(props);
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

    this.state = {};

    this.showAddEventForm = this.showAddEventForm.bind(this);
    this.showSingleEvent = this.showSingleEvent.bind(this);
    this.setDatesRange = this.setDatesRange.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);
    this.clearDatesRange = this.clearDatesRange.bind(this);
    this.showEditEventForm = this.showEditEventForm.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.id && newProps.schedule && newProps.schedule.id) {
      this.setState({id: newProps.schedule.id});
    }
    if (newProps.scheduleEvents && newProps.scheduleEvents.length > 1) {
      const scheduleEvents = newProps.scheduleEvents.map((item) => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
        return item;
      });
      this.setState({scheduleEvents});
    }
  }

  /**
   * param {object} datesRange
   * @returns {null}
   * */
  setDatesRange(datesRange) {
    this.setState({datesRange});
  }

  /**
   * @returns {null}
   * */
  showAddEventForm() {
    this.props.history.push(`/schedules/events/add/${this.props.schedule.id}
    ?start=${this.state.datesRange ? this.state.datesRange.start : null}
    &end=${this.state.datesRange ? this.state.datesRange.end : null}
    `);
  }

  /**
   * @returns {null}
   * */
  showEditEventForm() {
    this.props.history.push(`/schedules/events/edit/${this.state.event.id}`);
  }

  /**
   * param {object} event
   * @returns {null}
   * */
  showSingleEvent(event) {
    this.setState({event});
  }

  /**
   * param {object} event
   * @returns {null}
   * */
  closeEventModal() {
    this.setState({event: null});
  }

  /**
   * param {object} event
   * @returns {null}
   * */
  deleteEvent() {
    const eventId = this.state.event.id;
    this.setState({event: null}, () => {
      this.props.onEventDelete(eventId);
    });
  }

  /**
   * param {object} event
   * @returns {null}
   * */
  clearDatesRange() {
    this.setState({datesRange: null});
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { schedule, formats } = this.props;
    const scheduleEvents = this.state.scheduleEvents || [];

    return (
      <div className="animated fadeIn">
        {this.state.datesRange && <div>
          {`selected range: from
           ${moment(this.state.datesRange.start).format(formats.dateFormat)}
            to
            ${moment(this.state.datesRange.end).format(formats.dateFormat)}`
          }
          <button
            type="button"
            className="btn btn-light"
            aria-label="Clear range"
            onClick={this.clearDatesRange}
          >{icons.cross}</button>
        </div>}

        <button
          type="button"
          className="btn btn-light"
          aria-label="Add event"
          onClick={this.showAddEventForm}
        >{icons.plus} Add event </button>

        {schedule && <div className="calendar-view">
          <p className="row">Drag to select time range</p>
          <BigCalendar
            selectable
            defaultView="month"
            events={scheduleEvents}
            step={formats.step}
            defaultDate={new Date()}
            onSelectEvent={this.showSingleEvent}
            onSelectSlot={this.setDatesRange}
          />
        </div>
        }
        {this.state.event && <Modal onClosed={this.closeEventModal} isOpen toggle={this.showSingleEvent}>
          <ModalHeader>{this.state.event.title}</ModalHeader>
          <ModalBody>
            <p>From: {moment(this.state.event.start).format(formats.dateFormat)}</p>
            <p>To: {moment(this.state.event.end).format(formats.dateFormat)}</p>
            {this.state.event.description}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.showEditEventForm}>Edit</Button>{' '}
            <Button color="secondary" onClick={this.deleteEvent}>Remove</Button>{' '}
            <Button color="secondary" onClick={this.closeEventModal}>Close</Button>
          </ModalFooter>
        </Modal>
        }
        {(!schedule || schedule.length < 1) &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}

