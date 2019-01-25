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
            <div className="contentHeader">
                <a className="btn btn-primary" href='/Product'>All Products</a>
                <a className="btn btn-primary" href='/Content'>Add New Product</a>
                <a className="btn btn-primary" href='/Category'>Categories/Tags</a>
                <button className="btn btn-primary" onClick={this.handleLogout}>Logout</button>
            </div>
        )
    }
}


export default ContentHeader;