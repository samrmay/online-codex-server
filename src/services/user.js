import { User } from "../models/user.model";

export const getUser = async (userBody) => {
  const user = await User.findOne(userBody).select("-password");

  if (user) {
    return { user, error: null, status: 200 };
  }
  return { user: null, error: "User not found", status: 404 };
};

export const createUser = async (userBody) => {
  const user = new User(userBody).select("-password");
  await user.save();

  if (user) {
    return { user, error: null, status: 201 };
  }
  return { user: null, error: "User not created", status: 409 };
};

export const updateUser = async (userId, userBody) => {
  const user = await User.findByIdAndUpdate(userId, userBody, {
    new: true,
  }).select("-password");

  if (user) {
    return { user, error: null, status: 200 };
  }
  return { user: null, error: "User not modified", status: 404 };
};

export const deleteUser = async (userId) => {
  const user = await (await User.findByIdAndDelete(userId)).isSelected(
    "-password"
  );

  if (user) {
    return { user, error: null, status: 200 };
  }
  return { user: null, error: "User not deleted", status: 404 };
};
