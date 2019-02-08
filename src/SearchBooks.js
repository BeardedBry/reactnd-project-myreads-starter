import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class SearchBooks extends Component {

    state = {
        books: [],
        shelfBooks: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
          this.setState({ shelfBooks: books })
        })
      }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.query !== prevProps.query && this.props.query.length > 0){
        BooksAPI.search(this.props.query).then(query => (
            (query.length > 0  &&
                this.setState({books: query.filter(book => book.imageLinks)})
                //console.log(query.filter(book => book.imageLinks))
            )
            //console.log(query.map(obj => obj.imageLinks.thumbnail))
       ))
       
    }else if(this.props.query !== prevProps.query){
        this.setState({books:[]})
    }
    //   if(this.props.query !== prevProps.query && this.props.query === '')
    //     this.setState({books:[]})
    }


    render(){
        const options = [
            {value: 'currentlyReading', content: 'Currently Reading'},
            {value: 'wantToRead', content: 'Want to Read'},
            {value: 'read', content: 'Read'},
            {value: 'none', content: 'None'}
        ]

        const { books } = this.state.books


        return(
            (this.state.books.length > 0 && 
            <ol className="books-grid">
             { this.state.books.map((book) =>(
            <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                <div className="book-shelf-changer">
                  <select
                    value={book.shelf}
                     onChange={(e) => this.props.moveToShelf(e.target.value, book)} //need to add function
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
             )) }
            </ol> )
        )
    }
}

export default SearchBooks