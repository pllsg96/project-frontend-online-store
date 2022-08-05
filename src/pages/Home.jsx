import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    valueInput: '',
    products: [],
    categoryId: '',
  };

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
    const { valueInput, products } = this.state;
    return (
      <div>
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
