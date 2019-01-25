import React, { Component } from 'react';
//import img from '../images/ScreenAustralia_logo.jpg';

// Redirect to Login in if the user not logged in.
import IsLoggedIn from '../../common/IsLoggedIn';

// Partial
import AddProduct from './Partial/AddProduct';
import ContentHeader from './Partial/ContentHeader';

// CSS
import './Content.css';

class Content extends Component {
    render(){
        return(
            <div className="container">
                <IsLoggedIn/>
                <ContentHeader/>
                <AddProduct/>                
            </div>
        )
    }
}

export default Content;
