import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersList from "../../components/admin/UsersList";

const Users = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchAllUsers() {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/all-users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUserData(result.data.result);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div>
            {loading === true ? (
                <p>Loading</p>
            ) : (
                <div>
                    <UsersList users={userData} fetchAllUsers={fetchAllUsers}/>
                </div>
            )}
        </div>
    );
};

export default Users;
