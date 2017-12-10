import React, { Component } from 'react';
import PropTypes from 'prop-types';
import icons from 'glyphicons';

import './index.scss';

const PLACEHOLDER_OPTION_TEXT = 'placeHolderOption';

export default class CardsList extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
  }

  handleRemoveButtonClick(evt, card) {
    evt.preventDefault();
    this.props.onCardRemove(card);
  }

  handleCardSelect(evt) {
    this.props.onCardSelect(evt.target.value);
  }

  render() {
    const {selectedCards, possibleValues} = this.props;

    return (
      <div className="animated fadeIn cards-list">
        {possibleValues && selectedCards.length > 0 && selectedCards.map((card) => {
          // Find the selected card in possible values array to get name by it's id
          const selectedCard = possibleValues.reduce((result, currentItem) => {
            if (currentItem.value === card) {
              result = currentItem;
            }
            return result;
          }, {});
          return (<span className="selected-card" key={`selected-${selectedCard.value}`}>
            {selectedCard.name}
            <button className="btn btn-light" onClick={(evt) => { this.handleRemoveButtonClick(evt, selectedCard.value); }}>{icons.crossHeavy}</button>
          </span>);
        })}
        {possibleValues && possibleValues.length > 0 && possibleValues.length > selectedCards.length && <select name={this.props.name} className="custom-select" value={PLACEHOLDER_OPTION_TEXT} onChange={this.handleCardSelect}>
          <option value={PLACEHOLDER_OPTION_TEXT}>Add</option>
          {possibleValues.map((card) => {
            return selectedCards.indexOf(card.value) === -1 ? <option key={`option-${card.value}`} value={card.value}>{card.name}</option> : null;
          })}
        </select>}
      </div>
    );
  }
}

CardsList.propTypes = {
  name: PropTypes.string,
  possibleValues: PropTypes.array.isRequired,
  selectedCards: PropTypes.array.isRequired,
  onCardSelect: PropTypes.func.isRequired,
  onCardRemove: PropTypes.func.isRequired,
};
CardsList.defaultProps = {
  name: '',
};
