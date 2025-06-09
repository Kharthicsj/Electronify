import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import InputBox from "../../components/inputTypes/InputBox";
import DropDown from "../../components/inputTypes/DropDown";
import ImageInput from "../../components/inputTypes/ImageInput";
import AuthSubmitButton from "../../components/buttons/AuthSubmitButton";
import axios from "axios";
import toast from "react-hot-toast";
import BannerDisplayer from "../../components/admin/BannerDisplayer";

function UploadBannerModal({ open, onClose, getAllBannerImages }) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        device: "",
        image: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (imageData) => {
        if (typeof imageData === "string") {
            setFormData((prev) => ({ ...prev, image: imageData }));
        } else if (Array.isArray(imageData) && imageData.length > 0) {
            setFormData((prev) => ({ ...prev, image: imageData[0] }));
        } else {
            setFormData((prev) => ({ ...prev, image: "" }));
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/upload-banner`,
                formData,
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
            getAllBannerImages();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-transparent bg-opacity-30">
            <div
                className={`bg-white w-full max-w-md h-full transform transition-transform duration-500 shadow-xl ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={onClose}>
                        <IoClose className="text-2xl hover:text-red-600 cursor-pointer" />
                    </button>
                </div>
                <div className="p-4">
                    <h1 className="text-center border-b-2 p-2 font-semibold text-xl mb-10">
                        Upload Banner
                    </h1>

                    <div className="flex flex-col items-center gap-6">
                        <InputBox
                            type="text"
                            placeholder="Banner Name"
                            name="name"
                            onChange={handleInputChange}
                        />

                        <DropDown
                            value={formData.device}
                            label="Device Type"
                            options={["Mobiles", "Tabs and Computers"]}
                            onSelect={(val) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    device: val,
                                }))
                            }
                        />

                        <ImageInput
                            label="Banner Image"
                            onUpload={handleImageUpload}
                            multiple={false}
                            preview={true}
                        />

                        <AuthSubmitButton
                            name={loading === true ? "Loading..." : "Submit"}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadBannerModal;
