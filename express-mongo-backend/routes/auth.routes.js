const authController = require("express").Router();

// User model
const User           = require("../models/user");

// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

authController.post("/signup", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;

  if (username === "" || userPassword === "") {
    res.send({ errorMessage: "Please provide both, username and password." });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).send({ errorMessage: "The username already exists, please pick another one." });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const password = bcrypt.hashSync(userPassword, salt);

    User
      .create({username, password})
      .then((user) => res.status(200).send(user))
      .catch(err => console.log(err));
  });
});

// authController.get("/login", (req, res) => res.render("auth/login"));

authController.post("/login", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;

  if (username === "" || userPassword === "") {
    // res.status({ errorMessage: "Provide both, username and password to login." });
    return;
  }

  User.findOne({ username }, "_id username password", (err, user) => {
    if (err || !user) {
      res.render("auth/login", { errorMessage: "The username doesn't exist." });
    } else {
      if (bcrypt.compareSync(userPassword, user.password)) {
        req.session.currentUser = user;
        res.status(200).send(user)
      } else {
        res.status(500).send({ errorMessage: "Incorrect password." });
      }
    }
  });
});

authController.get("/logout", (req, res, next) => {
  if (!req.session.currentUser) { 
    res.status(200).send();
    return; 
  }

  req.session.destroy( err => {
    if (err) { 
      console.log(err); 
    } else { 
      res.status(200).send();
    }
  });
});

module.exports = authController;
