import { Link } from "react-router-dom";

function CategoryListCard(props) {
    return (
        <Link to={`${props.category}`}>
            <div className="flex flex-col items-center justify-center border rounded-lg px-6 py-4 bg-white hover:shadow-md transition-all cursor-pointer">
                <div className="text-4xl text-gray-800">{props.logo}</div>
                <div className="mt-2 font-semibold text-center text-gray-900 font-sans">
                    {props.category}
                </div>
            </div>
        </Link>
    );
}

export default CategoryListCard;
