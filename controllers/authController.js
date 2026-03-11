const bcrypt = require("bcrypt");
const userService = require("../services/userService");

async function signup(req, res) {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    userService.createUser(name, email, hashedPassword);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        message: "Email atau password salah",
      });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.json({
      message: "Login berhasil",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({
      message: "Logout berhasil",
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
