const { ApolloServer } = require ('apollo-server');


const typeDefs =`
type Query{
    info: String!
}
`
const resolvers = {
    Query:{
        info:()=> "{ I'm alive and serving content}"
    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => console.log(`server running on port ${url}`));