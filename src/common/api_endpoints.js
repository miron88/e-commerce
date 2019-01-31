
export const ADD_PRODUCT = "http://miron.gearhostpreview.com/api/values/AddProduct";
export function GET_PRODUCT(category='') {
    if(category === ''){
        return "http://miron.gearhostpreview.com/api/values/GetProducts";
    }
    return "http://miron.gearhostpreview.com/api/values/GetProducts?category="+category;    
}

export const ADD_CATEGORY = "http://miron.gearhostpreview.com/api/values/addcategory";
export const GET_CATEGORIES = "http://miron.gearhostpreview.com/api/values/Getcategory";
export function DELETE_CATEGORY(Id) {
    return "http://miron.gearhostpreview.com/api/values/DeleteCategory?Id="+Id;
}

export const ADD_TAG = "http://miron.gearhostpreview.com/api/values/AddTag";
export const GET_TAGS = "http://miron.gearhostpreview.com/api/values/GetTags";
export function DELETE_TAG(Id) {
    return "http://miron.gearhostpreview.com/api/values/DeleteTag?Id="+Id;
}


/*
export const ADD_PRODUCT = "http://localhost:41515/api/values/AddProduct";
export function GET_PRODUCT(category) {
    return "http://localhost:41515/api/values/GetProducts?category="+category;
}

export const ADD_CATEGORY = "http://localhost:41515/api/values/addcategory";
export const GET_CATEGORIES = "http://localhost:41515/api/values/Getcategory";
export function DELETE_CATEGORY(Id) {
    return "http://localhost:41515/api/values/DeleteCategory?Id="+Id;
}
export const ADD_TAG = "http://localhost:41515/api/values/AddTag";
export const GET_TAGS = "http://localhost:41515/api/values/GetTags";
export function DELETE_TAG(Id) {
    return "http://localhost:41515/api/values/DeleteTag?Id="+Id;
}
*/