import React from "react";
import { useHistory } from "react-router-dom";

const BackHistoryButton = () => {
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    };

    return (
        <button className="btn btn-primary" onClick={handleClick}>
            <i className="bi bi-caret-left" />
            Назад
        </button>
    );
};

export default BackHistoryButton;
