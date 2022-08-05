import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Home extends Component {
  state = {
    categories: [],
  }

  async componentDidMount() {
    const data = await getCategories();
    this.setState({ categories: data });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <input type="text" />
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
      </div>
    );
  }
}

export default Home;
