require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const app = express();
const products = require("./routes/products");
const users = require("./routes/users");
const carts = require("./routes/cart");
const { authMiddleWare } = require("./auth/auth");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/carts", authMiddleWare, carts);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Oh now we're cooking ");
    const port = process.env.PORT || 5000;
    app.listen(port, console.log(`The app is up and runing in ${port} ...`));
  } catch (error) {
    console.log(error);
  }
};

if (process.env.MONGO_URI == "mongodb+srv://<username>:<password>@nodeexpress.2thfl.mongodb.net/STORE-MANAGER-DB?retryWrites=true&w=majority")
  console.log("\n You need to setup the username and paswword in the MONGO_URI in Dockerfile\n");
else start();
