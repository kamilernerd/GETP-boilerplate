import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import schema from './src/graphql/schema';

(async () => {
  const app = express();

  const buildEnv = process.env.BUILD_ENV;
  dotenv.config({ path: buildEnv === 'dev' ? '.env' : `.env.${buildEnv}` })
    .parsed;

  const enablePlayground: boolean = !!process.env.PLAYGROUND;

  console.info('Environment:', buildEnv);
  console.info('Enable playground:', enablePlayground);

  const apolloServer = new ApolloServer({
    schema,
    playground: enablePlayground,
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({ app, path: '/', cors: false });

  app.listen(3001, () => {
    console.info('::Server started at port 3001');
  });
})();
