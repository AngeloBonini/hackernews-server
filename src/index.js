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
        },
        update:(parent, args) => {
          const linkIndex = links.findIndex(link => link.id == args.id)
            links[linkIndex].description = args.description;
            links[linkIndex].url = args.url;
            return links;
        },
        delete:(parent, args) => {
            const linkIndex = links.findIndex(args)
            const linkswithoutItem = links.splice(linkIndex,1);
        //    console.log
            links = linkswithoutItem
            return links
           
        },
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
      }
}

const server = new ApolloServer({ typeDefs, resolvers})

server.listen().then(({url}) => console.log(`server running on port ${url}`));