import { useEffect, useState } from "react";
import axios from "axios";
import BannerDisplayer from "../../components/admin/BannerDisplayer";
import UploadBannerModal from "../../components/admin/UploadBannerModal";


function Banner() {
    const [modalOpen, setModalOpen] = useState(false);
    const [banners, setBanners] = useState([]);

    function handleModalToggle() {
        setModalOpen((prev) => !prev);
    }

    async function getAllBannerImages() {
        try {
            const token = localStorage.getItem("token");
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-banners`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBanners(result.data.result);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllBannerImages();
    }, []);

    return (
        <div>
            <div className="px-4 py-6">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold font-sans">Banner</h1>
                    <button
                        type="button"
                        onClick={handleModalToggle}
                        className="text-white cursor-pointer bg-black text-center rounded-sm w-32 h-10 hover:bg-gray-800"
                    >
                        Upload Banner
                    </button>
                </div>

                <div className="mt-4 p-4">
                    <BannerDisplayer
                        banners={banners}
                        getAllBannerImages={getAllBannerImages}
                    />
                </div>

                {modalOpen && (
                    <UploadBannerModal
                        open={modalOpen}
                        onClose={handleModalToggle}
                        getAllBannerImages={getAllBannerImages}
                    />
                )}
            </div>
        </div>
    );
}

export default Banner;
