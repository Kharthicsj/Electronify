import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function BannerCarousel() {
    const [bannerImages, setBannerImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    async function getBanners() {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-banners`
            );
            // Filter only non-mobile banners
            const desktopBanners = result.data.result.filter(
                (img) => img.device.toLowerCase() !== "mobile"
            );
            setBannerImages(desktopBanners);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getBanners();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [bannerImages]);

    return (
        <div className="relative w-full aspect-[16/9] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl">
            {bannerImages.map((slide, index) => (
                <img
                    key={slide._id}
                    src={slide.image}
                    alt={slide.name}
                    className={`${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    } absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out`}
                />
            ))}

            {/* Navigation Buttons */}
            {bannerImages.length > 1 && (
                <>
                    <button
                        onClick={() =>
                            setCurrentSlide(
                                (prev) =>
                                    (prev - 1 + bannerImages.length) %
                                    bannerImages.length
                            )
                        }
                        className="absolute cursor-pointer top-1/2 left-4 transform -translate-y-1/2 bg-black hover:bg-white rounded-full p-2 shadow-lg transition"
                    >
                        <AiOutlineLeft className="text-xl text-white hover:text-black" />
                    </button>

                    <button
                        onClick={() =>
                            setCurrentSlide(
                                (prev) => (prev + 1) % bannerImages.length
                            )
                        }
                        className="absolute cursor-pointer top-1/2 right-4 transform -translate-y-1/2 bg-black hover:bg-white rounded-full p-2 shadow-lg transition"
                    >
                        <AiOutlineRight className="text-xl text-white hover:text-black" />
                    </button>
                </>
            )}
        </div>
    );
}

export default BannerCarousel;
