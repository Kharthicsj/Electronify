import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

function BannerDisplayer(props) {
    const [loading, setLoading] = useState(false);

    async function deleteBanner(bannerId, imageURL) {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/delete-banner`,
                {
                    bannerId: String(bannerId),
                    imageUrl: String(imageURL),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(result.data.message, {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });

            props.getAllBannerImages();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete banner", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {loading === true ? (
                <div>
                    <p>Loading...</p>
                </div>
            ) : (
                <div className="w-full overflow-hidden">
                    {props.banners && props.banners.length > 0 ? (
                        props.banners.map((banner, index) => (
                            <div key={index} className="mb-6 relative group">
                                {/* Image */}
                                <img
                                    src={banner.image}
                                    alt={banner.name || `Banner ${index + 1}`}
                                    className="w-full max-h-[800px] object-cover rounded-lg shadow-md"
                                    style={{ aspectRatio: "18 / 8" }} // 1800x800 ratio
                                />
                                {/* Bin Icon - show on hover */}
                                <button
                                    className="absolute cursor-pointer top-2 right-2 group-hover:flex items-center justify-center bg-white text-red-500 hover:text-white hover:bg-red-600 p-2 rounded-full shadow-md transition"
                                    onClick={() =>
                                        deleteBanner(banner._id, banner.image)
                                    }
                                >
                                    <FaTrashAlt />
                                </button>
                                {/* Name */}
                                <p className="mt-2 text-center text-gray-700 font-semibold">
                                    {banner.name} - {banner.device}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 py-10">
                            No banners to display
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BannerDisplayer;
