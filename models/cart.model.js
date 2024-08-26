const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater")

mongoose.plugin(slug)

const cartSchema = new mongoose.Schema(
  {
    user_id: String,
    products: [
      {
        
      }
    ]
  }, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Cart = mongoose.model('Cart', cartSchema, "catrts");

module.exports = Cart;