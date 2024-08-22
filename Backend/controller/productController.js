import multer from "multer";
import path from "path";
import Product from "../model/productModel.js";

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be uploaded
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage: storage });

// Define the controller functions

// Create a product with file upload handling
export const createProduct = [
  upload.single("photo"),
  async (req, res) => {
    try {
      const product = await Product.create({
        categoryid: req.body.categoryid || 2,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        photo: req.file ? req.file.path : null, // Store file path if available
        isactive: req.body.isactive,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

// Get all active products
export const getAllActiveProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { IsActive: true } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { categoryID, name, price, description, photo, isActive } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({
        CategoryID: categoryID,
        Name: name,
        Price: price,
        Description: description,
        Photo: photo,
        IsActive: isActive,
      });
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(200).send(`Product deleted with ID: ${id}`);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
