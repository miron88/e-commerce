import React, { Component } from 'react';
import axios from 'axios';
import { ADD_CATEGORY } from '../../common/api_endpoints';
import { ADD_TAG } from '../../common/api_endpoints';
import {Redirect} from 'react-router-dom';
import CustomMessage from '../../components/CustomMessage';

class AddCategory extends Component{
    constructor(props){
        super(props);
        this.state = {
            CategoryOrSubcategory: '',
            errorSuccessMessage: '',
            errorSuccessMessageDivClass: 'hide'
        }
        this.handleCategoryOrSubcategoryInput = this.handleCategoryOrSubcategoryInput.bind(this);
        this.handleAddCategoriesOrSubcategories = this.handleAddCategoriesOrSubcategories.bind(this);
    }

    handleCategoryOrSubcategoryInput(e){
        this.setState({CategoryOrSubcategory: e.target.value});
        let catOrSubcat = this.props.categoryOrSubcategory.toLowerCase() === 'category'?'category':'subcategory';

        if(this.props.categoryOrSubcategoryArr.find(x => (x[catOrSubcat].toLowerCase()) === e.target.value.toLowerCase())){
            console.log("Duplicate!!!");
            this.setState({errorSuccessMessage: this.props.categoryOrSubcategory+' already exist.'});
            this.setState({errorSuccessMessageDivClass: 'alert alert-warning show'});
        }
        else{
            this.setState({errorSuccessMessage: ''});
            this.setState({errorSuccessMessageDivClass: 'hide'});
        }
        //console.log(this.props.categoryOrSubcategoryArr.find(x => (x.category) = e.target.value));
    }
    handleAddCategoriesOrSubcategories(){
        if(this.state.CategoryOrSubcategory.length>0){
            if(this.state.errorSuccessMessage.length === 0){
                this.setState({errorSuccessMessage: ''});
                this.setState({errorSuccessMessageDivClass: 'alert alert-success hide'});
                const formData = new FormData();
                formData.append(this.props.categoryOrSubcategory, this.state.CategoryOrSubcategory);
                axios.post(this.props.categoryOrSubcategory === 'Category'?ADD_CATEGORY:ADD_TAG,formData)
                    .then(res => {
                        console.log(this.props.categoryOrSubcategory+" Added successfully.");
                        console.log(res);
                        this.props.getCategoriesOrSubcategoriesFunc(); // Updating the category list.
                        this.setState({CategoryOrSubcategory: ''});
                        this.setState({errorSuccessMessage: 'New '+this.props.categoryOrSubcategory+' Added Successfully'});
                        this.setState({errorSuccessMessageDivClass: 'alert alert-success show'});
                    })
                    .catch((error) => {
                        console.log("File upload failed!");
                        console.log(error);
                        this.setState({errorSuccessMessage: 'Server: Failed to add new '+this.props.categoryOrSubcategory+'.'});
                        this.setState({errorSuccessMessageDivClass: 'alert alert-danger show'});
                    });
           }
        }
        else{
            this.setState({errorSuccessMessage: 'Please enter the '+this.props.categoryOrSubcategory+' name.'});
            this.setState({errorSuccessMessageDivClass: 'alert alert-warning show'});
        }
    }
    render(){
        const USER = localStorage.getItem('user');
        return(
            <div>
                {
                    !USER?<Redirect to={{
                        pathname: "/"
                    }}/>:("")
                }
                { /* Form validation or ERROR message. */}
                <fieldset>
                    <legend>Add New {this.props.categoryOrSubcategory}</legend>
                    <CustomMessage errorSuccessMessageDivClass={this.state.errorSuccessMessageDivClass} errorSuccessMessage={this.state.errorSuccessMessage}/>
                        <form className="form-inline">
                            <div className="form-group col-sm-12">
                                <div className="col-sm-2 control-label">{this.props.categoryOrSubcategory} Name:</div>
                                <input className="form-control col-sm-8" onChange={this.handleCategoryOrSubcategoryInput} value={this.state.CategoryOrSubcategory} id="focusedInput" type="text" placeholder={`${this.props.categoryOrSubcategory} name`}/>
                                <div className='col-sm-2'>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleAddCategoriesOrSubcategories}>Add</button>
                                </div>
                            </div>
                        </form>
                </fieldset>
            </div>
        )
    }
}

export default AddCategory;