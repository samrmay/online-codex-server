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
  entries: [
    {
      name: { type: String, required: true },
      dataArr: [
        {
          name: { type: String, required: true },
          dataType: { type: String, required: true },
          data: {},
        },
      ],
    },
  ],
  defaultEntryStructure: {
    type: [String],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
});

export const Codex = mongoose.model("Codex", codexSchema);
