import { json, request, response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Register from "../model/register";
import validation from "../middleware/validate_data";

export const add_user = async (req = request, res = response) => {
  const { email, password } = await req.body;

  // validasi data body
  const { error } = validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await new Register({
    email,
    password: hashPassword,
  });

  try {
    const data = await user.save({
      user: user,
    });

    res.status(201).json({
      success: true,
      data: {
        user: data,
      },
      message: "Register Success..",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// login
export const login_user = async (req = request, res = response) => {
  const { email, password, refresh_token } = await req.body;
  try {
    const findEmail = await Register.findOne({
      email: req.body.email,
    });

    // if field is empty
    if (!email || !password) {
      return res.json({
        message: "All field must filled",
      });
    }

    if (!findEmail) {
      return res.status(404).json({
        message: "Email Not Found",
      });
    }
    // compare password from client and in database
    const comPass = await bcrypt.compare(req.body.password, findEmail.password);
    if (!comPass) {
      return res.status(401).json({
        message: "Wrong Password",
      });
    }

    // make a token from jwt
    const token = jwt.sign(
      {
        _id: req.params.id,
        email: email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN, {
      expiresIn: "300s",
    });

    //   await Register.updateOne({
    //     refresh_token : refreshToken
    // })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure : true // jika menggunakan https
    });
    res.status(200).json({
      message: "Login Berhasil",
      email: findEmail.email,
      token: token,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// read data
export const read_data = async (req = request, res = response) => {
  try {
    const data = await Register.find();

    res.status(200).json({
      success: true,
      data: {
        user: data,
      },
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
