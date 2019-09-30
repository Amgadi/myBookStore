import React, {Component} from 'react'
import { Button, Header, Input, Modal, Grid,} from 'semantic-ui-react'
import './style.css';
import CategoriesDropDown from './categoriesDropDown';
import { categoryDetails, bookDetails } from '../config';
import  { addBookToLocalStorage } from './actions/booksActions';
import { addCategoryToLocalStorage } from './actions/categoriesActions';
import { connect } from "react-redux";
import shortid from 'shortid';

const mapDispatchToProps = (dispatch) => {
    return {
        addBook: details => dispatch(addBookToLocalStorage(details)),
        addCategory: details => dispatch(addCategoryToLocalStorage(details))
    }
}

class ConnectedAddModal extends Component{
    state = {
        isOpen : false,
    }

    create = () => {
        var detailList = {
            'id' : shortid.generate()
        };
        var requiredDetails = this.getDetails();
        requiredDetails.forEach(detail => {
            detailList[detail] = this.state[detail];
        })

        var formErrors = this.validateForm(detailList);
        if (formErrors > 0){
            alert(`Form is not valid, ${formErrors} missing fields`)
        }
        else{
            this.props.type === 'Book' ? this.props.addBook(detailList) : this.props.addCategory(detailList);
            alert(`${this.props.type} created !`);
            this.closeModal();
        }
    }

    changeCategorySelection = (e) => this.setState({category : e.target.textContent})

    validateForm(details){
        var missingFields = 0;
            Object.values(details).forEach(detail => {
                if (detail === '' || detail === undefined || detail === null)
                    missingFields++;
            })
        return missingFields;
    }

    keyHandle = (e, keyName) => this.setState({[keyName] : e.target.value})

    getDetails = () => {
        return this.props.type === 'Book' ? bookDetails : categoryDetails;
    }

    closeModal = () => this.setState({isOpen : false});
    openModal = () => this.setState({isOpen : true});

    render(){
        const {type} = this.props;
        const {isOpen} = this.state;

        return(
            <Modal open={isOpen} centered
            trigger={<Button
             color='green' className='save-margin' circular onClick={this.openModal}>New</Button>}>
            <Modal.Header>Add {type}</Modal.Header>
            <Modal.Content>
            <Modal.Description>
                <Header>Fill all {type} Details</Header>
                <Grid columns={2}>
                    {this.getDetails().map((keyName, index) => (
                        <Grid.Row centered key={`row${index}`}>
                            <Grid.Column><h5>{keyName}</h5></Grid.Column>
                            {type === 'Book' && keyName === 'category'
                            ?
                                <Grid.Column floated='right' style={{marginLeft : '10%', position: 'fixed', zIndex: 10}} >
                                    <CategoriesDropDown defaultValue={null} changeSelection={this.changeCategorySelection}/>
                                </Grid.Column>
                            :
                                <Grid.Column floated='right' style={{marginLeft : '10%', position: 'fixed'}} >
                                    <Input value={this.state.keyName} onChange={(e) => this.keyHandle(e, keyName)}/>
                                </Grid.Column>
                            }
                        </Grid.Row>
                    ))}
                </Grid>
                <div className='save-margin' align='center'>
                    <Button color='green' onClick={this.create}>Create</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </div>
            </Modal.Description>
            </Modal.Content>
        </Modal>
        )
    }
}
const AddModal = connect(null, mapDispatchToProps)(ConnectedAddModal)

export default AddModal;