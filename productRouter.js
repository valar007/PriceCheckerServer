const express = require("express");
const bodyParser = require("body-parser");
const Product = require("./productSchema");
const { getMaxListeners } = require("./productSchema");

const productRouter = express.Router();

productRouter.use(bodyParser.json());

productRouter.route("/").get((req, res, next) => {
  Product.find({}, { name: 1, brand: 1, type: 1 }).then((products) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(products);
  });
});
productRouter.route("/:id").get((req, res, next) => {
  Product.findById(req.params.id, { pricehistory: 0, _id: 0 }).then((product) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.send(product);
  });
});
productRouter.route("/:id/history").get((req, res, next) => {
  Product.findById(req.params.id, { pricehistory: 1, _id: 0 }).then(
    (history) => {
      var historyRange = 0;
      var sendHistory = [];
      var vendors = ["pcstudio", "primeabgb", "mdcomputers","vedant"];
      vendors.forEach((vendor) => {
        var data = {};
        Object.keys(history.pricehistory).forEach((date) => {
          data[date] = history.pricehistory[date][vendor];
        });
        historyRange = Object.keys(data).length > historyRange ? Object.keys(data).length : historyRange;
        sendHistory.push({ name: vendor.toUpperCase(), data: data });
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send({history: sendHistory, range: historyRange})
    }
  );
});
productRouter.route("/").post((req, res, next) => {
  product = {};
  product["name"] = req.body.name;
  product.brand = req.body.brand;
  product.type = req.body.type;
  product.features = {
    cores: req.body.cores,
    threads: req.body.threads,
    socket: req.body.socket,
    base: req.body.base + "GHz",
    boost: req.body.boost + "GHz",
  };
  product.producturl = {
    pcstudio: req.body.pcstudio,
    primeabgb: req.body.primeabgb,
    mdcomputers: req.body.mdcomputers,
    vedant: req.body.vedant,
  };
  Product.find({ name: product.name }).then((existingProduct) => {
    if (existingProduct.length !== 0) {
      res.statusCode = 200;
      res.send("Product already exists");
    } else {
      if (product !== null) {
        Product.create(product).then((createNewProduct) => {
          res.send(createNewProduct);
        });
      }
    }
  });
});
productRouter.route("/search/:searchtem").get((req, res, next) => {
  Product.find(
    { name: { $regex: req.params.searchtem, $options: "i" } },
    { name: 1, brand: 1, type: 1, id: 1, features: 1 }
  ).then((products) => {
    if (products.length === 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send("No products found!");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.send(products);
    }
  });
});

module.exports = productRouter;
