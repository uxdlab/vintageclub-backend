import mongoose from "mongoose";

// Database Connection
mongoose
  .connect(
    "mongodb+srv://vintageuxd:vintageuxdlab@vintageclub.jjbat.mongodb.net/VintageClub"
  )
  .then(() => {
    console.log("Database Connection Established");
  })
  .catch((err) => {
    console.log(err);
  });

// Database Schema
const dbSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    unique: true,
  },
  name: String,
  url: String,
  img: String,
  code: String,
  category: String,
});

// Database Model For Products Collection
export const ProductModel = mongoose.model("product", dbSchema);

// Database Model For Don't Have It
export const NotHaveModel = mongoose.model("nothave", dbSchema);

// Database Model For Vintage Collection
export const VintageModel = mongoose.model("vintage", dbSchema);

// Database Model For Vintage Collection
export const TeddyModel = mongoose.model("teddy", dbSchema);

// Database Model For Vintage Collection
export const ReworkModel = mongoose.model("rework", dbSchema);
