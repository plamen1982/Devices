import { gql } from "apollo-boost"; // gql is the tool that helping us to construct the query, since GraphQL is not a javascript, but rather diff language

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getDevicesQuery = gql`
  {
    devices {
      name
      id
    }
  }
`;

const getDeviceQuery = gql`
  query GetDevice($id: ID) {
    device(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        devices {
          name
          id
        }
      }
    }
  }
`;

//$name, $genre and $authorId are comming where addDeviceMutation is called and what is inside the variables object
const addDeviceMutation = gql`
  mutation AddDevice($name: String!, $genre: String!, $authorId: ID!) {
    addDevice(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
//String! - or ! means non empty in this case String

export { getAuthorsQuery, getDevicesQuery, addDeviceMutation, getDeviceQuery };
