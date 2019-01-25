import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class IsLoggedIn extends Component{
    render(){
        const USER = localStorage.getItem('user');
        return(
            <div>
                {
                    !USER?<Redirect to={{
                        pathname: "/"
                    }}/>:("")
                }
            </div>
        )
    }
}
export default IsLoggedIn;