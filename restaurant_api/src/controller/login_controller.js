import { json, request, response } from "express";
import Login from "../models/login_model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { schema } from "../middleware/login_validation";
import validate_user from "../middleware/login_validation";

env.config();
// register new user
export const register = async (req = request, res = response) => {
  // validasi data body
  const { error } = validate_user(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = await req.body;

  // hash password
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const data = await new Login({
    email,
    password: hashPassword,
  });

  try {
    const user = await data.save();
    res.status(200).json({
      success: true,
      message: "user success register",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// login
export const login = async (req = request, res = response) => {
  try {
    // validasi data body
    const { error } = validate_user(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = await req.body;
    const checkEmail = await Login.findOne({
      email: req.body.email,
    });

    // jika tidak di isi
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All field must filled",
      });
    }

    // cek jika email ada di database
    if (!checkEmail) {
      return res.status(404).json({
        success: false,
        message: "Email Not Found",
      });
    }
    // cek password
    const compare_password = await bcrypt.compare(checkEmail, password);
    if (!compare_password) {
      return res.status(401).json({
        success: false,
        message: "Wrong Password!",
      });
    }

    // token
    const token = await jwt.sign(
      {
        email: email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "10s",
      }
    );

    res.status(200).json({
      success: true,
      data: {
        token: token,
        message: "Login Success",
        username: checkEmail.email,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

// read data
export const read_data_users = async (req = request, res = response) => {
  try {
    const data = await Login.find();

    res.status(200).json({
      success: true,
      data: {
        user: data,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// delete user
export const removeuser = async (req = request, res = response) => {
  try {
    const data = await Login.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Delete User Success",
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
