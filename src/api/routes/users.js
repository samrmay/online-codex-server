import express from "express";
import User from "../../models/user.model";

const route = express.Router();

export default (router) => {
  router.use("/users", route);

  route.get("/", async (req, res) => {
    console.log("get request made to /users");
    return res.status(200).send("get request successful");
  });
};
