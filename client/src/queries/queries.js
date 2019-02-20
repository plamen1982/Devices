import { gql } from "apollo-boost"; // gql is the tool that helping us to construct the query, since GraphQL is not a javascript, but rather diff language

const getUsersQuery = gql`
  {
    users {
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
      model
      user {
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

//$name, $model and $userId are comming where addDeviceMutation is called and what is inside the variables object
const addDeviceMutation = gql`
  mutation AddDevice($name: String!, $model: String!, $userId: ID!) {
    addDevice(name: $name, model: $model, userId: $userId) {
      name
      id
    }
  }
`;
//String! - or ! means non empty in this case String

export { getUsersQuery, getDevicesQuery, addDeviceMutation, getDeviceQuery };
