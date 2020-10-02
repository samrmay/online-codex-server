import { Router } from "express";
import codices from "./routes/codices";
import sessions from "./routes/sessions";
import users from "./routes/users";

export default () => {
  const router = Router();

  codices(router);
  sessions(router);
  users(router);

  return router;
};
