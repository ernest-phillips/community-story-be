const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const { User } = require("./user.model");

const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  street_name: { type: String },
  city: { type: String },
  zip: { type: Number },
  square_feet: { type: Number },
  img_url: [
    {
      type: String,
    },
  ],
  user: {
    type: ObjectID,
    ref: "User",
  },
});

const Home = mongoose.model("Home", HomeSchema);

module.exports = { Home };
