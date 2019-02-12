import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book.js'
import Search from './Search.js'
import Shelf from './Shelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    search: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  moveShelf = (shelf, book) => {
    //Function that changes the shelf of a book. in the state AND on the server!
     
    let currentBook = this.state.books.findIndex(obj => obj.id === book.id ); 
    let newBookShelf = [...this.state.books];
    newBookShelf[currentBook].shelf = shelf

    BooksAPI.update(book, shelf);

    this.setState({
      books: newBookShelf
    })
  }

  update = () =>{
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }


  render() {

    let currentlyReading = this.state.books.filter((book) => book.shelf === "currentlyReading");
    let wantToRead = this.state.books.filter((book) => book.shelf === "wantToRead");
    let read = this.state.books.filter((book) => book.shelf === "read");
  

    return (
      <div className="app">
      
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf shelf={currentlyReading} moveShelf={this.moveShelf} title={'Currently Reading'} />
                <Shelf shelf={wantToRead} moveShelf={this.moveShelf} title={'Want to Read'} />
                <Shelf shelf={read} moveShelf={this.moveShelf} title={'Read'} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
          )}/>

          <Route path='/search' render={()=> (
            <Search update={this.update} books={this.state.books}/>
          )}/>

      </div>
    )
  }
}

export default BooksApp
