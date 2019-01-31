/*
Author: Miron Sayeed
Date: 1/18/2019

Parent(s): [Content.js]
*/

import React, { Component } from 'react';
import axios from 'axios';
import { ADD_PRODUCT } from '../../../common/api_endpoints';
import { GET_CATEGORIES } from '../../../common/api_endpoints';
import { GET_TAGS } from '../../../common/api_endpoints';
import CustomMessage from '../../../components/CustomMessage';
import Dropdown from '../../../components/Dropdown';

class AddProduct extends Component {
    constructor(){
        super();
        this.state = {
            // Form field name will hold the value
            productTitle: '',
            productCode: '',
            category: '',
            tag: '',
            price: '',
            quantity: '',
            sizes: '',
            colors: '',
            shortbio: '',
            description: '',
            selectedFeaturedImageFile: '',
            selectedAddiionalImageFiles: '',
            /*******************************************************/
            
            // For form validation
            formErrors: {
                productTitle: '', 
                category: '',
                price: '',
                quantity: '',
                selectedFeaturedImageFile: ''
            },
            isFieldValid: {
                productTitle: '',
                category: '',
                price: '',
                quantity: '',
                selectedFeaturedImageFile: ''
            },

            formValid: false, // Used for button 'Add' button Disable/Enable
            /*******************************************************/
            
            // Used after form submission.
            errorSuccessMessage: null,
            errorSuccessMessageDivClass: null
        }
        this.handleInput = this.handleInput.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    // Handling the user input followed by the form validation.
    handleInput = e => {
        
        this.setState({errorSuccessMessage: ''});
        this.setState({errorSuccessMessageDivClass: 'hide'});
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        if(e.target.type !== 'file'){
            this.setState({[fieldName]: fieldValue},
                            () => { this.validateField(fieldName, fieldValue)});
        }
        else{
            if(e.target.name === 'selectedFeaturedImageFile'){

                this.setState({selectedFeaturedImageFile: e.target.files},
                    () => { this.validateField(fieldName, fieldValue)});
            }
            else if(e.target.name === 'selectedAddiionalImageFiles'){

                this.setState({selectedAddiionalImageFiles: e.target.files},
                    () => { this.validateField(fieldName, fieldValue)});
            }
        }
    }
    
    // <summary>
    //      This function validate the Add product form.
    //      <param>
    //          fieldName   = input field name
    //          value       = input field value
    //      </param>
    //      return: void
    // </summary>
    validateField = ( fieldName, value ) => {

        // Assiging the state variable into local variable.
        let formErrors = this.state.formErrors;
        let isFieldValid = this.state.isFieldValid;

        // Changing the local variable based on which form is handling currently. 
        switch(fieldName){
            case 'productTitle':
                isFieldValid.productTitle = value.trim().length > 0;
                formErrors.productTitle = isFieldValid.productTitle?'':'is invalid';
                break;
            case 'category':
                isFieldValid.category = value.trim().length > 0;
                formErrors.category = isFieldValid.category?'':'is invalid';
                break;
            case 'price':
                isFieldValid.price = this.isPositiveFloatOrInteger(value.trim());
                formErrors.price = isFieldValid.price?'':'is invalid';
                break;
            case 'quantity':
                isFieldValid.quantity = this.isPositiveInteger(value.trim());
                console.log(this.isPositiveInteger(value.trim()));
                formErrors.quantity = isFieldValid.quantity?'':'is invalid';
                break;
            case 'selectedFeaturedImageFile':
                isFieldValid.selectedFeaturedImageFile = value.trim().length > 0;
                formErrors.selectedFeaturedImageFile = isFieldValid.selectedFeaturedImageFile?'':'is invalid';
                break;
        }

        // After the change, all local variable assigning into the state variable.
        // Determining if all the form is validate or not by callback function 'validateForm'.
        this.setState({formErrors: formErrors,
            isFieldValid:isFieldValid
                        /*productTitleValid: isFieldValid.productTitle,
                        categoryValid: isFieldValid.category,
                        priceValid: isFieldValid.price,
                        quantityValid: isFieldValid.quantity,
                        selectedFeaturedImageFileValid: isFieldValid.selectedFeaturedImageFile*/
                    }, this.validateForm);
    }

    isPositiveFloatOrInteger = s => {
        //return /^\+?[1-9][\d]*$/.test(s);
        var n = /^[+-]?((\.\d+)|(\d+(\.\d+)?))$/;
        return n.test(s)?s>=0?true:false:false;
    }

    isPositiveInteger = s => {
        //return /^-{0,1}\d+$/.test(s);
        return /^\+?[1-9][\d]*$/.test(s);
    }

    // <summary>
    //      This function set the state variable 'formValid' to true if all the form is valid. 'formValid' will be used to disable the "ADD" button
    //      <param>
    //          none
    //      </param>
    //      return: void
    // </summary>
    validateForm = () =>{
        this.setState({formValid: this.state.isFieldValid.productTitle
                        && this.state.isFieldValid.category
                        && this.state.isFieldValid.price
                        && this.state.isFieldValid.quantity
                        && this.state.isFieldValid.selectedFeaturedImageFile
                    });
    }

    // <summary>
    //      This function return the className if the field contains error.
    //      <param>
    //          none
    //      </param>
    //      return: className
    // </summary>
    errorClass(error){
        return (error != null && error.length === 0 ? '': 'hasError');
    }

    addProduct(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('productTitle', this.state.productTitle);
        formData.append('productCode', this.state.productCode);
        formData.append('category', this.state.category);
        formData.append('subcategory', this.state.tag);
        formData.append('price', this.state.price);
        formData.append('quantity', this.state.quantity);
        formData.append('sizes', this.state.sizes);
        formData.append('colors', this.state.colors);
        formData.append('shortbio', this.state.shortbio);
        formData.append('description', this.state.description);
        
        // Putting the featured image at the first position in the Array.
        let allFiles = [];
        if(this.state.selectedFeaturedImageFile !== null && this.state.selectedFeaturedImageFile.length){
            allFiles = [...this.state.selectedFeaturedImageFile];
        }
        if(this.state.selectedAddiionalImageFiles !== null && this.state.selectedAddiionalImageFiles.length){
            allFiles.push(...this.state.selectedAddiionalImageFiles);
        }
        console.log(allFiles);

        if(allFiles.length > 0){
            for(let i = 0; i< allFiles.length; i++){
                formData.append(['image'+i], allFiles[i]);
            }
        }
        console.log(formData);
        
        axios.post(ADD_PRODUCT,formData)
            .then(res => {
                console.log("Successfully.");
                console.log(res);
                this.setState({errorSuccessMessage: 'New Product Added Successfully.'});
                this.setState({errorSuccessMessageDivClass: 'alert alert-success show'});
                this.resetForm();
            })
            .catch((error) => {
                console.log("Failed!");
                console.log(error);
                this.setState({errorSuccessMessage: 'Failed to Add new Product.'});
                this.setState({errorSuccessMessageDivClass: 'alert alert-danger show'});
            });
    }
    resetForm(){
        this.setState({productTitle: ''});
        this.setState({productCode: ''});
        this.setState({category: ''});
        this.setState({tag: ''});
        this.setState({price: ''});
        this.setState({quantity: ''});
        this.setState({sizes: ''});
        this.setState({colors: ''});
        this.setState({shortbio: ''});
        this.setState({description: ''});
        this.setState({selectedFeaturedImageFile: ''});
        this.setState({selectedAddiionalImageFiles: ''});
        this.setState({formValid: false});
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <CustomMessage errorSuccessMessageDivClass={this.state.errorSuccessMessageDivClass} errorSuccessMessage={this.state.errorSuccessMessage}/>  
                        <fieldset>
                            <legend>Add Product</legend>
                            <form className='form-horizontal'>
                                {/*Product Title*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="productTitle">Product Title: </label>
                                    <div className="col-sm-9">
                                        <input name='productTitle' type="text" value={this.state.productTitle} onChange={this.handleInput} className={`form-control ${this.errorClass(this.state.formErrors.productTitle)}`} placeholder="Enter Product Title"/>
                                    </div>
                                    <span className="glyphicon glyphicon-star-empty col-sm-1"></span>
                                </div>
                                
                                {/*Product Code*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="productCode">Product Code: </label>
                                    <div className="col-sm-9">
                                        <input name='productCode' type="text" value={this.state.productCode} onChange={this.handleInput} className='form-control' placeholder="Enter Product Code"/>
                                    </div>
                                </div>
                                
                                {/*Category*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="category">Category: </label>
                                    <div className="col-sm-9">
                                        <Dropdown name='category' endpoint={GET_CATEGORIES} calsses={`form-control ${this.errorClass(this.state.formErrors.category)}`} category={this.state.category} handleInput={this.handleInput}/>
                                    </div>
                                    <span className="glyphicon glyphicon-star-empty col-sm-1"></span>
                                </div>
                                
                                {/*Tag*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="tag">Tag: </label>
                                    <div className="col-sm-9">
                                        <Dropdown name='tag' endpoint={GET_TAGS} calsses='form-control' category={this.state.tag} handleInput={this.handleInput}/>
                                    </div>
                                </div>

                                {/*Price/each*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="price">Price/each: </label>
                                    <div className="col-sm-9">
                                        <input name='price' type="number" value={this.state.price} onChange={this.handleInput} className={`form-control ${this.errorClass(this.state.formErrors.price)}`} placeholder="Enter Price"/>
                                    </div>
                                    <span className="glyphicon glyphicon-star-empty col-sm-1"></span>
                                </div>

                                {/*Quantity*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="quantity">Quantity: </label>
                                    <div className="col-sm-9">
                                        <input name='quantity' type="number" value={this.state.quantity} onChange={this.handleInput} className={`form-control ${this.errorClass(this.state.formErrors.quantity)}`} placeholder="Enter Quantity"/>
                                    </div>
                                    <span className="glyphicon glyphicon-star-empty col-sm-1"></span>
                                </div>

                                {/*Sizes*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="sizes">Sizes: </label>
                                    <div className="col-sm-9">
                                        <input name='sizes' type="text" value={this.state.sizes} onChange={this.handleInput} className='form-control' placeholder="Enter Sizes"/>
                                    </div>
                                    <label className="control-label col-sm-2" htmlFor="sizes"></label>
                                    <div className="col-sm-9">Hints: S, M, L</div>
                                </div>
                                
                                {/*Colors*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="colors">Colors: </label>
                                    <div className="col-sm-9">
                                        <input name='colors' type="text" value={this.state.colors} onChange={this.handleInput} className='form-control' placeholder="Enter Colors"/>
                                    </div>
                                    <label className="control-label col-sm-2" htmlFor="sizes"></label>
                                    <div className="col-sm-9">Hints: Blue, White, Black</div>
                                </div>
                                
                                {/*Short Bio*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="shortbio">Short Bio: </label>
                                    <div className="col-sm-9">
                                        <input name='shortbio' type="text" value={this.state.shortbio} onChange={this.handleInput} className='form-control' placeholder="Enter Short Bio"/>
                                    </div>
                                </div>

                                {/*Description*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="description">Description: </label>
                                    <div className="col-sm-9">
                                        <textarea name='description' className='form-control' value={this.state.description} onChange={this.handleInput} rows="5"></textarea>
                                    </div>
                                </div>

                                {/*Upload Featured Image*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="upload_image">Featured Image: </label>
                                    <div className="col-sm-9">
                                        <span className="input-group-btn">
                                            <span className={`btn btn-default btn-file ${this.errorClass(this.state.formErrors.selectedFeaturedImageFile)}`}>
                                                <input onChange={this.handleInput} type="file" name="selectedFeaturedImageFile"/>
                                            </span>
                                        </span>
                                    </div>
                                    <span className="glyphicon glyphicon-star-empty col-sm-1"></span>
                                </div>

                                {/*Upload Additional Images*/}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="upload_image">Additional Image(s): </label>
                                    <div className="col-sm-2">
                                        <span className="input-group-btn">
                                            <span className="btn btn-default btn-file">
                                                <input onChange={this.handleInput} type="file" name="selectedAddiionalImageFiles" multiple/>
                                            </span>
                                        </span>
                                    </div>
                                </div>                                
                                
                                <div className="form-group">
                                    <label className="control-label col-sm-2"></label>
                                    <div className="col-sm-9">
                                        <button className="btn btn-primary" disabled={!this.state.formValid} onClick={this.addProduct}>ADD</button>
                                    </div>
                                </div>
                            </form>   
                        </fieldset>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProduct;
