import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import './index.scss';

export default class IncidentsFilters extends Component {
  static propTypes = {
    servicesList: PropTypes.array,
    possibleValues: PropTypes.array,
    onFiltersChange: PropTypes.func.isRequired,
  };
  static defaultProps = {
    servicesList: [],
    possibleValues: [],
  };
  /**
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = {
      selectedService: '',
      selectedEventType: '',
    };
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
    this.handleEventTypeSelect = this.handleEventTypeSelect.bind(this);
    this.handleFiltersReset = this.handleFiltersReset.bind(this);
  }

  /**
   * @param {object} evt
   * @returns {null}
   * */
  handleServiceSelect(evt) {
    this.setState({selectedService: evt.target.value}, () => {
      this.props.onFiltersChange(this.state);
    });
  }

  /**
   * @param {object} evt
   * @returns {null}
   * */
  handleEventTypeSelect(evt) {
    this.setState({selectedEventType: evt.target.value}, () => {
      this.props.onFiltersChange(this.state);
    });
  }

  /**
   * @returns {null}
   * */
  handleFiltersReset() {
    this.setState({
      selectedService: '',
      selectedEventType: '',
    }, () => {
      this.props.onFiltersChange(this.state);
    });
  }

  /**
   * @returns {xml}
   * */
  render() {
    const {servicesList, possibleValues } = this.props;

    return (
      <div className="animated fadeIn incidents-filters">
        <span className="filters-label">Filter by:</span>
        {servicesList && servicesList.length > 0 && <select className="custom-select" value={this.state.selectedService} onChange={this.handleServiceSelect}>
          <option value="">All</option>
          {servicesList.map((service) => {
            return <option key={service.id} value={service.id}>{service.name}</option>;
          })}
        </select>}
        {servicesList && servicesList.length === 0 && <select className="custom-select" value="" disabled>
          <option value="">No configured services</option>
        </select>}
        {possibleValues && <select className="custom-select" value={this.state.selectedEventType} onChange={this.handleEventTypeSelect}>
          <option value="">All</option>
          {possibleValues.map((eventType) => {
            return <option key={`option-${eventType}`} value={eventType}>{eventType}</option>;
          })}
        </select>}
        <button className="btn btn-primary" onClick={this.handleFiltersReset}>Reset</button>
      </div>
    );
  }
}
