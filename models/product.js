// const fs = require("fs");
// const path = require("path");

const db = require("../utils/database");

const Cart = require("../models/cart");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

//helper
// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       return cb([]);
//     }
//     return cb(JSON.parse(fileContent));
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // getProductsFromFile((products) => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       (prod) => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     products.push(this); //WILL APPEND ANOTHER PRODUCT
    //     fs.writeFile(p, JSON.stringify(products), (err) => {
    //       console.log(err);
    //     });
    //   }
    // });

    //sql
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description)  VALUES (?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {
    // getProductsFromFile((products) => {
    //   const product = products.find((prod) => prod.id === id);
    //   const updatedProducts = products.filter((prod) => prod.id !== id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //     if (!err) {
    //       Cart.deleteProduct(id, product.price);
    //     }
    //   });
    // });
  }

  static fetchAll() {
    // getProductsFromFile(cb);

    //sql
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    // getProductsFromFile((products) => {
    //   const product = products.find((p) => p.id === id);
    //   cb(product);
    // });

    //sql
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
