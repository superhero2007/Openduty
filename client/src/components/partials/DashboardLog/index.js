import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { withRouter } from 'react-router';
import './index.scss';

@withRouter
export default class DashboardLog extends Component {
  static propTypes = {
    dashboardLog: PropTypes.array,
  };
  static defaultProps = {
    dashboardLog: [],
    message: null,
  };
  static renderItem(item) {
    return (<div className="row" key={item.id}>
      <div className="col">{item.time}</div>
      <div className="col">{item.serviceName}</div>
      <div className="col">{item.eventData}</div>
    </div>);
  }

  render() {
    const { dashboardLog } = this.props;
    return (
      <div className="animated fadeIn users-list">
        {dashboardLog &&
        <div className="container">
          <div className="row">
            <div className="col users-list-header">Time</div>
            <div className="col users-list-header">Service name</div>
            <div className="col users-list-header">Event data</div>
          </div>
          {dashboardLog.length > 0 && dashboardLog.map((item) => {
            return DashboardLog.renderItem(item);
          })}
          {dashboardLog.id && DashboardLog.renderItem(dashboardLog)}
        </div>
        }
        {dashboardLog && dashboardLog.length === 0 &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}
