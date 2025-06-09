import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

import { isSessionExpired } from "./utils/SessionHelper";

import Context from "./context/index.js";

function App() {
    const [userData, setUserData] = useState("");
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (isSessionExpired()) {
            toast.error("You're not logged in, Please sign in to continue.", {
                toastId: "session-expired",
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
            localStorage.removeItem("token");
        }
    }, []);

    async function fetchUser() {
        try {
            const token = localStorage.getItem("token");
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/userData`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserData(result.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fetchCartItems() {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/fetch-cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data.success) {
                setCartData(response.data.cart.items || []);
            }
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    }

    useEffect(() => {
        fetchCartItems();
        fetchUser();
    }, []);

    return (
        <Context.Provider value={{ userData, cartData, fetchCartItems, fetchUser }}>
            <Outlet />
            <Toaster position="top-right" reverseOrder={false} />
        </Context.Provider>
    );
}

export default App;
