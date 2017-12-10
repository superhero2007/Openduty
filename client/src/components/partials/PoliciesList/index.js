import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { withRouter } from 'react-router';
import icons from 'glyphicons';
import './index.scss';

@withRouter
export default class PoliciesList extends Component {
  static propTypes = {
    policiesList: PropTypes.array,
    history: PropTypes.object.isRequired,
    onPolicyDelete: PropTypes.func.isRequired,
  };
  static defaultProps = {
    policiesList: [],
  };

  /**
   * @constructor
   * @param {object} props
   * */
  constructor(props) {
    super(props);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.onPolicyDelete = this.onPolicyDelete.bind(this);
  }

  onPolicyDelete(policyId) {
    this.props.onPolicyDelete(policyId);
  }

  handleEditButtonClick(policyId) {
    this.props.history.push(`/policies/edit/${policyId}`);
  }

  render() {
    const { policiesList } = this.props;
    return (
      <div className="animated fadeIn users-list">
        {policiesList && policiesList.length > 0 &&
        <div className="container">
          <div className="row">
            <div className="col users-list-header">Policy name</div>
            <div className="col users-list-header">Repeat</div>
            <div className="col" />
          </div>
          {policiesList.map((item) => {
            return (<div className="row" key={item.id}>
              <div className="col">{item.name}</div>
              <div className="col">{item.repeatTimes}</div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Edit user"
                  onClick={() => {
                    this.handleEditButtonClick(item.id);
                  }}
                >{icons.edit}</button>
                <button
                  type="button"
                  className="btn btn-light"
                  aria-label="Delete policy"
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.onPolicyDelete(item.id);
                  }}
                >{icons.crossHeavy}</button>
              </div>
            </div>);
          })}
        </div>
        }
        {policiesList && policiesList.length === 0 &&
        <div>Loading...</div>
        }
      </div>
    );
  }
}
