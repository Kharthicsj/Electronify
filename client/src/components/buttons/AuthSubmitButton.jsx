const AuthSubmitButton = (props) => {
    return (
        <div>
            <button
                onClick={props.onClick}
                className="bg-black text-white p-3 w-xs h-12 rounded-xl hover:bg-gray-800 cursor-pointer"
            >
                {props.name}
            </button>
        </div>
    );
};

export default AuthSubmitButton;
