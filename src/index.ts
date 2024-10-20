// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import shieldedSchema from "@graphql/schema";
import { auth } from "@middlewares/auth";
import typeormConfig from "./typeorm.config";

async function startServer() {
  const SqlConnection = await typeormConfig.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  //origin daha sonra url olacak
  const corsOptions = {
    origin: true,
    credentials: true,
  };
  const server = new ApolloServer({
    schema: shieldedSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    cors(corsOptions),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let token: any;
        if (req?.headers?.authorization) {
          token = await auth(req.headers.authorization, "");
        } else if (req.headers.cookie) {
          token = await auth("", req.headers.cookie);
        }
        //console.log(req?.headers.cookie);
        return {
          user: {
            id: token?.id,
            userName: token?.userName,
            email: token?.email,
            role: token?.role,
            company: token?.company,
            companyId: token?.companyId,
            createdAt: token?.createdAt,
            updatedAt: token?.createdAt,
          },
          req,
          res,
          SqlConnection,
        };
      },
    })
  );

  await new Promise<void>((resolve, reject) => {
    httpServer.listen(2000, (err?: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
  console.log(`🚀 Server ready at http://localhost:2000`);
}
startServer();
