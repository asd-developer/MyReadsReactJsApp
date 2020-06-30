import React from 'react'
import './App.css'

export default function BookShelfSelect(props) {
    return <select value={props.shelf} onChange={props.handleBookShelfSelect}>
        <option value="move" selected disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
    </select>

}