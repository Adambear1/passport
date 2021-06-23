const express = require("express");
const path = require("path");
const users = require("./db.json") || []
const app = express();
const fs = require("fs")
const bcrypt = require("bcrypt");
const { validateRegister, validateLogin } = require("./utils");

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});
app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
});
app.post("/success", validateLogin, (req, res) => {
  res.redirect("success");
});

app.post("/register", validateRegister, async ({ body }, res) => {
  const user = new Object();
  try {
    const { name, email, password } = body;
    const hPass = await bcrypt.hash(password, 10);
    user.time = Date.now().toString();
    user.name = name;
    user.email = email;
    user.password = hPass;
    fs.writeFileSync("db.json", JSON.stringify([...users, user]), "utf-8", ()=>{})
    return res.redirect("/");
  } catch ({ message }) {
    return res.status(400).json({ message });
  } finally {
    console.log("User Added", user);
  }
});
app.listen(3000);
