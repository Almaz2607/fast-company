import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUser";

const Users = () => {
    const params = useParams();
    const { userId, editUser } = params;

    return (
        <>
            <UserProvider>
                {userId && editUser ? (
                    <EditUserPage userId={userId} />
                ) : userId ? (
                    <UserPage userId={userId} />
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
