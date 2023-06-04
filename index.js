const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloGateway, IntrospectAndCompose } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'accounts', url: 'http://localhost:8080/query' },
      { name: 'products', url: 'http://localhost:8082/query' },
      // ...additional subgraphs...
    ],
  }),
});


// Pass the ApolloGateway to the ApolloServer constructor

const server = new ApolloServer({
  gateway,
});


// Note the top-level `await`!
//default port 4000
async function startApolloServer() {
    const { url } = await startStandaloneServer(server);
    console.log(`🚀  Server ready at ${url}`);
}

startApolloServer();