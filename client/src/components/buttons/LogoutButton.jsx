function LogoutButton() {
    function handleLogout() {
        localStorage.clear();
        location.reload();
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleLogout}
                className="text-white cursor-pointer bg-black text-center rounded-sm w-32 h-10 flex items-center justify-center hover:bg-gray-800"
            >
                Logout
            </button>
        </div>
    );
}

export default LogoutButton;
