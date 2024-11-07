const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const errorController = require("./controllers/error");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// db.execute("SELECT * from products")
//   .then((result) => {
//     console.log(result[0]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//middleware
app.use((req, res, next) => {
  User.findByPk(1) //guaranteed to find the user here and user retrieved is sequelized which contains functions like save,destroy etc..
    .then((user) => {
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

//associations - here if we delete user delete(cascade) the product too
//one-to-many relationship
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

//another association
User.hasOne(Cart); // this is why we can use createCart method
Cart.belongsTo(User);
//many-to-many relationship
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });// optional 

//order associtation
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });//optional

//it syncs your models to the db and create tables
sequelize
  //force true nothing but to overwrite tables
    // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
