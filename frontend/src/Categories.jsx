// src/components/Categories.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const addCategory = () => {
    axios
      .post("http://localhost:5000/categories", { name, isActive })
      .then((response) => setCategories([...categories, response.data]))
      .catch((error) => console.error("Error adding category:", error));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Categories</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <label className="mr-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="mr-1"
          />
          Active
        </label>
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </div>
      <ul>
        {categories.map((category) => (
          <li key={category.CategoryID}>
            {category.Name} - {category.IsActive ? "Active" : "Inactive"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
