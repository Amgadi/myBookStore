const initialState = {
    categories: []
  };

function categoryReducer(state = initialState, action) {
    switch (action.type){
        case 'GET_CATEGORIES':
        case 'ADD_CATEGORY' :
        case 'EDIT_CATEGORY':
        case 'REMOVE_CATEGORY': {
            let newState = Object.assign({}, state, {
                categories: action.payload.categoriesList
                });
                return newState;
        }
        default: return state
    }
};

export default categoryReducer;