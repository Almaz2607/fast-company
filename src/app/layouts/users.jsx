import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const params = useParams();
    const { userId, editUser } = params;
    const { currentUser } = useAuth();

    return (
        <>
            <UserProvider>
                {userId ? (
                    editUser ? (
                        userId === currentUser._id ? (
                            <EditUserPage />
                        ) : (
                            <Redirect
                                to={`/users/${currentUser._id}/editUser`}
                            />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
