import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import './index.scss';

export default class DashboardFilters extends Component {
  static propTypes = {
    servicesList: PropTypes.array,
    onFiltersChange: PropTypes.func.isRequired,
  };
  static defaultProps = {
    servicesList: [],
  };
  /**
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = {
      selectedService: '',
    };
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
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
   * @returns {xml}
   * */
  render() {
    const { servicesList } = this.props;

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
      </div>
    );
  }
}
