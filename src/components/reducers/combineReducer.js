import { combineReducers } from 'redux'
import bookReducer from './booksReducer'
import categoryReducer from './categoriesReducer'

const rootReducer =  combineReducers({
    bookReducer,
    categoryReducer
})

export default rootReducer;