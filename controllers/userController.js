import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
//handle error
const handlerror = (err) => {
  let errors = { email: "", password: "" };
  console.log(err.message);
  if (err.code === 11000) {
    errors.email = "that email is already exist";
    return errors;
  }
  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }
  if (err.message === "incorrect password") {
    errors.password = "password is incorrect";
  }
  // console.log(err.errors.email.properties.path);
  // console.log(err.message.includes("User validation failed"));
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "net ninja", {
    expiresIn: maxAge,
  });
};

const LoginGet = (req, res) => {
  res.render("login");
};

const HomePage = (req, res) => {
  res.render("home");
};

const SignUpGet = (req, res) => {
  res.render("index");
};
const SignUpPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      expiresIn: maxAge * 1000,
    });
    console.log();
    res.status(201).json({ user: user._id });
  } catch (err) {
    const error = handlerror(err);

    res.status(400).json({ error });
  }
};
const LoginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      expiresIn: maxAge * 1000,
    });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handlerror(err);
    res.status(400).json({ errors });
  }
};

const Logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/");
};

export { LoginGet, SignUpGet, SignUpPost, LoginPost, HomePage, Logout };
