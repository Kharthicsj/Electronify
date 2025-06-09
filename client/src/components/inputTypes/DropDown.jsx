import { useState, useRef, useEffect } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

function DropDown({ label = "Select", options = [], onSelect, value }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-xs" ref={dropdownRef}>
            <label className="block mb-2 text-xl font-semibold">{label}:</label>
            <button
                onClick={() => setOpen(!open)}
                className="w-full bg-black cursor-pointer text-white px-4 py-3 rounded-md flex justify-between items-center shadow-sm hover:bg-gray-700 transition-all duration-200"
            >
                <span>{value || "Choose an option"}</span>
                <IoChevronDownSharp
                    className={`transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <ul className="absolute z-50 w-xs mt-2 bg-black text-white rounded-md border border-gray-700 shadow-lg max-h-60 overflow-y-auto">
                    {options.length === 0 ? (
                        <li className="px-4 py-2 text-sm text-gray-400">
                            No options
                        </li>
                    ) : (
                        options.map((option, idx) => (
                            <li
                                key={idx}
                                className={`px-4 py-2 hover:bg-gray-700 cursor-pointer transition`}
                                onClick={() => {
                                    onSelect(option);
                                    setOpen(false);
                                }}
                            >
                                {option}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}

export default DropDown;
