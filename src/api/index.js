import { Router } from "express";
import users from "./routes/users";
import codices from "./routes/codices";

export default () => {
  const router = Router();

  users(router);
  codices(router);

  return router;
};
