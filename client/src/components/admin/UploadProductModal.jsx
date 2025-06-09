import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import InputBox from "../../components/inputTypes/InputBox";
import DropDown from "../../components/inputTypes/DropDown";
import ImageInput from "../../components/inputTypes/ImageInput";
import TextArea from "../../components/inputTypes/TextArea";
import AuthSubmitButton from "../../components/buttons/AuthSubmitButton";
import axios from "axios";
import toast from "react-hot-toast";

function UploadProductModal({
    open,
    onClose,
    fetchAllProducts,
    productData,
    mode,
}) {
    const [formData, setFormData] = useState({
        _id: "",
        name: "",
        category: "",
        brand: "",
        description: "",
        price: "",
        sellingPrice: "",
        quantity: "",
        images: [],
    });

    useEffect(() => {
        if (productData && mode === "edit") {
            setFormData({
                _id: productData._id || "",
                name: productData.name || "",
                category: productData.category || "",
                brand: productData.brand || "",
                description: productData.description || "",
                price: productData.price || "",
                sellingPrice: productData.sellingPrice || "",
                quantity: productData.quantity || "",
                images: productData.images || [],
            });
        } else {
            setFormData({
                _id: "",
                name: "",
                category: "",
                brand: "",
                description: "",
                price: "",
                sellingPrice: "",
                quantity: "",
                images: [],
            });
        }
    }, [productData, mode]);

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (imageData) => {
        if (typeof imageData === "string") {
            setFormData((prev) => ({ ...prev, images: [imageData] }));
        } else if (Array.isArray(imageData) && imageData.length > 0) {
            setFormData((prev) => ({ ...prev, images: imageData }));
        } else {
            setFormData((prev) => ({ ...prev, images: [] }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            if (mode === "edit" && productData?._id) {
                const result = await axios.post(
                    `${import.meta.env.VITE_API_URL}/update-product`,
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

                fetchAllProducts();
                onClose();
                onClose();
            } else {
                const result = await axios.post(
                    `${import.meta.env.VITE_API_URL}/add-product`,
                    formData,
                    {
                        headers: { Authorization: `Bearer ${token}` },
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
            }

            fetchAllProducts();
            onClose();
        } catch (error) {
            console.error("Failed to submit product", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-transparent bg-opacity-30">
            <div
                className={`bg-white w-full max-w-md h-full transform transition-transform duration-500 shadow-xl ${
                    open ? "translate-x-0" : "translate-x-full"
                } flex flex-col`}
            >
                <div className="flex justify-end p-4 flex-shrink-0">
                    <button onClick={onClose}>
                        <IoClose className="text-2xl hover:text-red-600 cursor-pointer" />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-grow">
                    <h1 className="text-center border-b-2 p-2 font-semibold text-xl mb-10">
                        {mode === "edit" ? "Edit Product" : "Upload Product"}
                    </h1>

                    <div className="flex flex-col items-center gap-6">
                        {mode === "edit" ? (
                            <InputBox
                                type="text"
                                placeholder="Product id"
                                name="_id"
                                value={formData._id}
                                onChange={handleInputChange}
                                isDisabled={true}
                            />
                        ) : (
                            <></>
                        )}
                        <InputBox
                            type="name"
                            placeholder="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <DropDown
                            value={formData.category}
                            label="Category"
                            options={[
                                "Airdopes",
                                "Camera",
                                "Earphone",
                                "Mobile",
                                "Mouse",
                                "Printer",
                                "Processor",
                                "Refrigerator",
                                "Speaker",
                                "Trimmer",
                                "TV",
                                "Watch",
                            ]}
                            onSelect={(val) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category: val,
                                }))
                            }
                        />
                        <InputBox
                            type="name"
                            placeholder="Brand"
                            value={formData.brand}
                            name="brand"
                            onChange={handleInputChange}
                        />
                        {mode === "edit" ? (
                            <h1>
                                Can't edit image, delete and add a new product
                            </h1>
                        ) : (
                            <ImageInput
                                label="Product Image"
                                multiple={true}
                                preview={true}
                                onUpload={handleImageUpload}
                            />
                        )}

                        <InputBox
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        <InputBox
                            type="number"
                            placeholder="Selling Price"
                            name="sellingPrice"
                            value={formData.sellingPrice}
                            onChange={handleInputChange}
                        />
                        <InputBox
                            type="number"
                            placeholder="Quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                        <TextArea
                            type="text"
                            placeholder="Product Description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
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

export default UploadProductModal;
