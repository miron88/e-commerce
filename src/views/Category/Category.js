import React, { Component } from 'react';
import AddCategory from './AddCategory';
import ShowAllCategory from './ShowAllCategory';
import axios from 'axios';
import { GET_CATEGORIES } from '../../common/api_endpoints';
import { GET_TAGS } from '../../common/api_endpoints';

class Category extends Component{  
    constructor(props){
        super(props);
        this.state = {
            categoryOrSubcategoryArr: [],
            errorSuccessMessage: null,
            errorSuccessMessageDivClass: 'hide',
            categoryOrSubcategory: 'Category'
        }
        this.getCategoriesOrSubcategoriesFunc = this.getCategoriesOrSubcategoriesFunc.bind(this);
        this.handleCatSubCatSelector = this.handleCatSubCatSelector.bind(this);
    }
    async componentDidMount(){
        await this.getCategoriesOrSubcategoriesFunc();
    } 
    getCategoriesOrSubcategoriesFunc(){
        axios.get(this.state.categoryOrSubcategory === 'Category'?GET_CATEGORIES:GET_TAGS)
        .then(res => {
            console.log("Get"+this.state.categoryOrSubcategory+" - Response: OK");
            console.log(res);
            this.setState({categoryOrSubcategoryArr: res.data});
            window[this.state.categoryOrSubcategory] = res;
        })
        .catch(error => {
            console.log("Get"+this.state.categoryOrSubcategory+" - Response: ERROR");
            console.log(error);
        })
    }

    handleCatSubCatSelector = e => {
        console.log(e.target.value);
        this.setState({categoryOrSubcategory: e.target.value}, () => {
            this.getCategoriesOrSubcategoriesFunc();
        })
    }
    render(){
        return(
            <div>
                <div className="card ">
                    <div className="card-body">
                        <h4 className="card-title">Select to switch</h4>
                        <div className="form-check-inline">
                            <label className="form-check-label">
                                <input className='form-check-input' type="radio" name="optradio" defaultChecked value='Category' onClick={this.handleCatSubCatSelector} />Category
                            </label>
                            <label className="form-check-label">
                                <input className='form-check-input' type="radio" name="optradio" value='Tag' onClick={this.handleCatSubCatSelector} />Tags
                            </label>
                        </div>
                    </div>
                </div>

                <AddCategory getCategoriesOrSubcategoriesFunc={this.getCategoriesOrSubcategoriesFunc} categoryOrSubcategoryArr={this.state.categoryOrSubcategoryArr} categoryOrSubcategory={this.state.categoryOrSubcategory} />
                <ShowAllCategory getCategoriesOrSubcategoriesFunc={this.getCategoriesOrSubcategoriesFunc} categoryOrSubcategoryArr={this.state.categoryOrSubcategoryArr} categoryOrSubcategory={this.state.categoryOrSubcategory} />
            </div>
        )
    }
}

export default Category;