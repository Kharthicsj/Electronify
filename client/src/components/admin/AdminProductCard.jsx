function AdminProductCard(props) {
    const { product, onEdit, onDelete } = props;

    return (
        <div className="relative bg-white text-black rounded-lg shadow-lg overflow-hidden max-w-sm mx-auto border border-gray-700 hover:shadow-xl transition-shadow duration-300">
            {/* Ribbon */}
            {product.quantity === 0 && (
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-br-md z-10">
                    Out of Stock
                </div>
            )}

            {/* Product Image */}
            <div className="h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Product Details */}
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">
                    {product.name}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg font-bold text-black">
                        USD {product.sellingPrice.toLocaleString()}
                    </span>
                    {product.sellingPrice &&
                        product.sellingPrice !== product.price && (
                            <span className="text-gray-400 line-through text-sm">
                                USD {product.price.toLocaleString()}
                            </span>
                        )}
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => onEdit(product)}
                        className="flex-1 cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 font-semibold"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(product)}
                        className="flex-1 cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-300 font-semibold"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminProductCard;
