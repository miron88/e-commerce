import React, { Component } from 'react';
import superagent from 'superagent';
import { GET_PRODUCT } from '../../common/api_endpoints';
import axios from 'axios';
//var images = require.context('../../images', true);

class Product extends Component {
    constructor(){
        super();
        this.state = {
            products: [],
            category: '',
            errorMessage: '',
            successMessage: ''
        }
    }
    getProduct(){
        axios.get(GET_PRODUCT())
        .then(res => {
            console.log("Successfully.");
            console.log(res);
            this.setState({products: res.data});
            window.products=this.state.products;
        })
        .catch((error) => {
            console.log("Server: Something went wrong!");
            console.log(error);
        });
    }
    componentDidMount(){
        this.getProduct();
    }
    render(){
        return(
            <div className="row">
                <div className="col-sm-12">
                    <ul className="list-group">{console.log(this.state.products)}
                    { this.state.products.map((data, i) => <ListItems key={i} data={data}/>) }
                    </ul>
                </div>
            </div>
        )
    }
}
class ListItems extends Component {
    render(){
        let images = this.props.data.Images.split(',');
        let img_path = 'http://miron.gearhostpreview.com/uploads/'+images[0];
        return(
            <a href='/'>
            <li className="list-group-item">
            
                <div className='col-sm-3' id='product-image'>
                    <img className='img-responsive' src={img_path} alt={images[0]} width='100'/>
                </div>
                <div className='col-sm-7'>
                    <h4>{this.props.data.ProductTitle}</h4>
                    <h5>{this.props.data.Quantity>0?(this.props.data.Quantity+' Available'):'Stock out'}</h5>
                    <h5>{this.props.data.Sizes.length>0?('Availabel Sizes: '+this.props.data.Sizes):''}</h5>
                    <h5>{this.props.data.Colors.length>0?('Availabel Colors: '+this.props.data.Colors):''}</h5>
                    <p>{this.props.data.Shortbio}</p>
                </div>
                <div className='col-sm-2'>
                    <h1 style={{float: 'right'}}>&#36;{this.props.data.Price}</h1>
                </div>
            </li></a>
        )
    }
}

export default Product;