import { useState } from "react";
import AuthSubmitButton from "../components/buttons/AuthSubmitButton";
import InputBox from "../components/inputTypes/InputBox";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DiMagento } from "react-icons/di";

const login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    function handleInput(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    async function loginHandler(event) {
        event.preventDefault();
        try {
            setLoading(true);
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/login`,
                formData
            );
            console.log(result);
            if (
                result.data.message === "Incorrect password" ||
                result.data.message === "User account does not exist"
            ) {
                return toast.error(result.data.message, {
                    style: {
                        border: "1px solid black",
                        padding: "16px",
                        color: "black",
                    },
                    iconTheme: { primary: "black", secondary: "white" },
                });
            }
            toast.success(result.data.message, {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });

            if (result.data.token) {
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("loginTime", Date.now().toString());
            }
            nav("/");
        } catch (err) {
            console.log(err);
            toast.error("Internal Server Error", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        } finally {
            setLoading(false);
            location.reload();
        }
    }

    return (
        <div className="md:grid grid-cols-2">
            <div className="bg-black w-full h-screen justify-items-center content-center">
                <div className="text-white text-9xl flex flex-col justify-center">
                    <DiMagento />
                    <p className="text-2xl text-center">Electronify</p>
                </div>
            </div>

            <div className="bg-white w-full h-screen justify-items-center content-center grid gap-y-4">
                <h1 className="text-2xl font-semibold font-educursive mb-4">
                    Login
                </h1>

                <InputBox
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                />

                <InputBox
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                />

                <AuthSubmitButton
                    name={loading === true ? "loading" : "Submit"}
                    onClick={loginHandler}
                />

                <div className="flex justify-items-start gap-30">
                    <Link to={"/signup"} className="hover:text-gray-800">
                        Need account?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default login;
