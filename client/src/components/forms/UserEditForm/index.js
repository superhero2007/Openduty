import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import CardsList from 'partials/CardsList';

export default class UserEditForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    notificationTypes: PropTypes.array.isRequired,
    onUserSave: PropTypes.func.isRequired,
  };
  static defaultProps = {
    user: {},
  };

  /**
   * @constructor
   * @param {array} props
   * @returns {null}
   * */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleCardsChange = this.handleCardsChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentWillReceiveProps(newProps) {
    /* Sets the user id for API request */
    if (!this.state.id && newProps.user && newProps.user.id) {
      this.setState({id: newProps.user.id});
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
   *  @description Restores initial notification methods selection
   *  @param {function} callback
   *  @returns {null}
   */
  setInitialCardsState(callback) {
    this.setState({notificationMethods: this.props.user.notificationMethods || []}, () => {
      callback(this.state.notificationMethods);
    });
  }

  /**
   *  @description Adds or removes notification method
   *  @param {string} cardText
   *  @returns {null}
   */
  handleCardsChange(cardText) {
    const currentNotificationsMethods = this.state.notificationMethods;
    if (currentNotificationsMethods !== undefined) {
      this.processCardChange(currentNotificationsMethods, cardText);
    } else {
      this.setInitialCardsState((notificationMethods) => {
        this.processCardChange(notificationMethods, cardText);
      });
    }
  }

  processCardChange(notificationMethods, cardText) {
    const cardIndex = notificationMethods.indexOf(cardText);
    if (cardIndex === -1) {
      notificationMethods.push(cardText);
    }
    if (cardIndex !== -1) {
      notificationMethods.splice(cardIndex, 1);
    }
    this.setState({notificationMethods});
  }

  /**
   *  @description Updates user with changed fields
   *  @param {function} evt
   *  @returns {null}
   */
  saveUser(evt) {
    evt.preventDefault();
    this.props.onUserSave(this.state);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { user, notificationTypes } = this.props;
    const possibleValues = notificationTypes ? notificationTypes.map((notificationType) => {
      return {value: notificationType, name: notificationType};
    }) : [];

    return (
      <div className="animated fadeIn">
        {user && <form>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-username">Name</label>
            <div className="col-sm-10">
              <input
                name="username"
                value={this.state.username || user.username || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-username"
                placeholder="username"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-email">Email address</label>
            <div className="col-sm-10">
              <input
                name="email"
                value={this.state.email || user.email || ''}
                onChange={this.onInputChange}
                type="email"
                className="form-control"
                id="user-form-email"
                placeholder="email"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-password">Password</label>
            <div className="col-sm-10">
              <input
                name="password"
                value={this.state.password || ''}
                onChange={this.onInputChange}
                type="password"
                className="form-control"
                id="user-form-password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-pushoverUserKey">Pushover user key</label>
            <div className="col-sm-10">
              <input
                name="pushoverUserKey"
                value={this.state.pushoverUserKey || user.pushoverUserKey || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-pushoverUserKey"
                placeholder="Pushover user key"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-pushoverAppKey">Pushover application key</label>
            <div className="col-sm-10">
              <input
                name="pushoverAppKey"
                value={this.state.pushoverAppKey || user.pushoverAppKey || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-pushoverAppKey"
                placeholder="Pushover application key"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-slackRoomName">Slack room name</label>
            <div className="col-sm-10">
              <input
                name="slackRoomName"
                value={this.state.slackRoomName || user.slackRoomName || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-slackRoomName"
                placeholder="Slack room name"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-prowlApiKey">Prowl api key</label>
            <div className="col-sm-10">
              <input
                name="prowlApiKey"
                value={this.state.prowlApiKey || user.prowlApiKey || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-prowlApiKey"
                placeholder="Prowl api key"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-prowlAppName">Prowl application name</label>
            <div className="col-sm-10">
              <input
                name="prowlAppName"
                value={this.state.prowlAppName || user.prowlAppName || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-prowlAppName"
                placeholder="Prowl application name"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-prowlUrl">Prowl url (optional)</label>
            <div className="col-sm-10">
              <input
                name="prowlUrl"
                value={this.state.prowlUrl || user.prowlUrl || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-prowlUrl"
                placeholder="Prowl url (optional)"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-rocketWebhookUrl">Rocket Webhook Url(optional)</label>
            <div className="col-sm-10">
              <input
                name="rocketWebhookUrl"
                value={this.state.rocketWebhookUrl || user.rocketWebhookUrl || ''}
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                id="user-form-rocketWebhookUrl"
                placeholder="Rocket Webhook Url(optional)"
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="user-form-notificationsMethod">Notification methods</label>
            <div className="col-sm-10">
              <CardsList
                name="notificationsMethod"
                selectedCards={this.state.notificationMethods || user.notificationMethods || []}
                possibleValues={possibleValues}
                onCardSelect={this.handleCardsChange}
                onCardRemove={this.handleCardsChange}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.saveUser}>Save</button>
        </form>
        }
        {(!user || user.length < 1) &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}

