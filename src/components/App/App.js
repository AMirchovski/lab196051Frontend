import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Categories from '../Categories/categories';
import Authors from '../Authors/authors';
import Books from '../Books/BookList/books';
import Header from '../Header/header';
import BookAdd from '../Books/BookAdd/bookAdd';
import BookService from "../../repository/libraryRepository";
import BookEdit from "../Books/BookEdit/bookEdit";

import './App.css';
import LibraryService from "../../repository/libraryRepository";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: [],
      categories: [],
      selectedBook: {}
    }
  }

  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
              <Route path={"/categories"} exact render={() =>
                  <Categories categories={this.state.categories}/>}/>
              <Route path={"/authors"} exact render={() =>
                  <Authors authors={this.state.authors}/>}/>
              <Route path={"/books/add"} exact render={() =>
                  <BookAdd categories={this.state.categories}
                              onAddProduct={this.addProduct}/>}/>
              <Route path={"/books/edit/:id"} exact render={() =>
                  <BookEdit categories={this.state.categories}
                               authors={this.state.authors}
                               onEditProduct={this.editBook}
                               book={this.state.selectedBook}/>}/>
              <Route path={"/books"} exact render={() =>
                  <Books books={this.state.books}
                            onDelete={this.deleteBook}
                            onEdit={this.getBook}/>}/>
              {/*<Redirect to={"/products"}/>*/}
            </div>
          </main>
        </Router>
    );
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();
  }

  loadBooks = () => {
    LibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }

  loadAuthors = () => {
    LibraryService.fetchAuthors()
        .then((data) => {
          this.setState({
            authors: data.data
          })
        });
  }

  loadCategories = () => {
    LibraryService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        });
  }

  deleteBook = (id) => {
    LibraryService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        });
  }

  addProduct = (name, category, author, availableCopies) => {
    LibraryService.addBook(name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        });
  }

  getProduct = (id) => {
    LibraryService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        })
  }

  editProduct = (id, name, price, quantity, category, manufacturer) => {
    LibraryService.editBook(id, name, price, quantity, category, manufacturer)
        .then(() => {
          this.loadBooks();
        });
  }
}

export default App;
