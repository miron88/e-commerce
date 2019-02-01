import React, { Component } from 'react';

class ContentHeader extends Component{
    constructor(){
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    handleLogout(){
        localStorage.clear();
        window.location.replace('/');
    }
    render(){
        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a className="navbar-brand" href="/">Best Buy</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/Product">All Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Content">Add New Product</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Category">Categories/Tags</a>
                </li>    
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.handleLogout}>Logout</a>
                </li>    
              </ul>
            </div>  
          </nav>
        )
    }
}


export default ContentHeader;