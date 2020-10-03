import { User } from "../models/user.model";

export const getUser = async (userBody) => {
  let user = await User.findOne(userBody)
    .select("-password -__v")
    .populate({ path: "codices", select: "name" });

  let error = null;
  let status = 200;
  if (!user) {
    error = "User not found";
    status = 404;
    return { user, error, status };
  }

  return { user, error, status };
};

export const createUser = async (userBody) => {
  const user = new User(userBody);
  await user.save();

  let error = null;
  let status = 201;
  if (!user) {
    error = "User not created";
    status = 409;
  }
  return { user, error, status };
};

export const updateUser = async (userId, userBody) => {
  const user = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  }).select("-password");

  let error = null;
  let status = 200;
  if (!user) {
    error = "User not modified";
    status = 404;
  }
  return { user, error, status };
};

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId).select("-password");

  let error = null;
  let status = 200;
  if (!user) {
    error = "User not deleted";
    status = 404;
  }
  return { user, error, status };
};

export const addCodices = async (userId, codexArr) => {
  const user = await User.findById(userId);
  if (!user) {
    return { user, error: "User not found", status: 404 };
  }

  const newCodices = user.codices.concat(codexArr);
  user.codices = newCodices;
  user.save();

  return { user, error: null, status: 200 };
};

export const removeCodex = async (userId, codexId) => {
  const user = await User.findById(userId);
  if (!user) {
    return { user, error: "User not found", status: 404 };
  }

  if (user.codices.includes(codexId)) {
    const index = user.codices.indexOf(codexId);
    user.codices.splice(index, 1);
    user.save();
    return { user, error: null, status: 200 };
  }

  return { user, error: "Codex not found in user list", status: 404 };
};
