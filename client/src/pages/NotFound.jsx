import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function NotFound() {
    return (
        <div>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
                <Link
                    to="/"
                    className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
}
