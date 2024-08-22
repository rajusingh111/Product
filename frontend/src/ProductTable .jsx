import React from "react";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-200 mb-4">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Name</th>
          <th className="border border-gray-300 p-2">Price</th>
          <th className="border border-gray-300 p-2">Description</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.productid}>
            <td className="border border-gray-300 p-2">{product.name}</td>
            <td className="border border-gray-300 p-2">${product.price}</td>
            <td className="border border-gray-300 p-2">
              {product.description}
            </td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onEdit(product)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                Edit
              </button>
              <button
                onClick={() => onDelete(product.productid)}
                className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
