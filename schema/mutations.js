const { GraphQLObjectType, GraphQLID, GraphQLDirective, GraphQLString, GraphQLInt } = require('graphql');
const { ProjectType, UserType } = require('./types');
const {db} = require('../pgAdaptor');


const rootMutation = new GraphQLObjectType({
    name : "RootMutationType",
    type : "Mutation",
    fields : {
        addUser: {
            type: UserType,
            args:{id:{type:GraphQLID},username:{type:GraphQLString},email:{type:GraphQLString}},
            resolve (parentValue,args) {
                const query = `insert into users (id,username,email) values($1,$2,$3) returning username`;
                const value = [args.id, args.username, args.email];

                return db.one(query,value);
            }
        }
    }
})

exports.mutation = rootMutation;