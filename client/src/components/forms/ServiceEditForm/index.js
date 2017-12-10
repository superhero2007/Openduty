import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

export default class ServiceEditForm extends Component {
  static propTypes = {
    service: PropTypes.object,
    onServiceSave: PropTypes.func.isRequired,
  };
  static defaultProps = {
    service: {},
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
    this.saveService = this.saveService.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.id && newProps.service && newProps.service.id) {
      this.setState({id: newProps.service.id});
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
   *  @description Updates service with changed fields
   *  @param {function} evt
   *  @returns {null}
   */
  saveService(evt) {
    evt.preventDefault();
    this.props.onServiceSave(this.state);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { service } = this.props;
    return (
      <div className="animated fadeIn">
        {service && <form>
          {service.id &&
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="service-form-id">Service ID</label>
              <div className="col-sm-10">
                {service.id}
              </div>
            </div>
          }
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="service-form-name">Name</label>
            <div className="col-sm-10">
              <input
                name="name"
                value={this.state.name || service.name || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="service-form-name"
                placeholder="servicename"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="service-form-policy">Escalation policy </label>
            <div className="col-sm-10">
              <input
                name="policyName"
                value={this.state.policyName || service.policyName || ''}
                onChange={this.onInputChange}
                type="email"
                className="form-control"
                id="service-form-policy"
                placeholder="Policy Name"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="service-form-retry">Retry after</label>
            <div className="col-sm-10">
              <input
                name="retryAfter"
                value={this.state.retryAfter || service.retryAfter || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="service-form-retry"
                placeholder="Retry after"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="service-form-escalate">Escalate after</label>
            <div className="col-sm-10">
              <input
                name="escalateAfter"
                value={this.state.escalateAfter || service.escalateAfter || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="service-form-escalate"
                placeholder="Escalate after"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="service-form-disableNotification">Disable notifications</label>
            <label className="form-check-label col-sm-10">
              <input className="form-check-input position-static" name="notificationsDisabled" type="checkbox" value={this.state.notificationsDisabled || service.notificationsDisabled} onChange={this.onInputChange} />
            </label>
          </div>
          <button className="btn btn-primary" onClick={this.saveService}>Save</button>
        </form>
        }
        {(!service || service.length < 1) &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}

