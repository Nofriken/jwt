import { request, response } from "express";
import env from "dotenv";
import jwt, { verify } from "jsonwebtoken";
//
// memverifikasi token
// export const user_mdw = async (req = request, res = response, next) => {
//   try {
//     const authorization = await req.headers.authorization;
//     if (!authorization) {
//       return res.json({
//         message: "Unauthorized",
//       });
//     }

//     const token = await authorization.split(" ")[1];
//     // validasi token
//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

//     if (!verifyToken) {
//       return res.status(401).json({
//         success: false,
//         message: "token unauthorized",
//       });
//     }

//     next();
//   } catch (error) {
//     res.json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// validasi token
export const validate_token = (req = request, res = response, next) => {
  try {
    const authorization = req.headers.authorization;
    /**
     * bentuk authorization
     * Bearer fgnjfgnjnjnfjncdjfj dfjd
     */

    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized",
        error: authorization,
      });
    }
    const token = authorization.split(" ")[1];

    // validasi token
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifyToken) {
      return res.status(401).json({
        message: "Token not verify",
      });
    }

    // generate  req body
    req.body.email = verify.email;

    next();
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
