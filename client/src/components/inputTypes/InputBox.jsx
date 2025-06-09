import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const InputBox = (props) => {
    const [displayEyeIcon, setDisplayEyeIcon] = useState(false);
    const [showPassword, setShowPassword] = useState(props.type);

    function tooglePass(event) {
        event.preventDefault();
        showPassword === "password"
            ? setShowPassword("name")
            : setShowPassword("password");
    }

    useEffect(() => {
        if (props.type === "password") {
            setDisplayEyeIcon(true);
        } else {
            setDisplayEyeIcon(false);
        }
    }, [props.type]);

    return (
        <div className="grid gap-2">
            <label className="text-xl font-semibold">
                {props.placeholder}:
            </label>
            <div className="relative">
                <input
                    type={props.type}
                    value={props.value}
                    placeholder={props.placeholder}
                    className={`bg-gray-100 border-2 w-xs h-12 rounded-xl text-left p-4 ${
                        props.isDisabled ? "cursor-not-allowed" : ""
                    }`}
                    name={props.name}
                    onChange={props.onChange}
                    disabled={props.isDisabled}
                    required
                />
                {displayEyeIcon ? (
                    <div
                        className="absolute right-4 top-3.5 text-xl cursor-pointer"
                        onClick={tooglePass}
                    >
                        {showPassword === "password" ? (
                            <FaEyeSlash />
                        ) : (
                            <FaRegEye />
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default InputBox;
