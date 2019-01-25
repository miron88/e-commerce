import React, { Component } from 'react';
import axios from 'axios';
import { DELETE_CATEGORY } from '../../common/api_endpoints';
import { DELETE_TAG } from '../../common/api_endpoints';
import CustomMessage from '../../components/CustomMessage';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class ShowAllCategory extends Component{
    constructor(){
        super();
        this.state = {
            errorSuccessMessage: '',
            errorSuccessMessageDivClass: 'hide'
        }
        this.handleCategoryDelete = this.handleCategoryDelete.bind(this);
        this.handleCategoryEdit = this.handleCategoryEdit.bind(this);
    }
    handleCategoryDelete(e){
        //e.preventDefault();
        let categoryID = e.currentTarget.dataset.categoryid;
        confirmAlert({
            title: 'Confirm to DELETE',
            message: 'Are you sure to DELETE this '+this.props.categoryOrSubcategory+'?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log("miron")
                        console.log("categoryID: "+categoryID);
                        axios.delete(this.props.categoryOrSubcategory == 'Category'?DELETE_CATEGORY(categoryID):DELETE_TAG(categoryID))
                        .then(res => {
                            console.log(this.props.categoryOrSubcategory+' Category successfuly deleted.');
                            this.props.getCategoriesOrSubcategoriesFunc(); // Updating the category/tag list.
                            this.setState({errorSuccessMessage: this.props.categoryOrSubcategory+' successfuly deleted.'});
                            this.setState({errorSuccessMessageDivClass: 'alert alert-success show'});
                        })
                        .catch(error=>{
                            console.log("Falied to delete the"+this.props.categoryOrSubcategory+".")
                            this.setState({errorSuccessMessage: 'Falied to delete the.'+this.props.categoryOrSubcategory+'.'});
                            this.setState({errorSuccessMessageDivClass: 'alert alert-danger show'});
                        })
                    }
                },
                {
                    label: 'No'
                }
            ]
        })
    }
    handleCategoryEdit(e){
        let categoryID = e.currentTarget.dataset.categoryid;
        console.log("categoryID: "+categoryID);
    }
    render(){
        return(
            <div>
                <CustomMessage errorSuccessMessage={this.state.errorSuccessMessage} errorSuccessMessageDivClass={this.state.errorSuccessMessageDivClass}/>
                <div className="panel panel-default">
                    <div className="panel-heading">All {this.props.categoryOrSubcategory}</div>
                    {this.props.categoryOrSubcategoryArr.length > 0? this.props.categoryOrSubcategoryArr.map((data, i) => 
                    <CategoryList key={i} data={data} handleCategoryDelete={this.handleCategoryDelete} handleCategoryEdit={this.handleCategoryEdit} catOrSubcat={this.props.categoryOrSubcategory}/>):<div className='alert'>No {this.props.categoryOrSubcategory} Available.</div>}
                </div>
            </div>
        )
    }
}
class CategoryList extends Component{
    render(){
        let temp = this.props.catOrSubcat === 'Category'? 'category':'subcategory';
        return(
            <div className="panel-body">
                <div className='categoryName col-sm-9'>{this.props.data[temp]}</div>
                <div className='modify col-sm-3'>
                    <button type="button" className="btn btn-danger" data-categoryid={this.props.data.Id} onClick={this.props.handleCategoryDelete}>Delete</button>
                    <button type="button" className="btn btn-default" data-categoryid={this.props.data.Id} onClick={this.props.handleCategoryEdit}>Edit</button>
                </div>
            </div>
        )
    }
}
export default ShowAllCategory;