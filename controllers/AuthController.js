import { use } from "bcrypt/promises.js";
import prisma from "../DB/db.config.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcrypt";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      console.log("Request Body:", req.body);
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (findUser) {
        return res.status(400).json({
          message: "email is alrady use try another email",
        });
      }

      const user = await prisma.users.create({
        data: payload,
      });
      return res.json({
        status: 200,
        message: "user Create successfully",
        user,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "something went wrong plz try again",
        });
      }
    }
  }
  // login
  static async login(req, res) {
    try {
      const body = req.body;
      console.log("Request Body:", req.body);
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      // email chake
      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });

      // password chake
      if (findUser) {
        if (!bcrypt.compareSync(payload.password, findUser.password)) {
          return res.status(400).json({ message: "invalide credentials" });
        }
        return res.json({ message: "logged in" });
      }

      return res.status(400).json({ message: "no user found this email" });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "something went wrong plz try again",
        });
      }
    }
  }
}

export default AuthController;
