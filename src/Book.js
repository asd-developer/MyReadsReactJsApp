import React from 'react'
import './App.css'
import BookShelfSelect from './BookShelf'

export default function Book({book, handleChange}) {
    return <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : "" })`
            }}>
            </div>
            <div className='book-shelf-changer'>
                <BookShelfSelect shelf={book.shelf} handleBookShelfSelect={event => handleChange(book.id, event)}/>
            </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
    </div>

}