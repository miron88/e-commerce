import React, { Component } from 'react';
import superagent from 'superagent';
import { Redirect } from 'react-router-dom';


class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        
        this.submitForm = this.submitForm.bind(this);
    }
    handleEmailChanged(event){
        this.setState({email: event.target.value});
    }
    handlePasswordChanged(event){
        this.setState({password: event.target.value});
    }
    submitForm(event){
        event.preventDefault();
        let apiPath = "http://miron.gearhostpreview.com/api/values/isRegisteredUser?email="+this.state.email+"&password="+this.state.password;
        superagent
            .get(apiPath)
            //.send({email: this.state.email, password: this.state.password})
            .end((err, res) => {
                if(err) {
                    this.setState({errorMessage: "Authentication Failed"});
                    console.log("Authentication Failed");
                    return;
                }
                if(res.body){
                    localStorage.setItem('user', res.body);
                    console.log("Success: "+res.body);
                    window.location.replace('/content');
                    
                }
                window.res=res;
            })
    }
    isAuthenticated(){
        const USER = localStorage.getItem('user');
        return USER && USER.length> 0;
    }
    render(){
        const isAlreadyAuthenticated = this.isAuthenticated();
        return(
            <div>
                {isAlreadyAuthenticated? <Redirect to={{
                    pathname: "/content"
                }}/>:""}
                <fieldset>
                    <legend><h4>Already a member?</h4></legend>
                    <form onSubmit={this.submitForm} className='form-inline'>
                        <div className="form-group col-sm-3">
                            <label>User name: </label>
                            <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChanged} placeholder="Enter email"/>
                        </div>
                        <div className="form-group col-sm-3">
                            <label>Password:</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChanged} placeholder="Enter password"/>
                        </div>
                        <div className='col-sm-2'>
                            <label>&nbsp;</label>
                            <button className="btn btn-secondary">Login</button>
                        </div>
                    </form>
                </fieldset>
            </div>
        )
    }
}

export default LoginForm;