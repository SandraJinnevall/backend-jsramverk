const { GraphQLObjectType, GraphQLList } = require('graphql');
const User = require("../../models/User");
const mongoose = require('mongoose') 
const { DB } = require('../../db/database')
const AllUsersType = require("./allUsers.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        allUsers: {
          type: new GraphQLList(AllUsersType),
          resolve: () => {
            return new Promise((resolve, reject) => {
                mongoose.connect(DB, { useNewUrlParser: true })
                User.find((err, data) => {
                if (err) reject(err)
                else resolve(data)
              })
            })
          }
        }
      })
});


// const RootQueryType = new GraphQLObjectType({
//     name: 'Query',
//     description: 'Root Query',
//     fields: () => ({
//         allUsers: {
//             type: new GraphQLList(AllUsersType),
//             description: 'List of all users',
//             resolve: async function() {
//             //     try {
//             //         await mongoose.connect(DB, { useNewUrlParser: true })
//             //         const allUsers = await User.find({}, { name: 1, _id: 1 })
//             //         return allUsers
//             //     } catch (e) {
//             //         console.log(e);
//             //     } finally {
//             //         mongoose.connection.close()
//             //     }
//             // }
//         }
//     })
// });


module.exports = RootQueryType;