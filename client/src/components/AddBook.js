import React, { Component } from "react";
import { graphql, compose } from "react-apollo"; // graphql is the tool that helping us to bind the data from the query with the component
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }
  renderAuthors() {
    const {
      getAuthorsQuery: { authors }
    } = this.props;
    const {
      getAuthorsQuery: { loading }
    } = this.props;
    if (loading) {
      return <option>Loading Authors...</option>;
    }

    return authors.map(author => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }

  submitForm = e => {
    e.preventDefault();
    this.props.addBookMutation({
        variables: {
            name: this.state.name,
            genre: this.state.genre,
            authorId: this.state.authorId,
        },
        refetchQueries: [{
            query: getBooksQuery
        }]
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })} required>
            <option>Select author</option>
            {this.renderAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }), // getAuthorsQuery is going to be attached to this.props and inside is going to be the authors array
  graphql(addBookMutation, { name: "addBookMutation" }) // addBookMutation is going to be attached to this.props
)(AddBook); //when component renders the data is requested with the query and the binding with the
//component and the information from the query is stored in the this.props
//compose is used for binding several queries to one component

//1. constructing the query
//2. binding the query result with the component
