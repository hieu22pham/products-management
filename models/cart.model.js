const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater")

mongoose.plugin(slug)

const cartSchema = new mongoose.Schema(
  {
    _id: String,
    products: [
      {
        product_id: String,
        quantity: Number
      }
    ]
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Cart = mongoose.model('Cart', cartSchema, "carts");

module.exports = Cart;