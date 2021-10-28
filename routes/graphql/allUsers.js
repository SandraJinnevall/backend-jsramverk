const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const AllUsersType = new GraphQLObjectType({
    name: 'AllUsers',
    description: 'This represents all users by name and _id',
    fields: function () {
        return {
          _id: {
            type: GraphQLString
          },
          name: {
              type: GraphQLString
            }
        }
      }
});

module.exports = AllUsersType;




