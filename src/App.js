import React, { Component } from 'react';
import './App.css';

import Login from '../src/views/Login';
import Product from './views/Products/Product';

import {BrowserRouter as Router, Switch, Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Content from './views/Content/Content';
import Category from './views/Category/Category';

import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import ContentHeader from './views/Content/Partial/ContentHeader';

class App extends Component {
  handleLogout = () => {
      localStorage.clear();
      window.location.replace('/');
  }
  render() {
    const USER = localStorage.getItem('user');
    return (
      <div>
        <Header/>
        <Router>
        <div>
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a className="navbar-brand" href="/">Best Buy</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                
                <li className="nav-item">
                  <NavLink to="/content" exact activeStyle={
                    { color:'#fff',
                    backgroundColor: '#656769'}
                  }>Add New Product</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/product" exact activeStyle={
                    { color:'#fff',
                    backgroundColor: '#656769'}
                  }>All Products</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/category" exact activeStyle={
                    { color:'#fff',
                    backgroundColor: '#656769'}
                  }>Categories/Tags</NavLink>
                </li>
                {!USER?
                <li className="nav-item">
                  <NavLink to="/" exact activeStyle={
                    { color:'#fff',
                    backgroundColor: '#656769'}
                  }>Login</NavLink>
                </li>:
                <li className="nav-item">
                <a href='' onClick={this.handleLogout}>Logout</a>
              </li>
                }
                </ul>
              </div>
            </nav>
            <div className='container'>
          <Route path="/" exact strict render={() => <Login/>}/>
          <Route path="/content" exact strict render={({match}) => (USER ? <Content/>:(<Redirect to='/' />))}/>
          <Route path="/product" exact strict render={({match}) => (USER ? <Product/>:(<Redirect to='/' />))}/>
          <Route path="/category" exact strict render={({match}) => (USER ? <Category/>:(<Redirect to='/' />))}/></div>
          {/*<Route path="/category" exact strict render={
            () => {
              return <Category/>;
            }
          }/>*/}
          {/*<Route path="/user/:username" exact strict render={({match})=>(
            this.state.loggedIn ? ( <User username={match.params.username}/>) : (<Redirect to='/' />)
          )}/>*/}
          </div>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;
