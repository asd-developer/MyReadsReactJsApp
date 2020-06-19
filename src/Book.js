import React from 'react'

export default function Book({book}) {
    return <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                }}></div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
        </div>
}