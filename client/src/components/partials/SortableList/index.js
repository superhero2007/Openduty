import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import './index.scss';

export default class SortableList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    onSortFieldChange: PropTypes.func.isRequired,
    onRowSelectionChange: PropTypes.func.isRequired,
  };

  /**
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
    };
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handleAllRowsSelection = this.handleAllRowsSelection.bind(this);
  }

  selectAllCheckbox;

  handleSortChange(sortField) {
    this.props.onSortFieldChange(sortField);
  }

  handleRowSelection(evt) {
    const currentRowsSelection = this.state.selectedIds;
    const checkboxState = evt.target.checked;
    const rowId = evt.target.value;
    const rowIsSelected = currentRowsSelection.indexOf(evt.target.value) !== -1;
    const rowIndex = rowIsSelected ? currentRowsSelection.indexOf(evt.target.value) : null;

    if (checkboxState && !rowIsSelected) { // add row to selection
      currentRowsSelection.push(rowId);
    } else if (!checkboxState && rowIsSelected) { // remove from selection
      currentRowsSelection.splice(rowIndex, 1);
    }
    // Reset the "Select all" checkbox
    this.selectAllCheckbox.checked = false;
    this.setState({selectedIds: currentRowsSelection}, () => {
      this.props.onRowSelectionChange(this.state.selectedIds);
    });
  }

  handleAllRowsSelection(evt) {
    const allCheckboxes = document.getElementsByClassName('sortable-list-checkbox');
    let newRowsSelection = [];

    if (evt.target.checked) {
      newRowsSelection = this.props.data.map((item) => { return item.id; });
    }

    // Set the same status for the rest checkboxes
    [...allCheckboxes].forEach((checkbox) => {
      checkbox.checked = evt.target.checked;
    });

    this.setState({selectedIds: newRowsSelection}, () => {
      this.props.onRowSelectionChange(this.state.selectedIds);
    });
  }

  render() {
    const {data, fields} = this.props;
    return (<div className="sortable-list">
      <div className="row sortable-list-header">
        <label className="form-check-label col">
          <input ref={(elem) => { this.selectAllCheckbox = elem; }} className="form-check-input position-static" type="checkbox" id="blankCheckbox" value="" onChange={this.handleAllRowsSelection} />
        </label>
        {fields.map((item) => {
          return (<span
            key={`sortField-${item.field}`}
            role="navigation"
            className="col sort-field-selector"
            onClick={() => { this.handleSortChange(item.field); }}
          >{item.displayName}</span>);
        })}
      </div>
      {data && data.map((record) => {
        return (<div key={record.id} className="row">
          <label className="form-check-label col">
            <input className="form-check-input position-static sortable-list-checkbox" type="checkbox" value={record.id} onChange={this.handleRowSelection} />
          </label>
          {fields.map((fieldEntry) => {
            return (<span key={`value${record.id}${fieldEntry.field}`} className="col">
              {record[fieldEntry.field]}
            </span>);
          })}
        </div>);
      })}

    </div>);
  }
}
