import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBox, FaTruck } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { PiFlagBannerFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";

function NavBar({ open, setOpen }) {
    const SidebarLink = ({ to, icon, label }) => (
        <Link
            to={to}
            className="hover:bg-black hover:text-white h-10 rounded cursor-pointer p-2 flex flex-row items-center gap-4"
            onClick={() => setOpen(false)}
        >
            <div className="text-xl">{icon}</div>
            {label}
        </Link>
    );

    const SidebarLinks = () => (
        <>
            <SidebarLink
                to="/admin-panel/"
                icon={<FaUserPen />}
                label="Users"
            />
            <SidebarLink
                to="/admin-panel/products"
                icon={<FaBox />}
                label="Product Management"
            />
            <SidebarLink
                to="/admin-panel/orders"
                icon={<FaTruck />}
                label="Orders"
            />
            <SidebarLink
                to="/admin-panel/banner"
                icon={<PiFlagBannerFill />}
                label="Banner Image"
            />
        </>
    );

    return (
        <>
            {/* Mobile Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-1/2 bg-white border z-50 transform transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                } md:hidden`}
            >
                <div className="font-semibold font-sans text-xl text-center p-4 pt-10 border-b">
                    Admin Panel
                </div>
                {/* Close Button */}
                {open && (
                    <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 z-50">
                        <button
                            className="bg-white rounded-full p-2 shadow text-lg"
                            onClick={() => setOpen(false)}
                        >
                            <IoIosArrowBack />
                        </button>
                    </div>
                )}

                <ul className="flex flex-col gap-6 p-6 mt-10 font-medium">
                    <SidebarLinks />
                </ul>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex bg-gray-100 p-4 flex-col h-screen gap-20">
                <ul className="flex flex-col gap-10 p-4 mt-10 font-medium">
                    <SidebarLinks />
                </ul>
            </div>

            {/* Desktop Backdrop (no overlay on mobile) */}
            {open && (
                <div
                    className="hidden md:block fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}

export default NavBar;
