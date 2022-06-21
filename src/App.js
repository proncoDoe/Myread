import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookList from "./BookList"
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books : []
  }

  /* once this component is rendered, the async  componentDidMount() {
 function is run */
  async  componentDidMount() {
    try{
      await BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })

  }catch(err){

    console.log(err)
  }

  }
  
  shelfBooks = [
    {key:'currentlyReading' , name: 'Currently Reading'},
    {key:'wantToRead' , name: 'Want to Read'},
    {key:'read' , name: 'Read'},
  ]

  ChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(books => {
      if(book.shelf === 'none' && shelf !== 'none'){
        this.setState(state => {
          const newBooks = state.books.concat(book);
          return {books: newBooks}
        })
      }

      const updatedBooks = this.state.books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf
        }
        return b;
      });

      this.setState({
        books: updatedBooks,
      });
      
        // if 'none' shelve is chosen, then remove that book from the state
        if(shelf === 'none'){
          this.setState(state=>{
            const newBooks = state.books.filter(deleteBook => deleteBook.id !== book.id);
            return {books: newBooks}
          })
        }
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route path='/search'
        render={() => (
          <SearchBooks books={books} onChangeShelf={this.ChangeShelf} />
        )}
        />

        <Route exact path='/'
        render={() => (
          <BookList books={books} shelfBooks={this.shelfBooks} onChangeShelf={this.ChangeShelf} />
        )}
        />
      </div>
    )
  }
}


export default BooksApp
