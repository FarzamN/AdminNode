import asyncHandler from "express-async-handler";
import { compare, hash } from "bcrypt";
import { randomInt } from "crypto";
import { catchErr } from "../configuration/config.js";
import { User } from "../model/index.js";

/*
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(200).json({
        status: 400,
        message: `${!email ? "email" : "password"} is required to Login`,
      });
    } else if (!user) {
      return res.status(200).json({
        status: 400,
        message: "Your email is invalid",
      });
    } else {
      const checkPass = await User.findOne({ password });
      // const checkPass = await compare(password, user.password);
      if (!checkPass) {
        return res.status(200).json({
          status: 400,
          message: "Your Password is invalid",
        });
      } else {
        return res.status(200).json({
          data: user,
          status: 200,
          message: "Login successful",
        });
      }
    }
  } catch (error) {
    return res
      .status(200)
      .json({ error, status: 500, message: catchErr("login", "auth") });
  }
});
 */

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: `${!email ? "Email" : "Password"} is required to login`,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        status: 400,
        message: "Your email is invalid",
      });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(200).json({
        status: 400,
        message: "Your password is invalid",
      });
    }

    return res.status(200).json({
      data: user,
      status: 200,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("login", "auth"),
    });
  }
});

/*
export const register = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return res.status(200).json({
      status: 400,
      message: `${
        !userName ? "Name" : !email ? "Email" : "Password"
      } is required to register`,
    });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({
        status: 400,
        message: "Your email is already registered",
      });
    }
    const hashedPassword = await hash(password, 10);
    const data = await User.create({
      email,
      userName,
      password: hashedPassword,
    });
    return res.status(200).json({
      data,
      status: 200,
      message: "Registration successful",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("register", "auth"),
    });
  }
});
 */

export const register = asyncHandler(async (req, res) => {
  const { userName, email, password, phone } = req.body;
  try {
    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });

    if (!userName || !email || !password || !phone) {
      return res.status(200).json({
        status: 400,
        message: `${
          !userName
            ? "userName"
            : !email
            ? "email"
            : !password
            ? "password"
            : !phone
            ? "phone"
            : ""
        } is required`,
      });
    } else if (emailExist || phoneExist) {
      return res.status(200).json({
        status: 400,
        message: `This ${emailExist ? "Email" : "Phone Number"} already exists`,
      });
    } else {
      const hashedPassword = await hash(password, 10);
      const data = await User.create({
        userName,
        email,
        phone,
        password: hashedPassword,
      });
      return res.status(200).json({
        status: 200,
        message: "User registered successfully",
        data,
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("register", "auth"),
    });
  }
});


export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userName, email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    if (userName) {
      user.userName = userName;
    }
    if (email) {
      const emailExist = await User.findOne({ email });
      if (emailExist && emailExist._id.toString() !== id) {
        return res.status(400).json({
          status: 400,
          message: "This email is already registered",
        });
      }
      user.email = email;
    }
    if (oldPassword && newPassword) {
      const isOldPasswordValid = await compare(oldPassword, user.password);
      if (!isOldPasswordValid) {
        return res.status(400).json({
          status: 400,
          message: "Old password is incorrect",
        });
      }
      user.password = await hash(newPassword, 10);
    }

    await user.save();

    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      error,
      status: 500,
      message: catchErr("update", "auth"),
    });
  }
});