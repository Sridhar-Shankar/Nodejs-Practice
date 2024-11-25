const path = require("path");
const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const cookieParser = require("cookie-parser");

const session = require("express-session");
const MongodDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();

const app = express();

const store = new MongodDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// middleware
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
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
app.use(authRoutes);

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
