import UserModel from "../models/User.Model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponses.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ====================== REGISTER ======================
export const register = async (req, res, next) => {
  try {
    const {
      firstName = "",
      lastName = "",
      email,
      password,
      role = "user",
    } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, "Email and password are required"));
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, "User already exists with this email"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const token = signToken(newUser);

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { user: userResponse, token },
          "User registered successfully"
        )
      );
  } catch (err) {
    next(err);
  }
};

// ====================== LOGIN ======================
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, "Email and password are required"));
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new ApiError(401, "Invalid email or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError(401, "Invalid email or password"));
    }

    const token = signToken(user);

    const userResponse = user.toObject();
    delete userResponse.password;

    res
      .status(200)
      .json(
        new ApiResponse(200, { user: userResponse, token }, "Login successful")
      );
  } catch (err) {
    next(err);
  }
};

// ====================== GET ME ======================
export const getMe = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res.status(200).json(new ApiResponse(200, user, "Fetched logged-in user"));
  } catch (err) {
    next(err);
  }
};

// ====================== GET USERS ======================
export const getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find().select("-password");
    res
      .status(200)
      .json(new ApiResponse(200, users, "Fetched all users successfully"));
  } catch (err) {
    next(err);
  }
};

// ====================== GET USER BY ID ======================
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return next(new ApiError(404, "User not found"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, user, "Fetched user successfully"));
  } catch (err) {
    next(err);
  }
};
