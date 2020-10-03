import { Codex } from "../models/codex.model";
import { addCodices, removeCodex } from "./user";

export const getCodex = async (codexBody) => {
  const codex = await Codex.findOne(codexBody).populate("entries");

  let error = null;
  let status = 200;
  if (!codex) {
    error = "Codex could not be found";
    status = 404;
  }
  return { codex, error, status };
};

export const createCodex = async (codexBody) => {
  const codex = new Codex(codexBody);
  codex.save();

  let error = null;
  let status = 201;
  if (!codex) {
    error = "Codex could not be created";
    status = 409;
  } else {
    const response = await addCodices(codex.owner, [codex._id]);
    if (response.error) {
      error = response.error;
      status = response.status;
    }
  }
  return { codex, error, status };
};

export const updateCodex = async (codexId, codexBody) => {
  const codex = await Codex.findByIdAndUpdate(codexId, codexBody, {
    new: true,
  });

  let error = null;
  let status = 200;
  if (!codex) {
    error = "Codex could not be modified";
    status = 404;
  }
  return { codex, error, status };
};

export const deleteCodex = async (codexId) => {
  const codex = await Codex.findByIdAndDelete(codexId);

  let error = null;
  let status = 200;
  if (!codex) {
    error = "Codex could not be deleted";
    status = 404;
  } else {
    const response = await removeCodex(codex.owner, codex._id);
    if (response.error) {
      error = response.error;
      status = response.status;
    }
  }
  return { codex, error, status };
};

export const addEntries = async (codexId, entryArr) => {
  const codex = await Codex.findById(codexId);
  if (!codex) {
    return { codex, error: "Codex not found", status: 404 };
  }

  codex.entries = codex.entries.concat(entryArr);
  codex.save();

  return { codex, error: null, status: 200 };
};
