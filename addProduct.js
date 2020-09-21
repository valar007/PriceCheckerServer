var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser")
var cors = require("cors")
var Product = require('./productSchema');
var productRouter = require('./productRouter');

const url = "mongodb://localhost:27017/pricechecker";
const connect = mongoose.connect(url,{useUnifiedTopology: true, useNewUrlParser: true})

var app = express()
var product = {}
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
// app.post("/add",(req,res)=> {
//     product['name'] = req.body.name
//     product.brand   = req.body.brand
//     product.type = req.body.type
//     product.features = {
//         'cores': req.body.cores,
//         'threads': req.body.threads,
//         'socket': req.body.socket,
//         'base': req.body.base + 'GHz',
//         'boost': req.body.boost + 'GHz',
//     };
//     product.producturl = {
//         'pcstudio': req.body.pcstudio,
//         'primeabgb': req.body.primeabgb,
//         'mdcomputers': req.body.mdcomputers,
//         'vedant': req.body.vedant
//     };
//     console.log(product)

//     res.send("OK");
// });
app.use("/",productRouter)
app.listen(4000, "192.168.0.247")