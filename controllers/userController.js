import User from "../models/userModel.js";

//handle error
const handlerror = (err) => {
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "that email is already exist";
    return errors;
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

const LoginGet = (req, res) => {
  res.send("welcome from login");
};

const SignUpGet = (req, res) => {
  res.send("welcome form signup get");
};
const SignUpPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    const error = handlerror(err);

    res.status(400).json({ error });
  }
};
const LoginPost = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.json(user);
  } else {
    res.send("something goes wrong");
  }
};

export { LoginGet, SignUpGet, SignUpPost, LoginPost };
