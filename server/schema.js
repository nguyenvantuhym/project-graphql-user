
const database =  require( './test.db' );


const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
  } = require('graphql');

const UserType = new GraphQLObjectType(
    {
        name:'User',
        fields: ()=>({
            _id: { type: GraphQLString },
            username: { type: GraphQLString },
            password: { type: GraphQLString },
            email: { type: GraphQLString },
            name: { type: GraphQLString },
            roles: { type: GraphQLString },
            author: { type: GraphQLString }
        })
    });

const query = new GraphQLObjectType({
    name:'userQueryType',
    fields:{
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args)
            {
                return database.getalluser();
            }
        },
        user: {
            type : UserType,
            args :{
                id: {
                    type : new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(root, param)
            {
                return database.getUserByID(param.id);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: function () {
        return {
            removeUser:{
                type: UserType,
                args: {
                    id: {
                        type : new GraphQLNonNull(GraphQLString)
                    }
                },resolve(root,param){
                    const res = database.deleteUserByid(param.id);
                    if (!res) {
                        throw new Error('Error')
                    }

                    return res;
                }
            },
            updateUser:{
                type: UserType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString) 
                    },
                    username:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    password:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    name:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    email:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    roles:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    author:{
                        type : new GraphQLNonNull(GraphQLString)
                    }

                },resolve(root,param){
                    const data = {
                        username: param.username,
                        password: param.password,
                        email: param.email,
                        name: param.name,
                        author: param.author,
                        roles: param.roles
                    };
                    //console.log(data);
                    const res = database.updateUser(param.id, data);
                    if (!res) {
                        throw new Error('Error')
                    }

                    return res;
                }
            },
            addUser:{
                type: UserType,
                args: {
                    username:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    password:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    name:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    email:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    roles:{
                        type : new GraphQLNonNull(GraphQLString)
                    },
                    author:{
                        type : new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root,param){
                    const data = {
                        username: param.username,
                        password: param.password,
                        email: param.email,
                        name: param.name,
                        author: param.author,
                        roles: param.roles
                    }
                    const res = database.addUser(data);
                    if (!res) {
                        throw new Error('Error')
                    }

                    return res;
                }
            }
        }
    }
})
module.exports = new GraphQLSchema({query:query,mutation:mutation});
