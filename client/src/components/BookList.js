import React, { Component } from 'react';
import { graphql } from 'react-apollo'; // graphql is the tool that helping us to bind the data from the query with the component
import { getBooksQuery } from '../queries/queries';

//components
import BookDetails from './BookDetails';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }

    renderBooks() {
        const { data: { books } } = this.props;
        const { data: { loading } } = this.props;
        if(loading) {
            return <div>Loading books...</div>
        }

        return books.map((book) => {
            return (<li key={book.id} onClick={(e) => { this.setState({selected: book.id}) }}>{book.name}</li>)
        })
    }
  render() {
    return (
        <div>
            <ul id="book-list">
                {this.renderBooks()}
            </ul>
            <BookDetails bookId={ this.state.selected }/>
        </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList); //when component renders the data is requested with the query and the binding with the 
                                                //component and the information from the query is stored in the this.props

//1. constructing the query
//2. binding the query result with the component