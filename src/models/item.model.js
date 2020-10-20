const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const Schema = mongoose.Schema;

// consider simplifying names of object keys ie. instead of "itemLoc" use "location"
const ItemSchema = new Schema({
  desc: { type: String },
  price: { type: Number },
  img_url: { type: String },
  home: {
    type: ObjectID,
    ref: "Home",
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = { Item, ItemSchema };
