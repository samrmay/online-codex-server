import express, { response } from "express";
import { createSession, deleteSession } from "../../services/session";

const route = express.Router();

export default (router) => {
  router.use("/sessions", route);

  route.get("/", async (req, res) => {
    return res.status(200).send(req.session.user);
  });

  route.post("/", async (req, res) => {
    const response = await createSession(req.body);

    if (response.userId) {
      req.session.user = { id: response.userId };
      return res.status(response.status).send(req.session.user);
    }
    return res.status(response.status).send(response.error);
  });

  route.delete("/", async (req, res) => {
    const response = await deleteSession(req.session);

    if (response.user) {
      return res.status(response.status).send(response.user);
    }
    return res.status(response.status).send(response.error);
  });
};
