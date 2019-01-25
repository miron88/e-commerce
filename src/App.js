import React, { Component } from 'react';
import './App.css';

import Login from '../src/views/Login';
import Product from './views/Products/Product';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './views/Content/Content';
import Category from './views/Category/Category';

import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';

class App extends Component {
  render() {
    
    return (
      <div className="col-sm-12">
        <Header/>
        <Router basename='/'>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route path="/content" component={Content}/>
            <Route path="/Product" component={Product}/>
            <Route path="/Category" component={Category}/>
          </Switch>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
