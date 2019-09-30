import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import './style.css';

const getCategoriesOptions = () => {
    var obj = localStorage.getItem('Categories') ? localStorage.getItem('Categories') : JSON.stringify({categories : []});
    obj = JSON.parse(obj);
    obj.categories.map(category => {
        category.key = category.name;
        category.text = category.name;
        category.value = category.name;
        return category
    });
    return obj.categories;
}

const CategoriesDropDown = (props) => {
    return <Dropdown
    placeholder='Select Category'
    onChange={(e) => props.changeSelection(e)}
    fluid
    selection
    defaultValue={props.defaultValue}
    options={getCategoriesOptions()}
/>
}

export default CategoriesDropDown;