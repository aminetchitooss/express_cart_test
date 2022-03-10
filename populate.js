require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/Product");

const jsonProdcuts = require("./products.json");

const addProdcuts = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("populating...");
    await Product.deleteMany({});
    await Product.create(jsonProdcuts);
    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

addProdcuts();
