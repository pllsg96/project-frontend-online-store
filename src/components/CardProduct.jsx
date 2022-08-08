import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { thumbnail, title, price } = this.props;
    return (
      <div>
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product"
        />
        <p>
          { title }
        </p>
        <h4>
          { price }
        </h4>
      </div>
    );
  }
}

CardProduct.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CardProduct;
