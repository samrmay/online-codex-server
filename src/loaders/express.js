import express from "express";
import cors from "cors";
import routes from "../api";

export default (app) => {
  app.use(
    cors({
      origin: "http://localhost:8080",
      credentials: true,
    })
  );

  app.use(express.json());
  app.use("/api", routes());
};
