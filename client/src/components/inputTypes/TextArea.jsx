const TextArea = (props) => {
    return (
        <div className="grid gap-2">
            <label className="text-xl font-semibold">
                {props.placeholder}:
            </label>
            <div className="relative">
                <textarea
                    type={props.type}
                    placeholder={props.placeholder}
                    value={props.value}
                    className="bg-gray-100 border-2 w-xs h-40 rounded-xl text-left p-4"
                    name={props.name}
                    onChange={props.onChange}
                    required
                />
            </div>
        </div>
    );
};

export default TextArea;
