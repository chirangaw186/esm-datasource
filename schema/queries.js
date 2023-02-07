
const { GraphQLObjectType, GraphQLID, GraphQLList } = require('graphql');
const { ProjectType, UserType } = require('./types');
const {db} = require('../pgAdaptor');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const rootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    type : "Query",
    fields : {
        projectsByID : {
            type : ProjectType,

            args : {
                id: {type : GraphQLID }
            },
            resolve(parentValue, args) {
                const query = `select * from project where id=$1`;
                const value = [args.id];

                return db.one(query,value)
                    .then(res => res)
                    .catch(err => err)
            }
        },

        projects: {
            type : new GraphQLList(ProjectType),
            resolve(parentValue, args) {
                return prisma.project.findMany({});
            }
        },

        users : {
            type : new GraphQLList(UserType),
            resolve(parentValue, args) {
                return prisma.users.findMany({});
            }
        }


    }
});

exports.query = rootQuery;

