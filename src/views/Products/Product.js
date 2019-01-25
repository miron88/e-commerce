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
        /*let apiPath = "http://miron.gearhostpreview.com/api/values/GetProducts?category="+this.state.category;
        superagent
            .get(apiPath)
            .end((err, res) => {
                if(err) {
                    this.setState({errorMessage: "Client: Unable to retrive product."});
                    this.setState({successMessage: null});
                    console.log("Client: Unable to retrive product.");
                    return;
                }
                if(res.body){
                    this.setState({successMessage: "Retrive product(s) successfully."});
                    this.setState({errorMessage: null});
                    let products=[];
                    res.body.forEach(element => {
                            products.push(JSON.parse(element));
                        //window.element=element;
                        
                    });
                    this.setState({products: products});
                    window.products=this.state.products;
                    console.log("Retrive product(s) successfully.");
                }
                else{
                    this.setState({errorMessage: "Server: Something went wrong."});
                    this.setState({successMessage: null});
                    console.log("Server: Something went wrong.");
                }
                window.res=res;
            })*/

        axios.post(GET_PRODUCT('home'))
        .then(res => {
            console.log("Successfully.");
            console.log(res);
            this.setState({products: res.data});
            window.products=this.state.products;
            //this.setState({errorSuccessMessage: 'Retrive product(s) successfully.'});
            //this.setState({errorSuccessMessageDivClass: 'alert alert-success show'});
            //this.resetForm();
        })
        .catch((error) => {
            console.log("Server: Something went wrong!");
            console.log(error);
            //this.setState({errorSuccessMessage: 'Server: Something went wrong.'});
            //this.setState({errorSuccessMessageDivClass: 'alert alert-danger show'});
        });
    }
    componentDidMount(){
        console.log("DFD");
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
        //let img_path = images('http://miron.gearhostpreview.com/uploads/'+this.props.data.Images);
        let img_path = 'http://miron.gearhostpreview.com/uploads/'+this.props.data.Images;
        return(
            <a href='/'>
            <li className="list-group-item">
            
                <div><img className='img-responsive' src={img_path} alt={this.props.data.Images} width='100'/></div>
                <div>
                    <h4>{this.props.data.ProductTitle}</h4>
                    <div>{this.props.data.Quantity>0?'Availability: Yes':'Not Available'}</div>
                </div>
                <div style={{float: 'right'}}>
                    <h1>&#36;{this.props.data.Price}</h1>
                </div>
            </li></a>
        )
    }
}

export default Product;