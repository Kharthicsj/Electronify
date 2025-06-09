import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Context from "../context";
import toast from "react-hot-toast";

function AddressInput({ onClose, onSave, initialData = null }) {
    const { fetchUser } = useContext(Context);

    const [formData, setFormData] = useState({
        addressId: initialData?._id || "",
        name: initialData?.name || "",
        addressLine: initialData?.addressLine || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        pincode: initialData?.pincode || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = formData.addressId
                ? `${import.meta.env.VITE_API_URL}/update-address`
                : `${import.meta.env.VITE_API_URL}/add-address`;

            const payload = { ...formData };

            const res = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            fetchUser();
            onSave(res.data.data);
            onClose();

            toast.success(res.data.message, {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        } catch (err) {
            toast.error("Error while updating address", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black cursor-pointer"
                >
                    <IoClose size={24} />
                </button>

                <h2 className="text-xl font-semibold mb-4">
                    {formData.addressId ? "Edit Address" : "Add New Address"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="addressLine"
                        placeholder="Address Line"
                        value={formData.addressLine}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 cursor-pointer"
                    >
                        {loading ? "Saving..." : "Save Address"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddressInput;
