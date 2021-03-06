const graphql = require('graphql');
const Device = require('../models/device');
const User = require('../models/user');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,  
    GraphQLID, 
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const DeviceType = new GraphQLObjectType({
    name: 'Device',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        model: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        position: { type: GraphQLString },
        devices: {
            type: new GraphQLList(DeviceType),
            resolve(parent, args) {
                return Device.find({ userId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        device: {
            type: DeviceType,
            args: { id: { type: GraphQLID } }, 
            resolve(parent, args) {

                return Device.findById(args.id);
            }
        },

        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                return User.findById(args.id);
            }
        },

        devices: { 
            type: new GraphQLList(DeviceType),
            resolve(parent, args) {

                return Device.find({});
            } 
        },

        users: { 
            type: new GraphQLList(UserType),
            resolve(parent, args) {

                return User.find({});
            } 
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        addUser: {
            type: UserType,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) }, 
                position: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    position: args.position,
                });

                return user.save();
            }
        },

        addDevice: {
            type: DeviceType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                model: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let device = new Device({
                    name: args.name,
                    model: args.model,
                    userId: args.userId,
                });

                return device.save();
            }
        },
        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})