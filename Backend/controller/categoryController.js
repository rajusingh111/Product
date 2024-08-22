import Category from "../model/CategoryModel.js";

export const createCategory = async (req, res) => {
  const { name, isActive } = req.body;
  try {
    const category = await Category.create({ Name: name, IsActive: isActive });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
