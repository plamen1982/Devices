const graphql = require('graphql');
const Device = require('../models/device');
const Author = require('../models/author');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,  
    GraphQLID, 
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const DeviceType = new GraphQLObjectType({
    name: 'Device',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        Devices: {
            type: new GraphQLList(DeviceType),
            resolve(parent, args) {
                return Device.find({ authorId: parent.id });
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

        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                return Author.findById(args.id);
            }
        },

        devices: { 
            type: new GraphQLList(DeviceType),
            resolve(parent, args) {

                return Device.find({});
            } 
        },

        authors: { 
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {

                return Author.find({});
            } 
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: new GraphQLNonNull(GraphQLString) }, 
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                });

                return author.save();
            }
        },

        addDevice: {
            type: DeviceType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let device = new Device({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
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