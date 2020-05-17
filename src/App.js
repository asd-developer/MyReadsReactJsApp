import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

function BookShelfSelect() {
    return <select onChange={(event) => {
        console.log(event.target.value)
    }}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
    </select>;
}

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: [],
        showSearchPage: false
    }

    async componentDidMount() {
        const books = await BooksAPI.getAll()
        this.setState({books})
        console.log(this.state.books)
    }

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
                */}
                                <input type="text" placeholder="Search by title or author"/>

                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
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
                                            <li>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{
                                                            width: 128,
                                                            height: 193,
                                                            backgroundImage: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
                                                        }}></div>
                                                        <div className="book-shelf-changer">
                                                            <BookShelfSelect/>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">To Kill a Mockingbird</div>
                                                    <div className="book-authors">Harper Lee</div>
                                                </div>
                                            </li>
                                            {this.state.books.map((book) => (
                                                <li>
                                                    <div className="book">
                                                        <div className="book-top">
                                                            <div className="book-cover" style={{
                                                                width: 128,
                                                                height: 193,
                                                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                            }}></div>
                                                            <div className="book-shelf-changer">
                                                                <select>
                                                                    <option value="move" disabled>Move to...</option>
                                                                    <option value="currentlyReading">Currently Reading
                                                                    </option>
                                                                    <option value="wantToRead">Want to Read</option>
                                                                    <option value="read">Read</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="book-title">1776</div>
                                                        <div className="book-authors">David McCullough</div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            <li>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{
                                                            width: 128,
                                                            height: 193,
                                                            backgroundImage: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
                                                        }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">1776</div>
                                                    <div className="book-authors">David McCullough</div>
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            <li>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{
                                                            width: 128,
                                                            height: 192,
                                                            backgroundImage: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")'
                                                        }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading
                                                                </option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">The Hobbit</div>
                                                    <div className="book-authors">J.R.R. Tolkien</div>
                                                </div>
                                            </li>
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
