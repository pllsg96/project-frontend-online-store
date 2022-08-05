import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    valueInput: '',
    products: [],
    categoryId: '',
    categories: []
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
  
  render() {
    const { categories, valueInput, products } = this.state;
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
                    <input type="radio" name="categories" id={ id } />
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
                  <img src={ thumbnail } alt={ title } data-testid="product" />
                  <p>
                    { title }
                  </p>
                  <h4>
                    { price }
                  </h4>
                </li>
              );
            }) : <p>Nenhum produto foi encontrado</p>}
          </ul>
        </section>
      </div>
    );
  }
}

export default Home;
