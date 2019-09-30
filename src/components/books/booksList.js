import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import EditModal from '../editModal';
import AddModal from '../addModal';
import TopBar from '../topBar';
import {bookDetails} from '../../config';
import { connect } from "react-redux";
import { getDataFromLocalStorage, removeBookFromLocalStorage } from '../actions/booksActions';

const mapStateToProps = state => {
    return { books: state.bookReducer.books };
  }
    
const mapDispatchToProps = (dispatch) => {
    return {
        removeBook: id => dispatch(removeBookFromLocalStorage(id)),
        getBooks: () => dispatch(getDataFromLocalStorage())
    }
  }

class ConnectedBooks extends Component{
    state = {
        sortBy: ''
    }

    componentWillMount(){
        this.props.getBooks();
    }

    getAllBooks = () => {
        return this.props.books;
    }

    changeSortKey = (key) => () => this.setState({sortBy : key});

    sortData = (data) => {
        switch (this.state.sortBy)
        {
            case 'name' : 
            {
                data = data.slice().sort((a, b) => a.name.localeCompare(b.name));
                break;
            } 
            case 'category': 
            {
                data = data.slice().sort((a, b) => a.category.localeCompare(b.category));
                break;
            }
            default: break;
        }
        return data;
    }

    renderBooksDetails = () => {
        var tableData = this.getAllBooks();
        tableData = this.sortData(tableData);

        return tableData.map((book, index) => {
                return <Table.Row key={`bookIndex${index}`}>
                    {bookDetails.map((property,bookIndex) => {
                        return <Table.Cell key={`bookProp${bookIndex}`}>{book[property]}</Table.Cell>
                    })}
                        <Table.Cell>
                            <EditModal type='Book' values={book}>Edit</EditModal>
                        </Table.Cell>
                        <Table.Cell>
                            <Button onClick={() => this.props.removeBook(book.id)} color='red'>Remove</Button>
                        </Table.Cell>            
                </Table.Row>
        })
    }

    render(){
        return(
            <div align='center'>
                <TopBar title='List of books'/>
                <Button onClick={this.changeSortKey('name')}>ByName</Button>
                <Button onClick={this.changeSortKey('category')}>ByCategory</Button>

                <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        {bookDetails.map((r,index) => (
                            <Table.HeaderCell key={`bookDetailIndex${index}`}>{r}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderBooksDetails()}
                    </Table.Body>
                </Table>
                <AddModal type='Book'/>
            </div>
        )
    }
};

const Books = connect(mapStateToProps, mapDispatchToProps)(ConnectedBooks)

export default Books;