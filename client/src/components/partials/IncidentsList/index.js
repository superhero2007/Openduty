import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import SortableList from 'partials/SortableList';
import './index.scss';

const sortFields = [
  {field: 'occurredAt', displayName: 'Occurred at'},
  {field: 'id', displayName: 'ID'},
  {field: 'serviceName', displayName: 'Service name'},
  {field: 'incidentKey', displayName: 'Incident key'},
  {field: 'eventType', displayName: 'Event type'},
  {field: 'description', displayName: 'Description'},
  {field: 'details', displayName: 'Details'},
];


export default class IncidentsList extends Component {
  static propTypes = {
    incidentsList: PropTypes.array,
    onSortChange: PropTypes.func.isRequired,
    onAcknowledged: PropTypes.func.isRequired,
    onResolved: PropTypes.func.isRequired,
  };
  static defaultProps = {
    incidentsList: [],
  };
  /**
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
    this.onSortChange = this.onSortChange.bind(this);
    this.onRowSelectionChange = this.onRowSelectionChange.bind(this);
    this.onIncidentsAcknowledge = this.onIncidentsAcknowledge.bind(this);
    this.onIncidentsResolve = this.onIncidentsResolve.bind(this);
  }

  /**
   * @param {string} sortField
   * @returns {null}
   * */
  onSortChange(sortField) {
    this.props.onSortChange(sortField);
  }


  /**
   * @param {array} selectedRows
   * @returns {null}
   * */
  onRowSelectionChange(selectedRows) {
    this.setState({selectedRows});
  }

  /**
   * @returns {null}
   * */
  onIncidentsAcknowledge() {
    if (this.state.selectedRows.length > 0) {
      this.props.onAcknowledged(this.state.selectedRows);
    }
  }

  /**
   * @returns {null}
   * */
  onIncidentsResolve() {
    if (this.state.selectedRows.length > 0) {
      this.props.onResolved(this.state.selectedRows);
    }
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { incidentsList } = this.props;

    return (
      <div>
        <button
          className="btn btn-warning"
          disabled={!this.state.selectedRows.length > 0}
          onClick={this.onIncidentsAcknowledge}
        >Acknowledge</button>
        <button
          className="btn btn-success"
          disabled={!this.state.selectedRows.length > 0}
          onClick={this.onIncidentsResolve}
        >Resolve</button>
        {incidentsList && incidentsList.length > 0 &&
          <SortableList fields={sortFields} data={incidentsList} onRowSelectionChange={this.onRowSelectionChange} onSortFieldChange={this.onSortChange} />
        }
        {incidentsList && incidentsList.length === 0 &&
        <div>Nothing to display</div>
        }
      </div>
    );
  }
}
