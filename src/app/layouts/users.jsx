import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";
import UsersLoader from "../components/ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    const { userId, editUser } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId ? (
                    editUser ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/editUser`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
