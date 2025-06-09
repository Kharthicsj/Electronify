import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/admin/NavBar";
import Header from "../components/Header";
import { MdMenuOpen } from "react-icons/md";

const AdminPanel = () => {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col">
            <Header />

            {/* Mobile Menu Button - Top Left, only on mobile */}
            {!navOpen && (
                <div className="md:hidden absolute left-5 top-20 z-50">
                    <button
                        onClick={() => setNavOpen(true)}
                        className="text-3xl text-black"
                    >
                        <MdMenuOpen />
                    </button>
                </div>
            )}

            <div className="flex-1 flex h-[calc(100vh-5rem)]">
                
                <div className="md:block w-1/5 h-full">
                    <NavBar open={navOpen} setOpen={setNavOpen} />
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {" "}
                    {/* scrollable content */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
