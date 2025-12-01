import { getAllProducts } from "../models/product.model.js";

const getProducts = async (req, res, next) => {
  console.log("getProducts");

  try {
    const data = await getAllProducts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export { getProducts };
