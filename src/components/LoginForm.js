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
                <div className="col-sm-12">
                    <div className="col-sm-4"><h4>Already a member?</h4></div>
                    <form onSubmit={this.submitForm}>
                        <div className="form-group col-sm-3">
                            <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChanged} placeholder="Enter email"/>
                        </div>
                        <div className="form-group col-sm-3">
                            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChanged} placeholder="Enter password"/>
                        </div>
                        <div className='col-sm-2'>
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
}

export default LoginForm;