import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

function ImageInput({ label, onUpload, multiple = true, preview = false }) {
    const fileRef = useRef(null);
    const [previewImages, setPreviewImages] = useState([]);

    const handleFiles = async (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const fileList = Array.from(files).filter((file) =>
            file.type.startsWith("image/")
        );

        const base64List = await Promise.all(
            fileList.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            })
        );

        const updatedList = multiple
            ? [...previewImages, ...base64List]
            : [base64List[0]];

        setPreviewImages(updatedList);
        onUpload(multiple ? updatedList : base64List[0]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles({ target: { files: e.dataTransfer.files } });
    };

    const removeImage = (index) => {
        const updatedImages = [...previewImages];
        updatedImages.splice(index, 1);
        setPreviewImages(updatedImages);
        onUpload(multiple ? updatedImages : "");
    };

    return (
        <div className="w-xs max-w-md">
            {label && <label className="block mb-2 text-xl font-semibold">{label}:</label>}

            {/* Main Drop Area */}
            <div
                onClick={() => fileRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="w-full h-48 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-md cursor-pointer hover:border-black bg-gray-50 relative bg-cover bg-center"
                style={{
                    backgroundImage: preview && previewImages[0] ? `url(${previewImages[0]})` : 'none',
                }}
            >
                {!preview || previewImages.length === 0 ? (
                    <div className="text-center text-gray-600">
                        <FiUploadCloud className="mx-auto text-3xl mb-2" />
                        <p className="font-medium">Drag & drop or click to upload image</p>
                    </div>
                ) : (
                    <button
                        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            removeImage(0);
                        }}
                    >
                        <IoClose className="text-white text-lg" />
                    </button>
                )}
                <input
                    type="file"
                    accept="image/*"
                    multiple={multiple}
                    ref={fileRef}
                    onChange={handleFiles}
                    className="hidden"
                />
            </div>

            {/* Extra Images Section */}
            {preview && previewImages.length > 1 && (
                <div className="mt-4 flex gap-4 overflow-x-auto">
                    {previewImages.slice(1).map((img, index) => (
                        <div key={index} className="relative w-24 h-24 flex-shrink-0">
                            <img
                                src={img}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover rounded-md"
                            />
                            <button
                                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-0.5 cursor-pointer"
                                onClick={() => removeImage(index + 1)}
                            >
                                <IoClose size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImageInput;
