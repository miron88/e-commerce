import React, { Component } from 'react';
import axios from 'axios';

class Dropdown extends Component{
    constructor(props){
        super(props);
        this.state = {
            ItemArr: []
        }
    }
    async componentDidMount(){
        await this.getListFunc();
    } 
    getListFunc(){
        console.log("MIRON "+this.props.endpoint);
        axios.get(this.props.endpoint)
        .then(res => {
            console.log("Get"+this.props.category+" - Response: OK");
            console.log(res);
            this.setState({ItemArr: res.data});
        })
        .catch(error => {
            console.log("Get"+this.props.category+" - Response: ERROR");
            console.log(error);
        })
    }
    render(){
        return(
            <div>
                <select name={this.props.name} className={this.props.calsses} value={this.props.category} onChange={this.props.handleInput}>
                <option value=''>Choose...</option>
                {this.state.ItemArr.map((data, i) => 
                    <ItemList key={i} data={data} name={this.props.name} />
                )}
                </select>
            </div>
        )
    }
}

class ItemList extends Component{
    render(){
        let temp = this.props.name == 'category'?'category':'subcategory';
        return(
            <option id={this.props.data.Id}>{this.props.data[temp]}</option>
        )
    }
}

export default Dropdown;
