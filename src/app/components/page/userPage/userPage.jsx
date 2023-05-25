import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    api.users.getById(userId).then((data) => setUser(data));

    const handleMoveToList = () => {
        history.push("/users");
    };

    const renderUser = ({
        name,
        profession,
        qualities,
        completedMeetings,
        rate
    }) => (
        <div>
            <h1>{name}</h1>
            <h2>Профессия: {profession.name} </h2>
            <Qualities qualities={qualities} />
            <p>completedMeetings: {completedMeetings}</p>
            <h2>Rate: {rate}</h2>
            <button onClick={handleMoveToList}>Все Пользователи</button>
        </div>
    );

    return <>{user ? renderUser(user) : <h2>{"Loading"}</h2>}</>;
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
