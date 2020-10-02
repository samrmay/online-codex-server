import mongoose from "mongoose";

const codexSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isPrivate: {
    type: Boolean,
    required: true,
  },
  entries: [{ name: String, data: String }],
});

export const Codex = mongoose.model("Codex", codexSchema);
