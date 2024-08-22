import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./postgres/postgres.js";
import categoryRoute from "./view/categoryRoute.js";
import productRoute from "./view/productRoute.js";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to the database
connectDB();

// Routes
app.use("/categories", categoryRoute);
app.use("/products", productRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
