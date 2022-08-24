import SortData from "./sortData.js";
import axiosGetRequest from "./axiosGet.js";
import { ProductModel, NotHaveModel } from "./mongo.js";
import { vintage, teddy, rework } from "./links.js";

export async function sendProducts() {
  await ProductModel.deleteMany();
  await NotHaveModel.deleteMany();

  vintage.forEach((e) => {
    axiosGetRequest(e).then((res) => {
      const out = SortData(res, "Vintage");
      ProductModel.insertMany(out, { ordered: false })
        .then(() => console.log("Vintage Added"))
        .catch((err) => console.log(err));
    });
  });

  teddy.forEach((e) => {
    axiosGetRequest(e).then((res) => {
      const out = SortData(res, "Teddys");
      ProductModel.insertMany(out, { ordered: false })
        .then(() => console.log("Teddy Added"))
        .catch((err) => console.log(err));
    });
  });

  rework.forEach((e) => {
    axiosGetRequest(e).then((res) => {
      const out = SortData(res, "Rework");
      ProductModel.insertMany(out, { ordered: false })
        .then(() => console.log("Rework Added"))
        .catch((err) => console.log(err));
    });
  });
}

export async function sendCollection(model, category) {
  await model.deleteMany();

  const data = await ProductModel.find({
    code: { $ne: "Uncategorized" },
    category: category,
  }).sort({ code: 1 });

  await model
    .insertMany(data, { ordered: false })
    .then(() => console.log("Success"))
    .catch((err) => console.log(err));
}

export async function getProducts(model, page) {
  const data = await model
    .find()
    .limit(30)
    .skip(30 * (page - 1));

  return data;
}

export async function getUncategorized(page) {
  const data = await ProductModel.find({ code: "Uncategorized" })
    .limit(30)
    .skip(30 * (page - 1));

  return data;
}

export async function getNotHave(page) {
  const data = await NotHaveModel.find()
    .limit(30)
    .skip(30 * (page - 1));

  return data;
}

export async function deleteProduct(model, id) {
  const out = await model.deleteOne({ product_id: id });
  return out;
}
