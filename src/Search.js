import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

    state = {
        query: '',
    }

    updateQuery = (val) => {
        this.setState({
            query: val
        })
    }



    render(){

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" onClick={this.props.update}>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                type="text" 
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(e) => this.updateQuery(e.target.value)}
                />

              </div>
            </div>
            <div className="search-books-results">
                { <SearchBooks query={this.state.query} books={this.props.books} /> }
            </div>
          </div>
        )
    }
}

export default Search