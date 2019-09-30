export const getCategoriesFromLocalStorage = () => dispatch => {
    let categoriesList = localStorage.getItem('Categories') ? JSON.parse(localStorage.getItem('Categories')).categories : [];
    return dispatch(getCategories(categoriesList));
};

export const getCategories = (categoriesList) => {
    return { type: "GET_CATEGORIES", payload: {categoriesList} }
};

export const addCategoryToLocalStorage = (category) => dispatch => {
    let categoriesList = localStorage.getItem('Categories') ? JSON.parse(localStorage.getItem('Categories')) : {categories : []};
    let newList = Object.assign({}, categoriesList, {
        categories: categoriesList.categories.concat(category)
        });
        let objString = JSON.stringify(newList);
        localStorage.setItem('Categories', objString);
    return dispatch(addCategory(newList.categories));
};


export const addCategory = (categoriesList) => {
    return { type: "ADD_CATEGORY", payload : {categoriesList} }
};

export const editCategoryFromLocalStorage = (CategoryDetails) => dispatch => {
    let categoriesList = localStorage.getItem('Categories') ? JSON.parse(localStorage.getItem('Categories')) : [];
    let newList =  Object.assign({}, categoriesList, {
        categories: categoriesList.categories.map(category => {
            if (category.id === CategoryDetails.id){
                Object.assign(category, CategoryDetails )
            }
            return category;
        })
    });
    let objString = JSON.stringify(newList);
    localStorage.setItem('Categories', objString);
    return dispatch(editCategory(newList.categories));
};

export const editCategory = (categoriesList) => {
    return { type: "EDIT_CATEGORY",  payload:{categoriesList} }
};

export const removeCategoryFromLocalStorage = (categoryID) => dispatch => {
    let categoriesList = localStorage.getItem('Categories') ? JSON.parse(localStorage.getItem('Categories')) : [];
    let newList =  Object.assign({}, categoriesList, {
        categories: categoriesList.categories.filter(category => category.id !== categoryID)
        });
        let objString = JSON.stringify(newList);
        localStorage.setItem('Categories', objString);
        return dispatch(removeCategory(newList.categories));
};

export const removeCategory = (categoriesList) => {
    return { type: "REMOVE_CATEGORY", payload: {categoriesList} }
};