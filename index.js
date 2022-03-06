const path = require("path");
const express = require("express");
const sequelize = require("./database");
const methodOverride = require("method-override");
const usersRouter = require("./Routes/users");

sequelize.sync({ force: true }).then(() => console.log("db is ready"));

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

app.get("/", async (req, res) => {
  res.render("index", { title: "Welcome" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening in ${port} .....`));
