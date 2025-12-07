import { getAllProductsModel } from "../models/product.model.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsModel();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getAllProducts };
