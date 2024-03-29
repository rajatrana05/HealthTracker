import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteUserRoute, GetAllUsersRoute } from "../../Utilities/API-Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../views/Navbar";
import "./Users.css";

const Users = () => {
    // States
    const [users, setUsers] = useState([]);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 6000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    // This is to fetch all the users
    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(GetAllUsersRoute, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (data?.success) {
                setUsers(data?.users);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // This is to delete the user
    const handleDeleteUser = async (id) => {
        const { data } = await axios.delete(`${DeleteUserRoute}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (data?.success) {
            toast.success(data.message, toastOptions);
            getAllUsers();
        }
    };

    // This is to fetch the data when the page is first loaded
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="users_container">
            <Navbar />
            <h1 className="title"> Users List</h1>
            <div className="users-table">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Doctor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isDoctor ? "Yes" : "No"}</td>
                                    <td>
                                        <button className="delete-btn"
                                            onClick={() => {
                                                handleDeleteUser(user._id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Users;
