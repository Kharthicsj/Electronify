import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const started = sessionStorage.getItem("paypalFlowStarted");
    if (!started) {
      navigate("/", { replace: true });
    } else {
      sessionStorage.removeItem("paypalFlowStarted");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 to-blue-500 p-6">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md text-center">
        <FaCheckCircle className="mx-auto text-green-500 text-7xl mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold mb-3 text-gray-900 flex justify-center items-center gap-3">
          Order Successful <GiPartyPopper className="text-yellow-400 animate-bounce" />
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase! Your order has been processed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-600 transition text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
