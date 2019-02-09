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
          this.setState({ shelfBooks: books})
        })
      }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.query !== prevProps.query && this.props.query.length > 0){
        BooksAPI.search(this.props.query).then((query) => {
            return (query.length > 0  &&
                this.setState(({books} ) =>{
                    query = query.filter(book => book.imageLinks)

                    const newQuery = query.map(book => {
                        let matchingId = prevState.shelfBooks.indexOf(prevState.shelfBooks.find(shelfBook => shelfBook.id === book.id ))
                        if(matchingId >= 0){
                          //  console.log(prevState.shelfBooks[matchingId])
                            book.shelf = prevState.shelfBooks[matchingId].shelf // May be wierd, but it works.
                            return book;
                        }else{
                        return book;
                        }
                    })
                    return { books: newQuery }
                })   
                )
        })


  
        }else if(this.props.query !== prevProps.query){
         this.setState({books:[]})
         }
    //   if(this.props.query !== prevProps.query && this.props.query === '')
    //     this.setState({books:[]})
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
        BooksAPI.getAll().then(books => {
            this.setState({ shelfBooks: books})
          })

        // const existingBook = this.state.books.filter(book => book.id === this.state.shelfBooks.find(book.id))
        // console.log({existingBook})
      }

    render(){
        const options = [
            {value: 'currentlyReading', content: 'Currently Reading'},
            {value: 'wantToRead', content: 'Want to Read'},
            {value: 'read', content: 'Read'},
            {value: 'none', content: 'None'}
        ]


        const { books } = this.state.books
        const { inventory } = this.state.shelfBooks
    

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
                    value={book.shelf || options[3].value}
                     onChange={(e) => this.moveShelf(e.target.value, book)} //need to add function
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
              <div className="book-authors">{book.authors.map(author => <div>{author} <br /></div>)}</div>
            </div>
          </li>
             )) }
            </ol> )
        )
    }
}

export default SearchBooks