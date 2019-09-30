import React from 'react';
import {Provider} from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Categories from './components/categories/categoriesList';
import Books from './components/books/booksList';
import BottomBar from './components/bottomBar';

const Root = ({store}) => (
    <Provider store={store}>
        <Router>
        <div>
            <Route exact path="/" component={Categories} />
            <Route path="/Categories" component={Categories} />
            <Route path="/Books" component={Books} />
            <BottomBar/>
        </div>
        </Router>
    </Provider>
)

export default Root;