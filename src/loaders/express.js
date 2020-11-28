import express from "express";
import connectStore from "connect-mongo";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import session from "express-session";
import routes from "../api";

export default (app) => {
  app.use(
    cors({
      origin: [
        "http://localhost:8080",
        "https://online-codex-client.herokuapp.com",
      ],
      credentials: true,
    })
  );

  const MongoStore = connectStore(session);
  app.use(
    session({
      cookie: {
        sameSite: "none",
        httpOnly: true,
        maxAge: Number(process.env.SESSION_TTL),
        secure: process.env.NODE_ENV === "production",
      },
      resave: false,
      name: process.env.SESSION_NAME,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "sessions",
        ttl: process.env.SESSION_TTL,
      }),
    })
  );

  app.use(express.json());
  app.use(helmet());
  app.use("/api", routes());
};
