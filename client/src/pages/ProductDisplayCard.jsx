import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import axios from "axios";

function ProductDisplayCard() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  async function getProduct() {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/fetch-product`,
        { params: { productId } }
      );
      setProductData(result.data.productData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productData.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === productData.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 bg-transparent z-50 flex justify-center items-center px-4 sm:px-6 py-10 overflow-y-auto">
      <div className="relative bg-white rounded-lg max-w-6xl w-full p-6 shadow-lg flex flex-col md:flex-row md:gap-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 text-2xl text-gray-600 hover:text-red-600 cursor-pointer z-50"
        >
          <IoClose />
        </button>

        {loading ? (
          <div className="p-10 text-center text-lg w-full">Loading...</div>
        ) : (
          <>
            {/* LEFT: Product Image Carousel */}
            <div className="relative w-full md:w-1/2 h-[350px] sm:h-[450px] md:h-[550px] bg-white rounded-md overflow-hidden pt-8 pr-4 flex items-center justify-center">
              {productData?.images?.length > 0 && (
                <img
                  src={productData.images[currentImageIndex]}
                  alt={productData.name}
                  className="max-w-full max-h-full object-contain"
                />
              )}
              {productData?.images?.length > 1 && (
                <>
                  <button
                    className="absolute cursor-pointer top-1/2 left-2 -translate-y-1/2 bg-black p-2 rounded-full hover:bg-gray-900"
                    onClick={handlePrev}
                  >
                    <AiOutlineLeft className="text-lg text-white" />
                  </button>
                  <button
                    className="absolute cursor-pointer top-1/2 right-2 -translate-y-1/2 bg-black p-2 rounded-full hover:bg-gray-900"
                    onClick={handleNext}
                  >
                    <AiOutlineRight className="text-lg text-white" />
                  </button>
                </>
              )}
            </div>

            {/* RIGHT: Product Information */}
            <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-800">
              <div>
                <h1 className="text-4xl font-extrabold text-black leading-tight">
                  {productData.name}
                </h1>
                <p className="text-lg mt-1 text-gray-500 capitalize">
                  Brand: {productData.brand}
                </p>
                <p className="text-md text-gray-600 capitalize">
                  Category: {productData.category}
                </p>
              </div>

              <div className="text-2xl font-semibold text-gray-800 flex gap-4 items-baseline">
                <span className="line-through text-gray-400 text-xl">
                  ${productData.price}
                </span>
                <span className="text-green-600">${productData.sellingPrice}</span>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-black mb-1">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {productData.description}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDisplayCard;
