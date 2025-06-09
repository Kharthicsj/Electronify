import InputBox from "../components/inputTypes/InputBox";
import AuthSubmitButton from "../components/buttons/AuthSubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DiMagento } from "react-icons/di";

const signup = () => {
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleFormInput(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function isValidEmail(email) {
        if (!email.includes("@")) return false;

        const parts = email.split("@");
        if (parts.length !== 2) return false;

        const [local, domain] = parts;
        if (local.length === 0 || domain.length < 3) return false;
        if (!domain.includes(".")) return false;
        if (email.includes(" ")) return false;

        return true;
    }

    function isStrongPassword(password) {
        if (password.length < 8) return false;

        let hasUpper = false,
            hasLower = false,
            hasDigit = false,
            hasSymbol = false;

        for (let char of password) {
            if (char >= "A" && char <= "Z") hasUpper = true;
            else if (char >= "a" && char <= "z") hasLower = true;
            else if (char >= "0" && char <= "9") hasDigit = true;
            else hasSymbol = true;
        }

        return hasUpper && hasLower && hasDigit && hasSymbol;
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            return toast.error("Please fill all the mandatory feilds", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        }

        if (!isValidEmail(formData.email)) {
            return toast.error("Invalid email format", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        }

        if (!isStrongPassword(formData.password)) {
            return toast.error(
                "Password must include uppercase, lowercase, number, and symbol, and be at least 8 characters long.",
                {
                    style: {
                        border: "1px solid black",
                        padding: "20px",
                        color: "black",
                    },
                    iconTheme: { primary: "black", secondary: "white" },
                }
            );
        }

        if (formData.password !== formData.confirmPassword) {
            return toast.error("Passwords don't match", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        }

        try {
            setLoading(true);
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/signup`,
                {
                    username: formData.username,
                    role: "user",
                    email: formData.email,
                    password: formData.password,
                }
            );
            toast.success(result.data.message, {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            nav("/login");
        }
    }

    return (
        <div className="md:grid grid-cols-2">
            <div className="bg-black text-white h-screen justify-items-center content-center">
                <div className="text-white text-9xl flex flex-col justify-center">
                    <DiMagento />
                    <p className="text-2xl text-center">Electronify</p>
                </div>
            </div>

            <div className="bg-white text-black h-screen justify-items-center content-center grid gap-y-4">
                <h1 className="font-semibold font-educursive text-2xl">
                    Signup
                </h1>
                <InputBox
                    type="name"
                    placeholder="Username"
                    name="username"
                    onChange={handleFormInput}
                />
                <InputBox
                    type="email"
                    placeholder="Email Id"
                    name="email"
                    onChange={handleFormInput}
                />
                <InputBox
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleFormInput}
                />
                <InputBox
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleFormInput}
                />

                <AuthSubmitButton
                    name={loading === true ? "Loading" : "Submit"}
                    onClick={handleFormSubmit}
                />
                <Link to={"/login"}>Already have an account?</Link>
            </div>
        </div>
    );
};

export default signup;
