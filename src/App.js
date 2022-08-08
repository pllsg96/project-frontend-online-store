import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/" component={ Home } />
        <Route exact path="/product/:id" component={ ProductDetail } />
      </BrowserRouter>
    );
  }
}
export default App;
