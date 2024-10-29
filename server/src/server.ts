import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './schema/resolvers.js';
import typeDefs from './schema/typeDefs.js';
import { authenticateToken } from './services/auth.js';

const app: any = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);





// Apply JWT authentication middleware for /graphql route
// app.use('/graphql', authenticateToken); 

// Apollo Server setup
const apolloServer = new ApolloServer({
  typeDefs,   // Your GraphQL schema definitions
  resolvers,  // Your GraphQL resolvers
  context: ({ req }) => {
    const authHeader = authenticateToken(req);
    // Access the authenticated user from the middleware (if exists)
    let user = null; 
    if (authHeader?.user){
      user = authHeader.user;
    }
    return { user };  // Pass user to context for resolvers
  },

});



async function startApolloServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  db.once('open', () => {
      app.listen(PORT, () => {
          console.log(`API server running on port ${PORT}!`);
          console.log(`Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`);
      });
  });
  
}
startApolloServer();