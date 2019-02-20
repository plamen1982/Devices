import React, { Component } from "react";
import { graphql, compose } from "react-apollo"; // graphql is the tool that helping us to bind the data from the query with the component
import { getUsersQuery, addDeviceMutation, getDevicesQuery } from "../queries/queries";

class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      model: "",
      userId: ""
    };
  }
  renderUsers() {
    const {
      getUsersQuery: { users }
    } = this.props;
    const {
      getUsersQuery: { loading }
    } = this.props;
    if (loading) {
      return <option>Loading Users...</option>;
    }

    return users.map(user => {
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      );
    });
  }

  submitForm = e => {
    e.preventDefault();
    this.props.addDeviceMutation({
        variables: {
            name: this.state.name,
            model: this.state.model,
            userId: this.state.userId,
        },
        refetchQueries: [{
            query: getDevicesQuery
        }]
    });
  };

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Device name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label>Model:</label>
          <input
            type="text"
            onChange={e => this.setState({ model: e.target.value })}
            required
          />
        </div>
        <div className="field">
          <label>User:</label>
          <select onChange={e => this.setState({ userId: e.target.value })} required>
            <option>Select User</option>
            {this.renderUsers()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery" }), // getUsersQuery is going to be attached to this.props and inside is going to be the users array
  graphql(addDeviceMutation, { name: "addDeviceMutation" }) // addDeviceMutation is going to be attached to this.props
)(AddDevice); //when component renders the data is requested with the query and the binding with the
//component and the information from the query is stored in the this.props
//compose is used for binding several queries to one component

//1. constructing the query
//2. binding the query result with the component
