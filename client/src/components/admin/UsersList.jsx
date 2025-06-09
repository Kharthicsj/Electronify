import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import SearchBar from "../inputTypes/SearchBar";

function UsersList({ users }) {
    const [localUsers, setLocalUsers] = useState([]);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("a-z");

    useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const handleRoleChange = async (userId, newRole) => {
        const prevUsers = [...localUsers];

        setLocalUsers((prev) =>
            prev.map((user) =>
                user._id === userId ? { ...user, role: newRole } : user
            )
        );

        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/update-user-role`,
                {
                    targetUserId: userId,
                    role: newRole,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("User role updated", {
                style: {
                    border: "1px solid black",
                    padding: "12px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        } catch (err) {
            console.error(err);
            toast.error("Failed to update role", {
                style: {
                    border: "1px solid black",
                    padding: "12px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });

            // Revert on failure
            setLocalUsers(prevUsers);
        }
    };

    const filteredAndSortedUsers = localUsers
        .filter((user) =>
            [user.username, user.email, user._id]
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortOption) {
                case "a-z":
                    return a.username.localeCompare(b.username);
                case "z-a":
                    return b.username.localeCompare(a.username);
                case "oldest":
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case "newest":
                    return new Date(b.createdAt) - new Date(a.createdAt);
                default:
                    return 0;
            }
        });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Users List
            </h1>

            {/* Search & Sort Row */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
                <SearchBar
                    placeholder="Search Users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="relative">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="appearance-none w-48 px-4 py-2 pr-8 rounded-md border border-gray-300 shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer transition hover:bg-gray-50"
                    >
                        <option value="a-z">A-Z (Username)</option>
                        <option value="z-a">Z-A (Username)</option>
                        <option value="oldest">Oldest First</option>
                        <option value="newest">Newest First</option>
                    </select>
                    <div className="absolute top-3 right-4 text-xl">
                        <FaChevronDown />
                    </div>
                </div>
            </div>

            <div className="space-y-4 p-3">
                {filteredAndSortedUsers.map((user) => (
                    <div
                        key={user._id}
                        className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
                    >
                        <div className="md:flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-lg font-semibold text-gray-800">
                                    {user.username}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {user.email}
                                </p>
                            </div>

                            <div className="mt-4 flex items-center gap-4">
                                <select
                                    value={user.role}
                                    onChange={(e) =>
                                        handleRoleChange(
                                            user._id,
                                            e.target.value
                                        )
                                    }
                                    className="border cursor-pointer border-gray-300 text-sm rounded-md px-3 py-1 bg-gray-100 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black hover:bg-gray-200 transition"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>

                                <button
                                    className="text-gray-600 cursor-pointer"
                                    onClick={() =>
                                        setExpandedUserId((prev) =>
                                            prev === user._id ? null : user._id
                                        )
                                    }
                                >
                                    {expandedUserId === user._id ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </button>
                            </div>
                        </div>

                        {expandedUserId === user._id && (
                            <div className="mt-4 text-sm text-gray-600">
                                <p>
                                    <strong>Created At:</strong>{" "}
                                    {new Date(user.createdAt).toLocaleString()}
                                </p>
                                <p>
                                    <strong>User ID:</strong> {user._id}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UsersList;
