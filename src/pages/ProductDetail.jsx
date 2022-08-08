import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProductDetail extends Component {
  state = {
    allDetails: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await response.json();
    this.setState({ allDetails: data });
  }

  render() {
    const { allDetails } = this.state;
    const { title, thumbnail, price } = allDetails;
    return (
      <div>
        <h2 data-testid="product-detail-name">{ title }</h2>
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />
        <h3 data-testid="product-detail-price">{price}</h3>

        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          Carrinho de compras
        </Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
