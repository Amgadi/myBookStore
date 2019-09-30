const initialState = {
    books: []
  };

function bookReducer(state = initialState, action) {
    switch (action.type){
        case 'GET_BOOKS':
        case 'ADD_BOOK':
        case 'EDIT_BOOK':
        case 'REMOVE_BOOK' : {
            let newState = Object.assign({}, state, {
                books: action.payload.bookList
                });
                return newState;
        }
        
        default : return state;
    }
};

export default bookReducer;