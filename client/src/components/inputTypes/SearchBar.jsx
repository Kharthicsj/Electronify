import { FaSearch } from "react-icons/fa";

function SearchBar(props) {
    const widthClass = props.width === "full" ? "w-full" : props.width === "md" ? "w-72" : "w-60";

    return (
        <div className="relative">
            <input
                className={`${widthClass} h-10 p-4 pl-10 border rounded-xl bg-white shadow items-center transition-all duration-300`}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
            />
            <div className="absolute left-3 top-3">
                <FaSearch />
            </div>
        </div>
    );
}

export default SearchBar;
