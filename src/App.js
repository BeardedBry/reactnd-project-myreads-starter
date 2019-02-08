import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book.js'
import Search from './Search.js'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  moveShelf = (shelf, book) => {
    //Function that changes the shelf of a book. in the state AND on the server!
     
    let currentBook = this.state.books.findIndex(obj => obj.id === book.id ); 
    let newBookShelf = this.state.books;
    newBookShelf[currentBook].shelf = shelf

    BooksAPI.update(book, shelf);

    this.setState({
      books: newBookShelf
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                      {currentlyReading.map((book) =>(
                        <Book book={book} key={book.id} moveToShelf={this.moveShelf}/>
                      ))}

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    {wantToRead.map((book) =>(
                        <Book book={book} key={book.id} moveToShelf={this.moveShelf}/>
                      ))}                   

                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">

                    {read.map((book) =>(
                        <Book book={book} key={book.id} moveToShelf={this.moveShelf.bind(this)}/>
                      ))}

                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"><button>Add a book</button></Link>
            </div>
          </div>
          )}/>

          <Route path='/search' render={()=> (
            <Search />
          )}/>

      </div>
    )
  }
}

export default BooksApp
