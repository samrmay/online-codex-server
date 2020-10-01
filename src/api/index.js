import { Router } from "express";
import users from "./routes/users";

export default () => {
  const router = Router();

  users(router);

  return router;
};
