import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import CardProduct from '../components/CardProduct';

class Home extends Component {
  state = {
    valueInput: '',
    products: [],
    categoryId: '',
    categories: [],
    categorySelect: [],
  };

  async componentDidMount() {
    const data = await getCategories();
    this.setState({ categories: data });
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ valueInput: value });
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { categoryId, valueInput } = this.state;
    const data = await getProductsFromCategoryAndQuery(categoryId, valueInput);
    this.setState({ products: data.results });
  }

  getCategory = async (categoryId) => {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
    const data = await response.json();
    this.setState({ categorySelect: data.results });
  }

  detail = (event, id) => {
    event.preventDefault();
    const { history: { push } } = this.props;
    push(`/product/${id}`);
    // console.log(id);
    // console.log(event.target);
  }

  render() {
    const {
      categories,
      valueInput,
      products,
      categorySelect,
    } = this.state;
    return (
      <div>
        <Link
          data-testid="shopping-cart-button"
          to="/shoppingcart"
        >
          ShoppingCart
        </Link>
        <form>
          <input
            type="text"
            data-testid="query-input"
            value={ valueInput }
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <nav>
          <ul>
            {categories.map((category) => {
              const { id, name } = category;
              return (
                <li key={ id }>
                  <label htmlFor={ id } data-testid="category">
                    { name }
                    <input
                      type="radio"
                      name="categories"
                      id={ id }
                      onClick={ () => this.getCategory(id) }
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </nav>
        <section>
          <ul>
            { products.length > 0 ? products.map((product) => {
              const { id, title, price, thumbnail } = product;
              return (
                <li key={ id }>
                  <CardProduct
                    id={ id }
                    title={ title }
                    price={ price }
                    thumbnail={ thumbnail }
                  />
                </li>
              );
            }) : <p>Nenhum produto foi encontrado</p>}
          </ul>
        </section>
        <section>
          { categorySelect.length > 0 && categorySelect.map((categoryProduct) => {
            const { id, title, price, thumbnail } = categoryProduct;
            return (
              <li key={ id }>
                <button
                  type="button"
                  onClick={ (event) => this.detail(event, id) }
                  data-testid="product-detail-link"
                >
                  <CardProduct
                    id={ id }
                    title={ title }
                    price={ price }
                    thumbnail={ thumbnail }
                  />

                </button>
              </li>
            );
          })}
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
