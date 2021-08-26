const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "productos", required: true },
  id: { type: Number, required: true },
  timestamp: { type: Date, required: true }
});

const carritoMongo = mongoose.model("carrito", schema);

module.exports = carritoMongo;
