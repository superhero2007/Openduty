import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { withRouter } from 'react-router';
import icons from 'glyphicons';
import './index.scss';

@withRouter
export default class SchedulesList extends Component {
  static propTypes = {
    schedulesList: PropTypes.array,
    history: PropTypes.object.isRequired,
    onScheduleDelete: PropTypes.func.isRequired,
  };
  static defaultProps = {
    schedulesList: [],
  };

  /**
   * @constructor
   * @param {array} props
   * @returns {null}
   * */
  constructor(props) {
    super(props);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.onScheduleDelete = this.onScheduleDelete.bind(this);
  }

  /**
   * @param {string} scheduleId
   * @returns {null}
   * */
  onScheduleDelete(scheduleId) {
    this.props.onScheduleDelete(scheduleId);
  }

  /**
   * @param {string} scheduleId
   * @returns {null}
   * */
  handleEditButtonClick(scheduleId) {
    this.props.history.push(`/schedules/edit/${scheduleId}`);
  }

  /**
   * @param {string} scheduleId
   * @returns {null}
   * */
  handleWatchButtonClick(scheduleId) {
    this.props.history.push(`/schedules/watch/${scheduleId}`);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { schedulesList } = this.props;
    return (
      <div className="animated fadeIn users-list">
        {schedulesList && schedulesList.length > 0 &&
        <div className="container">
          <div className="row">
            <div className="col users-list-header">Schedule name</div>
            <div className="col" />
          </div>
          {schedulesList.map((item) => {
            return (<div className="row" key={item.id}>
              <div className="col">{item.name}</div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Watch calendar"
                  onClick={() => {
                    this.handleWatchButtonClick(item.id);
                  }}
                >{icons.calendarTearOff}</button>
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Edit schedule"
                  onClick={() => {
                    this.handleEditButtonClick(item.id);
                  }}
                >{icons.edit}</button>
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Delete schedule"
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.onScheduleDelete(item.id);
                  }}
                >{icons.crossHeavy}</button>
              </div>
            </div>);
          })}
        </div>
        }
        {schedulesList && schedulesList.length === 0 &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}
