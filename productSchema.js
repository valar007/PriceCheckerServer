var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    features: {
        cores: String,
        threads: String,
        socket: String,
        base: String,
        boost: String
    },
    producturl: {
        pcstudio: {
            type: String,
            required: true
        },
        primeabgb: {
            type: String,
            required: true
        },
        mdcomputers: {
            type: String,
            required: true
        },
        vedant: {
            type: String,
            required: true
        },
    },
    currentprice: {
        type: Object
    },
    pricehistory: {
        type: Object
    }
})

var Product = mongoose.model("Product",productSchema);

module.exports = Product