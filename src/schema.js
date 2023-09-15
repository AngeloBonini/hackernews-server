const { gql } = require("apollo-server");

const typeDefs = gql`
type Query {
    info: String!
    feed: [Link!]!
}
type Mutation {
    post(description:String!, url: String!): Link!
}
type Link {
    id: ID!
    description: String!
    url: String!
}`

module.exports = typeDefs;