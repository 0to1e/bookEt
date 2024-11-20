import { User } from "../models/userModel.js";
export async function initializeAuthentication(request, response) {
  const { user_name, password } = request.body;

  try {
    const user = await User.findOne({
      $or: [{ user_name }, { email: user_name }],
    });

    if (user) {
      const isValidLogin = await user.comparePassword(password);

      if (isValidLogin) {
        user.password = undefined;
        await user.generateJWTToken(user);
        return response.status(200).json({ message: "Login Successful" });
      }
      return response.status(401).json({ message: "Invalid password" });
    }
    return response.status(404).json({ message: "Invalid username/email" });
  } catch (error) {
    console.error(`Internal Server Error: ${error.message}`);
    return response
      .status(500)
      .json({ message: "Login Error.", error: error.message });
  }
}

export async function initializeRegistration(request, response) {
  const { fullname, user_name, email, password } = request.body;

  try {
    const user = User.create({ fullname, user_name, email, password });
    (await user).password = undefined;
    await user.generateJWTToken(user);
    return response.status(200).json({ message: "Registration Successful." });
  } catch (error) {
    console.error(`Internal Server Error: ${error.message}`);

    return response
      .status(500)
      .json({ message: "Registration Error.", error: error.message });
  }
}

export async function checkExistingUserCredentials(request, response) {
  const { user_name, email } = request.body;

  try {
    const existingUsers = await User.find({ $or: [{ email }, { user_name }] });

    const credentialsConflicts = { email: false, user_name: false };
    if (existingUsers.length > 0) {
      existingUsers.forEach((user) => {
        if (user.email === email) {
          credentialsConflicts.email = true;
        }
        if (user.user_name === user_name) {
          credentialsConflicts.user_name = true;
        }
        return res.status(409).json({
          message: "Error Creating User",
          emailTaken: credentialsConflicts.email,
          user_nameTaken: credentialsConflicts.user_name,
        });
      });
    }
    return res(200).json({ message: "Unique registration credentials" });
  } catch (error) {
    return res.status(500).json({
      message: "Unique Credentials Validation Error",
      error: error.message,
    });
  }
}
