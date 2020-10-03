import { User } from "../models/user.model";

export const createSession = async (sessionBody) => {
  const { email, password } = sessionBody;
  const user = await User.findOne({ email });
  if (!user) {
    return {
      userId: null,
      error: "User with that email not found",
      status: 404,
    };
  }

  const validPassword = await user.compare(password);
  if (!validPassword) {
    return { userId: null, error: "Invalid password", status: 401 };
  }

  return { userId: user._id, error: null, status: 201 };
};

export const deleteSession = (session) => {
  const { user } = session;
  session.destroy();

  let error = null;
  let status = 200;
  if (!user) {
    error = "No active session found";
    status = 404;
  }
  return { user, error, status };
};
