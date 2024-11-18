const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use((req, res, next) => {
  User.findById("6737c09c8c5a1d2ce909ef18") //guaranteed to find the user here and user retrieved is sequelized which contains functions like save,destroy etc..
    .then((user) => {
      // full mongoose model
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNoteFound);

//after connecting db starting server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Db");

    //creating a user
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Sridhar",
          email: "abc@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
