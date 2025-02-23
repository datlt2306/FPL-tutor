import Joi from "joi";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
}).or("email", "username");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    // validate data
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({ message: errors });
    }
    // check user: username, email (unique)
    const user = await User.findOne({ $or: [{ email }, { username }] }); // ||
    if (user) {
      return res.status(400).json({ message: "tai khoan da ton tai" });
    }
    // ma hoa password
    const hashPassord = await bcrypt.hash(password, 10);
    console.log(hashPassord);

    // luu user
    const newUser = await User.create({
      username,
      email,
      password: hashPassord,
    });
    res.json({ ...newUser.toObject(), password: undefined });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    // validate data
    const { username, email, password } = req.body;
    // validate data
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({ message: errors });
    }
    // check user: username, email (unique)
    const user = await User.findOne({ $or: [{ email }, { username }] }); // ||
    if (!user) {
      return res.status(400).json({ message: "tai khoan khong ton tai" });
    }
    // so sanh password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "tai khoan khong ton tai" });
    }
    console.log({ isMatched });

    // token

    const token = jwt.sign({ id: user._id }, "hoadv21", {
      expiresIn: "1d",
    });
    console.log(token);

    // res
    res.json({ ...user.toObject(), password: undefined, token });
  } catch (error) {}
}

export { register, login };
