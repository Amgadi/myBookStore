import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import EditModal from '../editModal';
import AddModal from '../addModal';
import TopBar from '../topBar';
import {categoryDetails} from '../../config';
import { connect } from "react-redux";
import { removeCategoryFromLocalStorage , getCategoriesFromLocalStorage } from '../actions/categoriesActions';

const mapStateToProps = state => {
    return { categories: state.categoryReducer.categories };
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeCategory: id => dispatch(removeCategoryFromLocalStorage(id)),
        getCategories: () => dispatch(getCategoriesFromLocalStorage())
    }
}

class ConnectedCategories extends Component{
    
    getAllCategories(){
        return this.props.categories;
    }

    componentWillMount(){
        this.props.getCategories();
    }

    renderCategoryDetails = () => {
        return this.getAllCategories().map((category, index) => {
            return <Table.Row key={`categoryIndex${index}`}>
                {categoryDetails.map((property,categoryIndex) => {
                    return <Table.Cell key={`categoryProp${categoryIndex}`}>{category[property]}</Table.Cell>
                })}
            <Table.Cell>
                <EditModal type='Category' values={category}>Edit</EditModal>
            </Table.Cell>
            <Table.Cell>
                <Button color='red' onClick={() => this.props.removeCategory(category.id)}>Remove</Button>
            </Table.Cell>            
            </Table.Row>
        })
    }

    render(){
        return(
            <div align='center'>
                <TopBar title='List of categories'/>
                <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        {categoryDetails.map((r,index) => (
                            <Table.HeaderCell key={`categoryDetailIndex${index}`}>{r}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderCategoryDetails()}
                    </Table.Body>
                </Table>
                <AddModal type='Category'/>
            </div>
        )
    }

};

const Categories = connect(mapStateToProps, mapDispatchToProps)(ConnectedCategories)

export default Categories;