import React, { Component } from 'react';

class SignUpForm extends Component{
    render(){
        return( <fieldset>
            <legend>SIGN UP</legend>
                <form className="form-inline" action="/action_page.php">
                    <div className="form-group col-sm-12">
                        <div className="control-label col-sm-2">Email:</div>
                        <input type="email" className="form-control col-sm-10" placeholder="Enter email"/>
                    </div>
                    <div className="form-group col-sm-12">
                        <div className="control-label col-sm-2">Password:</div>
                            <input type="password" className="form-control col-sm-10" placeholder="Enter password"/>
                    </div>
                    <div className="form-group col-sm-12">
                        <div className="control-label col-sm-2">Confirm Password:</div>
                        <input type="password" className="form-control col-sm-10" placeholder="Re-enter password"/>
                    </div>
                    <div className="form-group col-sm-12">   
                        <div className="control-label col-sm-2"></div>     
                        <div className="col-sm-10">
                            <div className="checkbox">
                                <div>
                                    <input type="checkbox"/> Remember me
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">        
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-secondary">Submit</button>
                        </div>
                    </div> 
                </form>
                    </fieldset>
        )
    }
}
export default SignUpForm;