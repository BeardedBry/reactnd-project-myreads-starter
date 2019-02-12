import React, { Component } from 'react'
import Book from './Book.js'


const Shelf = () => {
  return {
    render(){

        return(
            <div className="bookshelf" key={this.props.shelf}>
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">

                     {this.props.shelf.map((book) =>(
                        <Book book={book} key={book.id} moveToShelf={this.props.moveShelf}/>
                      ))}

                    </ol>
                </div>
            </div>
        )
    }
  }
}

export default Shelf