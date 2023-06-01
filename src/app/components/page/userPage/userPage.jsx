import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        history.replace(`/users/${userId}/edit`);
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
            <button onClick={handleClick}>Изменить</button>
        </div>
    );

    return <>{user ? renderUser(user) : <h2>{"Loading"}</h2>}</>;
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
