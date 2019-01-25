import React, { Component } from 'react';
import AddCategory from './AddCategory';
import ShowAllCategory from './ShowAllCategory';
import axios from 'axios';
import { GET_CATEGORIES } from '../../common/api_endpoints';
import { GET_TAGS } from '../../common/api_endpoints';
import ContentHeader from '../Content/Partial/ContentHeader';

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
                <ContentHeader/>
                
                <div className="panel panel-default panel-heading">
                    <label className="radio-inline">
                        <input type="radio" name="optradio" defaultChecked value='Category' onClick={this.handleCatSubCatSelector} />Category
                    </label>
                    <label className="radio-inline">
                        <input type="radio" name="optradio" value='Tag' onClick={this.handleCatSubCatSelector} />Tags
                    </label>
                </div>

                <AddCategory getCategoriesOrSubcategoriesFunc={this.getCategoriesOrSubcategoriesFunc} categoryOrSubcategoryArr={this.state.categoryOrSubcategoryArr} categoryOrSubcategory={this.state.categoryOrSubcategory} />
                <ShowAllCategory getCategoriesOrSubcategoriesFunc={this.getCategoriesOrSubcategoriesFunc} categoryOrSubcategoryArr={this.state.categoryOrSubcategoryArr} categoryOrSubcategory={this.state.categoryOrSubcategory} />
            </div>
        )
    }
}

export default Category;