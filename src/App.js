import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
//import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
}

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        filteredBooks: [],
        books: [],
        showSearchPage: false
    }

    searchBooks = async (query) => {
        if(query !== ""){
            const filteredBooks = await BooksAPI.search(query)
            console.log('filtered books',filteredBooks)
            if(filteredBooks !== undefined && filteredBooks.length > 0) {
                this.setState({filteredBooks})
            }else{
                this.setState({filteredBooks: []})
            }
        }
    }

    handleSearch = debounce(this.searchBooks, 500)

    async componentDidMount() {
        const books = await BooksAPI.getAll()
        this.setState({books})
        console.log(this.state.books)
    }

    handleChange = (id, event) => {
        console.log('id', id, 'event', event.target.value)

        BooksAPI.update(id, event.target.value).then(
            async (response) => {
                const books = await BooksAPI.getAll()
                this.setState({books})
                console.log(this.state.books)
            }
        )
        console.log(this.state.response)
    }

    filterBooks = shelf => book => book.shelf === shelf;


    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">

                            <button className="close-search"
                                    onClick={() => this.setState({showSearchPage: false})}>Close
                            </button>
                            <div className="search-books-input-wrapper">
                                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.

                  atatch even handler to seach input
                  run debouncer
                  search in the booksAPI
                  display the books

                */}
                                <input type="text" placeholder="Search by title or author"
                                       onChange={(event) => this.handleSearch(event.target.value)}/>

                            </div>
                        </div>
                        <div className="bookshelf-books">
                            <ol className="books-grid">

                                {this.state.filteredBooks &&
                                this.state.filteredBooks.map((book) =>
                                    <>

                                        <li>
                                            <Book book={book} handleChange={this.handleChange}/>
                                        </li>
                                    </>
                                )}
                            </ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">

                                            {this.state.books.filter(this.filterBooks('currentlyReading')).map((book) =>
                                                <>

                                                    <li>
                                                        <Book book={book} handleChange={this.handleChange}/>
                                                    </li>
                                                </>
                                            )}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {this.state.books.filter(this.filterBooks('wantToRead')).map((book) =>
                                                <>

                                                    <li>
                                                        <Book book={book} handleChange={this.handleChange}/>
                                                    </li>

                                                </>
                                            )}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {this.state.books.filter(this.filterBooks('read')).map((book) =>
                                                <>

                                                    <li>
                                                        <Book book={book} handleChange={this.handleChange}/>
                                                    </li>

                                                </>
                                            )}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
