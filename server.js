// on the server side, we have no build process so we cannot use the ES6 import
// instead we use "require" in order to use functionality that is not defined in this file

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT           = "https://dashboard.heroku.com/apps/patricks-boilerplate";
const session        = require("express-session");
const MongoStore     = require("connect-mongo")(session);
const logger         = require("morgan");
const cookieParser   = require('cookie-parser');

// the data structure to save an asset is defined in /express-mongo-backend/asset.model.js


// we need cors because JavaScript could otherwise not make requests to other servers than the one that delivered the JavaScript 

app.use(cors());
app.use(logger("dev"));
//to parse the JSON string in the body of the post requests into JavaScript objects we use the bodyParser

app.use(bodyParser.json());
//we connect the mongoose object to the MongoDB database "assets" that will store and deliver our asset data

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assets' || "mongodb://heroku_xf8z0cjt:aonls412odsvfd0e8hlumpu2j7@ds137008.mlab.com:37008/heroku_xf8z0cjt", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use(session({
    secret: "basic-auth-secret",
    cookie: { maxAge: 600000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    })
  }));
app.use(cookieParser());

//connect the rest endpoints to the express server

app.use('/assets', require('./routes/asset.routes'));
app.use('/', require('./routes/auth.routes'));
//start the server and make it listen and answer to requests to the defined port

app.listen(PORT, function () {
    console.log("Server should be running on Port: " + PORT);
});