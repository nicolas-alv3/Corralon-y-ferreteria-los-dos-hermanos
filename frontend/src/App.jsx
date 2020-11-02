/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import PricesAdmin from './components/PricesAdmin';
import Search from './components/Search';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route exact path="/products" render={(props) => <Products {...props} />} />
        <Route exact path="/prices" render={(props) => <PricesAdmin {...props} />} />
        <Route exact path="/search" render={(props) => <Search {...props} />} />
        <Route path="/" render={(props) => <Home {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
