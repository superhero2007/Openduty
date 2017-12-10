import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { withRouter } from 'react-router';
import icons from 'glyphicons';
import './index.scss';

@withRouter
export default class UsersList extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    users: PropTypes.array,
    onUserDelete: PropTypes.func.isRequired,
  };
  static defaultProps = {
    users: [],
  };

  /**
   * @constructor
   * @param {array} props
   * @returns {null}
   * */
  constructor(props) {
    super(props);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleUserDeletionClick = this.handleUserDeletionClick.bind(this);
  }

  /**
   * @param {string} userId
   * @returns {null}
   * */
  handleEditButtonClick(userId) {
    this.props.history.push(`/users/edit/${userId}`);
  }

  /**
   * @param {string} userId
   * @returns {null}
   * */
  handleUserDeletionClick(userId) {
    this.props.onUserDelete(userId);
  }

  /**
   * @returns {xml}
   * */
  render() {
    const { users } = this.props;
    return (
      <div className="animated fadeIn users-list">
        {users && users.length > 0 &&
        <div className="container">
          <div className="row">
            <div className="col users-list-header">User name</div>
            <div className="col users-list-header">Email</div>
            <div className="col users-list-header">Phone</div>
            <div className="col" />
          </div>
          {users.map((item) => {
            return (<div className="row" key={item.id}>
              <div className="col">{item.username}</div>
              <div className="col">{item.email}</div>
              <div className="col">{item.phone}</div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Edit user"
                  onClick={() => {
                    this.handleEditButtonClick(item.id);
                  }}
                >{icons.edit}</button>
                <button type="button" className="btn btn-light" aria-label="Test notification">{icons.speakerSoundLoud}</button>
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Delete user"
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.handleUserDeletionClick(item.id);
                  }}
                >{icons.crossHeavy}</button>
              </div>
            </div>);
          })}
        </div>
        }
        {users && users.length === 0 &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}
