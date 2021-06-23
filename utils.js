const bcrypt = require("bcrypt");
const users = require("./db.json")

const validateEmail = ({ body: { email } }, res, next) => {
  /(\W|^)[\w.+\-]*@2U|cyberxsecurity.onmicrosoft\.com(\W|$)/gi.test(email)
    ? next()
    : res.status(400).json({
        message:
          "Invalid email. Must be 2U or cyberxsecurity.onmicrosoft format.",
      });
};

const validateLogin = async ({ body: { email, password } }, res, next) => {
  try {
    const exists = users.filter((item) => item.email === email);
    console.log(``````);
    console.log(exists);
    console.log(``````);
    if (exists) {
    }
    next();
  } catch (error) {}
};

module.exports = { validateEmail, validateLogin, users };
