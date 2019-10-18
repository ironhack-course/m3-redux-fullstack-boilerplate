const authController = require("express").Router();

// User model
const User           = require("../models/user");

// BCrypt to encrypt passwords
<<<<<<< HEAD
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
=======
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;



authController.post("/signup", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const userPassword = req.body.password;


  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      console.log("User with username exists already:"+username);
      res.status(200).json({ 'errormessage': 'this user already exists' });
>>>>>>> a2718c9
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const password = bcrypt.hashSync(userPassword, salt);

<<<<<<< HEAD
    User
      .create({username, password})
      .then((user) => res.status(200).send(user))
=======
    const userPassworEncrypted = {username, password, firstname, lastname};
    console.log("User will be created:"+userPassworEncrypted);

    User
      .create(userPassworEncrypted)
      .then((user) => {
        res.status(200).json(user);
      })
>>>>>>> a2718c9
      .catch(err => console.log(err));
  });
});

<<<<<<< HEAD
// authController.get("/login", (req, res) => res.render("auth/login"));
=======
>>>>>>> a2718c9

authController.post("/login", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;

<<<<<<< HEAD
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
=======
  
  User.findOne({ username }, "_id username password", (err, user) => {
    if (err || !user) {
      // res.render("auth/login", { errorMessage: "The username doesn't exist." });
    } else {
      if (bcrypt.compareSync(userPassword, user.password)) {
        req.session.currentUser = user;
        // res.redirect("/");
      } else {
        // res.render("auth/login", { errorMessage: "Incorrect password." });
>>>>>>> a2718c9
      }
    }
  });
});

authController.get("/logout", (req, res, next) => {
  if (!req.session.currentUser) { 
<<<<<<< HEAD
    res.status(200).send();
=======
    // res.redirect("/login"); 
>>>>>>> a2718c9
    return; 
  }

  req.session.destroy( err => {
    if (err) { 
      console.log(err); 
    } else { 
<<<<<<< HEAD
      res.status(200).send();
=======
      // res.redirect("/login"); 
>>>>>>> a2718c9
    }
  });
});

module.exports = authController;
