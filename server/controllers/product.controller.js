import { getAllProductsModel } from "../models/product.model.js";
import AppError from "../utils/AppError.js";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsModel();
    if (!products || products.length === 0) {
      return next(new AppError("No product found inthe database", 404));
    }
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getAllProducts };
