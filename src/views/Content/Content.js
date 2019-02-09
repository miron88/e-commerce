import React, { Component } from 'react';
//import img from '../images/ScreenAustralia_logo.jpg';

// Partial
import AddProduct from './Partial/AddProduct';

// CSS
import './Content.css';

class Content extends Component {
    render(){
        return(
            <div>
                <AddProduct/>                
            </div>
        )
    }
}

export default Content;
