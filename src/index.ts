// npm install @apollo/server express graphql cors cookie-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser"; // Cookie parser
import shieldedSchema from "@graphql/schema";
import { auth } from "@middlewares/auth";
import typeormConfig from "./typeorm.config";

async function startServer() {
  const SqlConnection = await typeormConfig.initialize();

  const app = express();
  const httpServer = http.createServer(app);

  // CORS ayarları
  const corsOptions = {
    origin: true, // Daha sonra belirli URL ile değiştirin
    credentials: true,
  };

  // ApolloServer oluşturma
  const server = new ApolloServer({
    schema: shieldedSchema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Middleware ekleme
  app.use(cors(corsOptions)); // CORS
  app.use(express.json()); // JSON işleme
  app.use(cookieParser()); // Cookie parsing

  app.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        console.log(req?.cookies, "req.cookies");
        console.log(req?.headers?.cookie, "headers");
        let token = null;
        if (req?.cookies) {
          token = await auth("", req?.cookies);
        }

        return {
          user: token
            ? {
                id: token?.id,
                userName: token?.userName,
                email: token?.email,
                role: token?.role,
                companyId: token?.companyId,
                companyName: token?.companyName,
                createdAt: token?.createdAt,
                updatedAt: token?.createdAt,
              }
            : null,
          req,
          res,
          SqlConnection,
        };
      },
    })
  );

  // Sunucuyu başlat
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
