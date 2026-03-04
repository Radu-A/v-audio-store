import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import AppError from "./utils/AppError.js";
import globalErrorHandler from "./middlewares/error.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("¡PERN server is working with ES Modules! 🚀");
});

app.use("/api/products", productRoutes);
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

// Launch
app.listen(PORT, () => {
  console.log(`\nServer listening on http://localhost:${PORT}`);
});
