import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import CardsList from 'partials/CardsList';

export default class PolicyEditForm extends Component {
  static propTypes = {
    policy: PropTypes.object,
    schedules: PropTypes.array,
    users: PropTypes.array,
    onPolicySave: PropTypes.func.isRequired,
  };
  static defaultProps = {
    policy: {},
    schedules: [],
    users: [],
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
    this.savePolicy = this.savePolicy.bind(this);
    this.handleCalCardsChange = this.handleCalCardsChange.bind(this);
    this.handleUsersCardsChange = this.handleUsersCardsChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!this.state.id && newProps.policy && newProps.policy.id) {
      this.setState({id: newProps.policy.id});
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
   *  @description Restores initial calendars selection
   *  @param {string} fieldName
   *  @param {function} callback
   *  @returns {null}
   */
  setInitialCardsState(fieldName, callback) {
    this.setState({[fieldName]: this.props.policy[fieldName] || []}, () => {
      callback(this.state[fieldName]);
    });
  }

  /**
   *  @description Adds or removes attached schedule
   *  @param {string} cardText
   *  @returns {null}
   */
  handleCalCardsChange(cardText) {
    const currentCalendarIds = this.state.calendarIds;
    if (currentCalendarIds !== undefined) {
      this.processCardChange(currentCalendarIds, cardText, 'calendarIds');
    } else {
      this.setInitialCardsState('calendarIds', (calendarIds) => {
        this.processCardChange(calendarIds, cardText, 'calendarIds');
      });
    }
  }

  /**
   *  @description Adds or removes attached users
   *  @param {string} cardText
   *  @returns {null}
   */
  handleUsersCardsChange(cardText) {
    const currentuserIds = this.state.userIds;
    if (currentuserIds !== undefined) {
      this.processCardChange(currentuserIds, cardText, 'userIds');
    } else {
      this.setInitialCardsState('userIds', (userIds) => {
        this.processCardChange(userIds, cardText, 'userIds');
      });
    }
  }

  processCardChange(items, cardText, fieldName) {
    const cardIndex = items.indexOf(cardText);
    if (cardIndex === -1) {
      items.push(cardText);
    }
    if (cardIndex !== -1) {
      items.splice(cardIndex, 1);
    }
    this.setState({[fieldName]: items});
  }

  /**
   *  @description Updates policy with changed fields
   *  @param {function} evt
   *  @returns {null}
   */
  savePolicy(evt) {
    evt.preventDefault();
    this.props.onPolicySave(this.state);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { policy, schedules, users } = this.props;
    const possibleSchedulesValues = schedules ? schedules.map((schedule) => {
      return {value: schedule.id, name: schedule.name};
    }) : [];
    const possibleUsersValues = this.props.users ? this.props.users.map((user) => {
      return {value: user.id, name: user.username};
    }) : [];

    return (
      <div className="animated fadeIn">
        {policy && <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="policy-form-name">Name</label>
            <div className="col-sm-10">
              <input
                name="name"
                value={this.state.name || policy.name || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="policy-form-name"
                placeholder="policyname"
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="policy-form-retry">Repeat</label>
            <div className="col-sm-10">
              <input
                name="repeatTimes"
                value={this.state.repeatTimes || policy.repeatTimes || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="policy-form-retry"
                placeholder="Retry after"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="policy-form-calendars">Add calendar</label>
            <div className="col-sm-10">
              {schedules && <CardsList
                name="calendarIds"
                selectedCards={this.state.calendarIds || policy.calendarIds || []}
                possibleValues={possibleSchedulesValues}
                onCardSelect={this.handleCalCardsChange}
                onCardRemove={this.handleCalCardsChange}
              />}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="policy-form-user">Add user</label>
            <div className="col-sm-10">
              {users && <CardsList
                name="userIds"
                selectedCards={this.state.userIds || policy.userIds || []}
                possibleValues={possibleUsersValues}
                onCardSelect={this.handleUsersCardsChange}
                onCardRemove={this.handleUsersCardsChange}
              />}
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.savePolicy}>Save</button>
        </form>
        }
        {(!policy || policy.length < 1) &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}

