import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 64,
    required: true,
  },
  codices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Codex" }],
});

class UserClass {
  async compare(password) {
    return compare(password, this.password);
  }
}

userSchema.loadClass(UserClass);
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashed = await hash(this.password, 10);
    this.password = hashed;
  }
});

export const User = mongoose.model("User", userSchema);
