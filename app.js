import express from "express";
import cors from "cors";
import {
  NotHaveModel,
  VintageModel,
  TeddyModel,
  ReworkModel,
} from "./mongo.js";
import {
  sendProducts,
  sendCollection,
  getProducts,
  getUncategorized,
  getNotHave,
  deleteProduct,
} from "./dbFunctions.js";

const port = process.env.PORT || 5000;
const app = express();

// Express Middleware
app.use(cors());
app.use(express.json());

// Get Request to Check Server
app.get("/", (req, res) => {
  res.send("It's Working! 🔥🔥");
});

// Authentication Middleware For Sending Data
app.use("/send", (req, res, next) => {
  const { api_key } = req.query;
  if (api_key == "I6Je7qlJ0AS430h") next();
  else res.status(401).send({ message: "Unauthorized Access" });
});

// Authentication Middleware For Deleting Data
app.use("/delete", (req, res, next) => {
  const { api_key } = req.query;
  if (api_key == "5KxUQ9I09ApY2o5") next();
  else res.status(401).send({ message: "Unauthorized Access" });
});

// Save Products to DataBase
app.post("/send/products", (req, res) => {
  sendProducts()
    .then(() => res.send({ message: "Success" }))
    .catch((err) => console.log(err));
});

// Save Products to Collections
app.post("/send/collection/:category", async (req, res) => {
  const { category } = req.params;

  switch (category) {
    case "vintage":
      sendCollection(VintageModel, "Vintage")
        .then(() => res.send({ message: "Success" }))
        .catch((err) => console.log(err));

      break;

    case "teddy":
      sendCollection(TeddyModel, "Teddys")
        .then(() => res.send({ message: "Success" }))
        .catch((err) => console.log(err));

      break;

    case "rework":
      sendCollection(ReworkModel, "Rework")
        .then(() => res.send({ message: "Success" }))
        .catch((err) => console.log(err));

      break;

    case "goretro":
      res.send({ message: "Success" });

      break;

    default:
      res.status(404).send({ message: "No Route Found 😔" });
  }
});

// Request to Save Products to Don't Have It
app.post("/send/not-have", (req, res) => {
  const { product_id } = req.body;
  const { name } = req.body;
  const { img } = req.body;
  const { url } = req.body;
  const { code } = req.body;
  const { category } = req.body;

  const data = new NotHaveModel({
    product_id,
    name,
    img,
    url,
    code,
    category,
  });

  data
    .save()
    .then(() => res.send("Data Saved"))
    .catch((err) => console.log(err));
});

// Get Request to View Products
app.get("/view/products/:category/:page", async (req, res) => {
  const { category } = req.params;
  const { page } = req.params;

  switch (category) {
    case "vintage":
      getProducts(VintageModel, page)
        .then((response) => res.send(response))
        .catch((err) => console.log(err));

      break;

    case "teddy":
      getProducts(TeddyModel, page)
        .then((response) => res.send(response))
        .catch((err) => console.log(err));

      break;

    case "rework":
      getProducts(ReworkModel, page)
        .then((response) => res.send(response))
        .catch((err) => console.log(err));

      break;

    case "goretro":
      res.send([]);

      break;

    case "uncategorized":
      getUncategorized(page)
        .then((response) => res.send(response))
        .catch((err) => console.log(err));

      break;

    default:
      res.status(404).send({ message: "No Route Found 😔" });
  }
});

// Get Request to View Products by Category
app.get("/view/details/:category", async (req, res) => {
  const { category } = req.params;

  switch (category) {
    case "vintage":
      res.send(await VintageModel.find());
      break;

    case "teddy":
      res.send(await TeddyModel.find());
      break;

    case "rework":
      res.send(await ReworkModel.find());
      break;

    default:
      res.status(404).send({ message: "No Route Found 😔" });
  }
});

// Request to View Products From Don't Have It
app.get("/view/not-have/:page", async (req, res) => {
  const { page } = req.params;

  getNotHave(page)
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});

// Delete Got It From Table
app.delete("/delete/got-it/:category/:product_id", async (req, res) => {
  const { category } = req.params;
  const { product_id } = req.params;

  switch (category) {
    case "vintage":
      deleteProduct(VintageModel, product_id)
        .then((response) => res.send(response))
        .catch((err) => console.log(err));

      break;

    case "teddy":
      deleteProduct(TeddyModel, product_id)
        .then((response) => res.send(response))
        .catch((err) => console.log(err));

      break;

    case "rework":
      deleteProduct(ReworkModel, product_id)
        .then((response) => res.send(response))
        .catch((err) => console.log(err));

      break;

    case "goretro":
      res.send({ message: "Success" });

      break;

    default:
      res.status(404).send({ message: "No Route Found 😔" });
  }
});

// Request to Delete Products from Don't Have It
app.delete("/delete/not-have/:product_id", async (req, res) => {
  const { product_id } = req.params;

  const out = await NotHaveModel.deleteOne({ product_id });
  res.send(out);
});

// Authentication Middleware For Clearing Database
app.use("/clear", (req, res, next) => {
  const { api_key } = req.query;
  if (api_key == "iVN5aoD87RW5edk") next();
  else res.status(401).send({ message: "Unauthorized Access" });
});

// Request to clear database collections
app.delete("/clear/clear-database", async (req, res) => {
  const vin = await VintageModel.deleteMany({});
  const ted = await TeddyModel.deleteMany({});
  const rew = await ReworkModel.deleteMany({});
  const not = await NotHaveModel.deleteMany({});

  res.send({
    message: "Database Cleared Successfully",
    Vintage: vin,
    Teddy: ted,
    Rework: rew,
    NotHave: not,
  });
});

// App listening on port 5000 on localhost
app.listen(port, (req, res) => {
  console.log(`Active on http://localhost:${port}`);
});
