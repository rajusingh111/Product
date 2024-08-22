import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductTable from "./ProductTable ";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    photo: "",
    categoryID: "",
    isActive: true,
  });
  const [categories, setCategories] = useState([]);
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    axios
      .get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const addProduct = async () => {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.post(
        "http://localhost:5000/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts([...products, response.data]);
      setFormData({
        name: "",
        price: "",
        description: "",
        photo: "",
        categoryID: "",
        isActive: true,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      isActive: !formData.isActive,
    });
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      photo: product.photo,
      categoryID: product.categoryid,
      isActive: product.isactive,
    });
    setEditProductId(product.productid);
  };

  const handleUpdate = async () => {
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await axios.put(
        `http://localhost:5000/products/${editProductId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts(
        products.map((p) =>
          p.productid === response.data.productid ? response.data : p
        )
      );
      setFormData({
        name: "",
        price: "",
        description: "",
        photo: "",
        categoryID: "",
        isActive: true,
      });
      setEditProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter((p) => p.productid !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <select
          name="categoryID"
          onChange={handleChange}
          value={formData.categoryID}
          className="border p-2 mr-2">
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.CategoryID} value={category.CategoryID}>
              {category.Name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 mr-2"
        />
        <label className="mr-2">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={handleCheckboxChange}
            className="mr-1"
          />
          Active
        </label>
        <button
          onClick={editProductId ? handleUpdate : addProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          {editProductId ? "Update Product" : "Add Product"}
        </button>
      </div>
      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.productid} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
