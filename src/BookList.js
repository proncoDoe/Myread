import React from 'react'
import Shelf from './Shelf'
import Search from './Search'

class BookList extends React.Component {
  render() {
    const { books, shelfBooks, onChangeShelf } = this.props;
    function booksOnShelf (shelf){
      return books.filter(book => book.shelf === shelf.key)
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfBooks.map(shelf => (
              <Shelf key={shelf.key} shelf={shelf} books={booksOnShelf(shelf)} onChangeShelf={onChangeShelf} />
            ))}
          </div>
        </div>
        <Search />
      </div>
    )
  }
}

export default BookList
