import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/" component={ Home } />
      </BrowserRouter>
    );
  }
}
export default App;
