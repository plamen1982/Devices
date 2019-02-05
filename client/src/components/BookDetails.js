import React, { Component } from "react";
import { graphql } from "react-apollo"; // graphql is the tool that helping us to bind the data from the query with the component
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {

    renderBookDetails() {
        const { data: { book } } = this.props;

        if(book) {
        const { data: { book: { author: { books } } } } = this.props;
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {books.map(book => <li key={book.id}>{book.name}</li>)}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No book selected...</div>
            )
        }
    }

  render() {


    return (
        <div id="book-details">
            {this.renderBookDetails()}
        </div>
    );
  }
}

export default graphql(getBookQuery, {
    options: (props) => { 
        return {
            variables: {
                id: props.bookId
            }
        }
     }
})(BookDetails); //when component renders the data is requested with the query and the binding with the 
                                                //component and the information from the query is stored in the this.props

//1. constructing the query - getBookQuery
//2. binding the query result with the component - graphql(getBookQuery)(BookDetails)