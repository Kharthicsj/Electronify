import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { DiMagento } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import { MdAccountBox, MdMenuOpen, MdArrowForward } from "react-icons/md";
import { useState, useContext } from "react";
import { MdAdminPanelSettings } from "react-icons/md";

import Context from "../context";
import LogoutButton from "./buttons/LogoutButton";
import SearchBar from "./inputTypes/SearchBar";

function MobileHeader({ modalVisible, setModalVisible, userData }) {
    return (
        <>
            {/* Sliding Modal for Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-1/2 bg-white bg-opacity-95 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${modalVisible ? "translate-x-0" : "translate-x-full"}
        `}
            >
                {/* Close icon on left middle side */}
                <button
                    onClick={() => setModalVisible(false)}
                    aria-label="Close menu"
                    className="absolute top-3/5 -translate-y-1/2 rounded-r p-2 text-3xl bg-black text-white"
                    style={{ zIndex: 60 }}
                >
                    <MdArrowForward />
                </button>

                <div className="p-4 pt-10 border-b">
                    <h2 className="text-xl font-semibold">Menu</h2>
                </div>

                <nav>
                    <ul className="flex flex-col gap-6 p-4 font-sans">
                        <Link
                            to={"/"}
                            className="hover:underline cursor-pointer flex flex-row items-center gap-2 text-xl"
                            onClick={() => setModalVisible(false)}
                        >
                            <FaHome />
                            Home
                        </Link>
                        <Link
                            to={"/account"}
                            className="hover:underline cursor-pointer flex flex-row items-center gap-2 text-xl"
                            onClick={() => setModalVisible(false)}
                        >
                            <MdAccountBox />
                            Account
                        </Link>
                        {userData?.role === "admin" ? (
                            <Link
                                to={"/admin-panel"}
                                className="hover:underline cursor-pointer flex flex-row items-center gap-2 text-xl"
                            >
                                <MdAdminPanelSettings />
                                AdminPanel
                            </Link>
                        ) : (
                            <></>
                        )}

                        <Link
                            to={"cart"}
                            className="hover:underline cursor-pointer flex flex-row items-center gap-2 text-xl"
                            onClick={() => setModalVisible(false)}
                        >
                            <FaShoppingCart />
                            Cart
                        </Link>

                        <li>
                            {!userData ? (
                                <Link
                                    className="text-white bg-black text-center rounded-sm w-full py-2 block hover:bg-gray-800"
                                    to={"/login"}
                                >
                                    Login
                                </Link>
                            ) : (
                                <LogoutButton />
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {modalVisible && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-30 z-40"
                    onClick={() => setModalVisible(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
}

function Header() {
    const nav = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);

    const { userData, cartData } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        nav(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <div>
            <header className="bg-gray-100 shadow border-b border-gray-200 px-4 py-3">
                {/* Top Row: Logo + Menu Icon + Optional Nav */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => nav("/")}
                    >
                        <div className="text-3xl font-bold">
                            <DiMagento />
                        </div>
                        <p className="text-lg font-semibold">Electronify</p>
                    </div>

                    {/* SearchBar for md+ (Tablet & Desktop) */}
                    <div className="hidden md:block w-full max-w-[400px] mx-6">
                        <SearchBar
                            placeholder="Search for Products..."
                            width="full"
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                    </div>

                    {/* Navigation - Desktop only */}
                    {userData && (
                        <nav className="hidden lg:flex gap-5 items-center">
                            <Link
                                to="/"
                                className="hover:underline flex items-center gap-1"
                            >
                                <FaHome />
                                Home
                            </Link>
                            <Link
                                to="/account"
                                className="hover:underline flex items-center gap-1"
                            >
                                <MdAccountBox />
                                Account
                            </Link>
                            {userData.role === "admin" && (
                                <Link
                                    to="/admin-panel"
                                    className="hover:underline flex items-center gap-1"
                                >
                                    <MdAdminPanelSettings />
                                    AdminPanel
                                </Link>
                            )}
                            <Link
                                to="/cart"
                                className="hover:underline flex items-center gap-1"
                            >
                                <FaShoppingCart className="text-xl" />
                                <span className="flex items-center gap-1">
                                    Cart
                                    {cartData?.length > 0 && (
                                        <span className="bg-black text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                                            {cartData.length}
                                        </span>
                                    )}
                                </span>
                            </Link>
                        </nav>
                    )}

                    {/* Logout/Login - Desktop only */}
                    <div className="hidden lg:block ml-4">
                        {!userData ? (
                            <Link
                                to="/login"
                                className="text-white bg-black rounded-sm px-4 py-2 hover:bg-gray-800"
                            >
                                Login
                            </Link>
                        ) : (
                            <LogoutButton />
                        )}
                    </div>

                    {/* Menu Icon - Mobile & Tablet */}
                    <div className="lg:hidden text-3xl ml-2 cursor-pointer">
                        <MdMenuOpen onClick={() => setModalVisible(true)} />
                    </div>
                </div>

                {/* SearchBar - Mobile only, shown below header */}
                <div className="block md:hidden mt-3">
                    <SearchBar
                        placeholder="Search for Products..."
                        width="full"
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </div>
            </header>

            {/* Mobile Menu as separate component */}
            <MobileHeader
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                userData={userData}
                cartData={cartData}
            />
        </div>
    );
}

export default Header;
