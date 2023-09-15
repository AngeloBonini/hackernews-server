const { ApolloServer } = require ('apollo-server');

const typeDefs = require("./schema");



let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]

const resolvers = {
    Query:{
        info:()=> "my hackernews clone",
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) =>{
            let idCount = links.length
            const newLink = {
            id: `link-${idCount++}`,
            url: args.url,
            description: args.description
            }
            links.push(newLink)
            return newLink
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
      }
}

const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({url}) => console.log(`server running on port ${url}`));