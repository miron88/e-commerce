import React, { Component } from 'react';

class SignUpForm extends Component{
    render(){
        return( <fieldset>
            <legend>SIGN UP</legend>
                <form className="form-horizontal" action="/action_page.php">
                   
                        <div className="form-group">
                            <label className="control-label col-sm-2">Email:</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" placeholder="Enter email"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Password:</label>
                            <div className="col-sm-10">          
                                <input type="password" className="form-control" placeholder="Enter password"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2">Confirm Password:</label>
                            <div className="col-sm-10">          
                                <input type="password" className="form-control" placeholder="Re-enter password"/>
                            </div>
                        </div>
                        <div className="form-group">        
                            <div className="col-sm-offset-2 col-sm-10">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox"/> Remember me
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">        
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default">Submit</button>
                            </div>
                        </div> 
                </form>
                    </fieldset>
        )
    }
}
export default SignUpForm;