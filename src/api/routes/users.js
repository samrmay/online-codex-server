import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/user";

const route = express.Router();

export default (router) => {
  router.use("/users", route);

  route.get("/:userId", async (req, res) => {
    const response = await getUser({ _id: req.params.userId });
    if (response.user) {
      return res.status(response.status).send(response.user);
    }
    return res.status(response.status).send(response.error);
  });

  route.post("/", async (req, res) => {
    const response = await createUser(req.body);
    if (response.user) {
      return res.status(response.status).send(response.user);
    }
    return res.status(response.status).send(response.error);
  });

  route.put("/:userId", async (req, res) => {
    const response = await updateUser(req.params.userId, req.body);
    if (response.user) {
      return res.status(200).send(response.user);
    }
    return res.status(response.status).send(response.error);
  });

  route.delete("/:userId", async (req, res) => {
    const response = await deleteUser(req.params.userId);
    if (response.user) {
      return res.status(response.status).send(response.user);
    }
    return res.status(response.status).send(response.error);
  });
};
