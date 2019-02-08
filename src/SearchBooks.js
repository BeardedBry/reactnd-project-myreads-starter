import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {

    state = {
        books: []
    }


    componentDidMount() {
        
    }


    render(){

        const { book, bookQuery} = this.props;

        const options = [
            {value: 'currentlyReading', content: 'Currently Reading'},
            {value: 'wantToRead', content: 'Want to Read'},
            {value: 'read', content: 'Read'},
            {value: 'none', content: 'None'}
        ]


        return(
            <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                  <select
                    value={book.shelf}
                     onChange={(e) => moveToShelf(e.target.value, book)} //need to add function
                  >
                  <option value="move" disabled>Move to...</option>
                  {options.map(option => (
                      <option key={option.value} value={option.value}>
                      {option.content}</option>
                  ))}
  
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.author}</div>
            </div>
          </li>
        )
    }
}

export default SearchBooks