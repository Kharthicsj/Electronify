import {
    IoChevronForwardSharp,
    IoChevronBackSharp,
    IoCloseSharp,
} from "react-icons/io5";
import { useState } from "react";

function FilterNav({
    categories = [],
    selectedCategories = [],
    sortOption = "",
    onCategoryChange,
    onSortChange,
}) {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((prev) => !prev);

    return (
        <>
            {!open && (
                <button
                    onClick={toggleOpen}
                    aria-label="Open Filters"
                    className="fixed right-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-l-md shadow-lg z-50 cursor-pointer"
                    style={{ width: "40px", height: "60px" }}
                >
                    <IoChevronBackSharp size={24} />
                </button>
            )}

            <div
                className={`fixed top-0 right-0 h-full bg-gray-100 text-black shadow-xl p-4 z-50 transform transition-transform duration-300 ease-in-out ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ width: "280px", maxWidth: "80vw" }}
            >
                <div className="flex justify-end p-3 border-b border-gray-300">
                    <button
                        onClick={toggleOpen}
                        aria-label="Close Filters"
                        className="text-black hover:text-gray-700 cursor-pointer"
                    >
                        <IoCloseSharp size={28} />
                    </button>
                </div>

                <div
                    className="p-4 overflow-y-auto"
                    style={{ maxHeight: "calc(100% - 60px)" }}
                >
                    <div className="mb-6">
                        <h3 className="font-bold text-center mb-4 text-xl border-b-2 p-3">
                            Filter by Category
                        </h3>
                        {categories.length === 0 ? (
                            <p className="text-gray-400 italic text-sm">
                                No categories yet
                            </p>
                        ) : (
                            categories.map((cat) => (
                                <label
                                    key={cat}
                                    className="flex items-center mb-1 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                            cat
                                        )}
                                        onChange={() => onCategoryChange(cat)}
                                        className="mr-2"
                                    />
                                    <span className="text-black">{cat}</span>
                                </label>
                            ))
                        )}
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Sort By</h3>
                        <select
                            value={sortOption}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="w-full cursor-pointer border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="">Select</option>
                            <option value="price_low_high">
                                Price: Low to High
                            </option>
                            <option value="price_high_low">
                                Price: High to Low
                            </option>
                            <option value="name_az">Name: A - Z</option>
                            <option value="name_za">Name: Z - A</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterNav;
