import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

export default class ScheduleEditForm extends Component {
  static propTypes = {
    schedule: PropTypes.object,
    onScheduleSave: PropTypes.func.isRequired,
    initialAction: PropTypes.func,
  };
  static defaultProps = {
    schedule: {},
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
    this.saveSchedule = this.saveSchedule.bind(this);
  }

  componentWillMount() {
    if (this.props.initialAction) {
      this.props.initialAction();
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.id && newProps.schedule && newProps.schedule.id) {
      this.setState({id: newProps.schedule.id});
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
  saveSchedule(evt) {
    evt.preventDefault();
    this.props.onScheduleSave(this.state);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { schedule } = this.props;
    return (
      <div className="animated fadeIn">
        {schedule && <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-form-name">Name</label>
            <div className="col-sm-10">
              <input
                name="name"
                value={this.state.name || schedule.name || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="schedule-form-name"
                placeholder="Schedule name"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="schedule-form-slug">Slug</label>
            <div className="col-sm-10">
              <input
                name="slug"
                value={this.state.slug || schedule.slug || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="schedule-form-slug"
                placeholder="Slug"
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.saveSchedule}>Save</button>
        </form>
        }
        {(!schedule || schedule.length < 1) &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}

