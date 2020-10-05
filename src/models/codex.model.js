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
          // "String", "Image", "ImageUrl"
          dataType: { type: String, required: true },
          // "Header", "Body", "Subheader"
          location: { type: String, required: true },
          data: {},
        },
      ],
    },
  ],
  defaultEntryStructure: [
    {
      name: { type: String, required: true },
      dataType: { type: String, required: true },
      location: { type: String, required: true },
    },
  ],
});

export const Codex = mongoose.model("Codex", codexSchema);
