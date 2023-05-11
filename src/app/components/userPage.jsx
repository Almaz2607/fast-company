import React, { useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    api.users.getById(id).then((data) => setUser(data));

    const handleMoveToList = () => {
        history.replace("/users");
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
            <h2>{`Профессия: ${profession.name}`} </h2>
            <QualitiesList qualities={qualities} />
            <h6>{`completedMeetings: ${completedMeetings}`}</h6>
            <h3>{`Rate: ${rate}`}</h3>
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleMoveToList}
            >
                Все Пользователи
            </button>
        </div>
    );

    return <>{user ? renderUser(user) : <h2>{"Loading"}</h2>}</>;
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
