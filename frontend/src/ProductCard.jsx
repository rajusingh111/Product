const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow-lg">
      <img
        src={product.photo}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
