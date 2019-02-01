import React, { Component } from 'react';
import './App.css';

import Login from '../src/views/Login';
import Product from './views/Products/Product';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './views/Content/Content';
import Category from './views/Category/Category';

import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import ContentHeader from './views/Content/Partial/ContentHeader';

class App extends Component {
  render() {
    const USER = localStorage.getItem('user');
    return (
      <div>
        <Header/>
        {USER?<ContentHeader/>:("")}
        <div className='container'>
          <div className='col-sm-12'>
            <Router basename='/'>
              <Switch>
                <Route exact path='/' component={Login}/>
                <Route path="/content" component={Content}/>
                <Route path="/Product" component={Product}/>
                <Route path="/Category" component={Category}/>
              </Switch>
            </Router>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
