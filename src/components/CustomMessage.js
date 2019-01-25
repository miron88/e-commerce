import React, { Component } from 'react';

class Custommessage extends Component{
    render(){
        return(
            <div className={this.props.errorSuccessMessageDivClass}>
                <strong>{this.props.errorSuccessMessage}</strong>
            </div>
        )
    }
}
export default Custommessage;