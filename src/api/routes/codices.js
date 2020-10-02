import express from "express";
import {
  getCodex,
  createCodex,
  updateCodex,
  deleteCodex,
  addEntries,
} from "../../services/codex";

const route = express.Router();

export default (router) => {
  router.use("/codices", route);

  route.get("/:codexId", async (req, res) => {
    const response = await getCodex({ _id: req.params.codexId });

    if (response.codex) {
      return res.status(response.status).send(response.codex);
    }
    return res.status(response.status).send(response.error);
  });

  route.post("/", async (req, res) => {
    const response = await createCodex(req.body);

    if (response.codex) {
      return res.status(response.status).send(response.codex);
    }
    return res.status(response.status).send(response.error);
  });

  route.put("/:codexId", async (req, res) => {
    const response = await updateCodex(req.params.codexId, req.body);

    if (response.codex) {
      return res.status(response.status).send(response.codex);
    }
    return res.status(response.status).send(response.error);
  });

  route.put("/addEntries/:codexId", async (req, res) => {
    const entryArr = req.body.entryArr;
    const response = await addEntries(req.params.codexId, entryArr);

    if (response.codex) {
      return res.status(response.status).send(response.codex);
    }
    return res.status(response.status).send(response.error);
  });

  route.delete("/:codexId", async (req, res) => {
    const response = await deleteCodex(req.params.codexId);

    if (response.codex) {
      return res.status(response.status).send(response.codex);
    }
    return res.status(response.status).send(response.error);
  });
};
