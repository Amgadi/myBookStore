export const getDataFromLocalStorage = () => dispatch => {
    let booksList = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')).books : [];
    return dispatch(getBooks(booksList));
};

export const getBooks = (bookList) => {
    return { type: "GET_BOOKS", payload: {bookList} }
};

export const addBookToLocalStorage = (book) => dispatch => {
    let booksList = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : {books : []};
    let newList = Object.assign({}, booksList, {
        books: booksList.books.concat(book)
        });
        let objString = JSON.stringify(newList);
        localStorage.setItem('Books', objString);
    return dispatch(addBook(newList.books));
};

export const addBook = (bookList) => {
    return { type: "ADD_BOOK", payload: {bookList} }
};

export const editBookFromLocalStorage = (bookDetails) => dispatch => {
    let booksList = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : [];
    let newList =  Object.assign({}, booksList, {
        books: booksList.books.map(book => {
            if (book.id === bookDetails.id){
                Object.assign(book, bookDetails )
            }
            return book;
        })
    });
    let objString = JSON.stringify(newList);
    localStorage.setItem('Books', objString);
    return dispatch(editBook(newList.books));
};

export const editBook = (bookList) => {
    return { type: "EDIT_BOOK", payload :{bookList} }
};

export const removeBookFromLocalStorage = (bookID) => dispatch => {
    let booksList = localStorage.getItem('Books') ? JSON.parse(localStorage.getItem('Books')) : [];
    let newList =  Object.assign({}, booksList, {
        books: booksList.books.filter(book => book.id !== bookID)
        });
        let objString = JSON.stringify(newList);
        localStorage.setItem('Books', objString);
        return dispatch(removeBook(newList.books));
};

export const removeBook = (bookList) => {
    return { type: "REMOVE_BOOK", payload: {bookList} }
};