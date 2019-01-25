import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

class Login extends Component {
    render(){
        return(
            <div>
                <LoginForm/>
                <SignUpForm/>
            </div>
        )
    }
}

export default Login;