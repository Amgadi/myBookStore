import React, {Component} from 'react'
import { Button, Header, Input, Modal, Grid,} from 'semantic-ui-react'
import './style.css';
import CategoriesDropDown from './categoriesDropDown';
import { categoryDetails, bookDetails } from '../config';
import  { editBookFromLocalStorage } from './actions/booksActions';
import { editCategoryFromLocalStorage } from './actions/categoriesActions';
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
      editBook: details => dispatch(editBookFromLocalStorage(details)),
      editCategory: details => dispatch(editCategoryFromLocalStorage(details))
  }
}

class ConnectedEditModal extends Component{
    state = {
      isOpen : false
  }

  componentWillMount(){
    Object.keys(this.props.values).forEach(keyName => {
      this.setState({[keyName] : this.props.values[keyName]});
    });
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

  modify = () => {
    var detailList = {
      'id' : this.state.id
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
        this.props.type === 'Book' ? this.props.editBook(detailList) : this.props.editCategory(detailList);
        alert(`${this.props.type + ' ' + this.props.values.name} modified !`);
        this.closeModal();
    }
  }

  keyHandle = (e, keyName) => this.setState({[keyName] : e.target.value})

  getDetails = () => {
    return this.props.type === 'Book' ? bookDetails : categoryDetails;
  }

  closeModal = () => this.setState({isOpen : false});
  openModal = () => this.setState({isOpen : true});

  render(){
      const {values, type} = this.props;
      const {isOpen} = this.state;

      return(
          <Modal open={isOpen} centered 
            trigger={<Button onClick={this.openModal}>Edit</Button>}>
          <Modal.Header>Edit {type}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Change {values.name} Settings</Header>
              <Grid columns='2' centered>
                  {Object.keys(values).map((keyName, index) => (
                      keyName !== 'id'
                      &&
                      <Grid.Row key={`row${index}`}>
                          <Grid.Column><h5>{keyName}</h5></Grid.Column>
                          {type === 'Book' && keyName === 'category'
                          ?
                          <Grid.Column floated='right' style={{marginLeft : '10%', position: 'fixed', zIndex: 10}} >
                            <CategoriesDropDown defaultValue={values[keyName]} changeSelection={this.changeCategorySelection}/>
                          </Grid.Column>
                          :
                          <Grid.Column floated='right' style={{marginLeft : '10%', position: 'fixed'}} >
                            <Input value={this.state[keyName]} onChange={(e) => this.keyHandle(e, keyName)}/>

                          </Grid.Column>
                          }
                      </Grid.Row>
                  ))}
              </Grid>
              <div className='save-margin' align='center'>
                  <Button color='green' onClick={this.modify}>Save</Button>
                  <Button onClick={this.closeModal}>Close</Button>
              </div>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      )
    }
}
const EditModal = connect(null, mapDispatchToProps)(ConnectedEditModal)

export default EditModal;