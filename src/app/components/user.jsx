import React from "react";
import Quality from "./quality";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onDelete,
    onToggleBookMark
}) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((qual) => (
                    <Quality key={qual._id} {...qual} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <BookMark
                    status={bookmark}
                    onClick={() => onToggleBookMark(_id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
