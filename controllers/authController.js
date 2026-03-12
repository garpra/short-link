const bcrypt = require("bcrypt");
const userService = require("../services/userService");

async function signup(req, res) {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  userService.createUser(name, email, hashedPassword);
  res.redirect("/login");
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = userService.findUserByEmail(email);

  if (!user) {
    return res.status(401).json({
      message: "Incorrect email or password",
    });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({
      message: "Incorrect email or password",
    });
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  res.json({
    message: "Login success",
  });
}

function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({
      message: "Logout success",
    });
  });
}

function getUserStatus(req, res) {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.json({
      loggedIn: false,
    });
  }
}

module.exports = {
  signup,
  login,
  logout,
  getUserStatus,
};
