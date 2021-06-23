const bcrypt = require("bcrypt");
const users = require("./db.json");
const msg = (err, msg, res) => {
  return res.status(400).json({ message: `${err}: ${msg} ` });
};
const validateRegister = ({ body: { email, password, name } }, res, next) => {
  try {
    // If Email Already Exists
    if (
      users.some((item) => item.email.toLowerCase() === email.toLowerCase())
    ) {
      return msg("Email Already Exists", "Please login, or use another email.", res)
    }
    // If Email is of Registered Domains
    if (
      !/(\W|^)[\w.+\-]*@\b2U\b|\bcyberxsecurity.onmicrosoft\b\.com(\W|$)/gi.test(
        email
      )
    ) {
      return  msg( "Email Not of Valid Format", "Must be 2U or cybersecurity.onmicrosoft registered email.", res)}
    if (password.length <= 6) {
      msg(
        "Password is not of sufficient length",
        "Password must be at least 6 characters or more.", res
      );
    }
    if (!name) {
      msg("Must have name present", "Please enter a valid name.", res);
    }
    next();
  } catch ({message}) {
    msg("System Error", message.message)
  }
};

const validateLogin = async ({ body: { email, password } }, res, next) => {
  try {
    const [exists] = users.filter(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );
    var validate = await bcrypt.compare(password, exists["password"])
    if (!exists) {
      return msg("Invalid Email", "Email is not registered in the database", res);
    }
    if(!validate){msg("Invalid Password", "Password is incorrect", res)}
    next();
  } catch ({message}) {
    msg("Invalid Email", "Email is not registered in the database", res);
  }
};

module.exports = { validateRegister, validateLogin };
