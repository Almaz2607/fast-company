import React from "react";
import Qualite from "./qualite";
import BookMark from "./bookmark";

const User = ({ user, onDelete, ...rest }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((item) => (
          <Qualite key={item._id} color={item.color} name={item.name} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <BookMark
          status={user.bookmark}
          id={user._id}
          onToggle={rest.onToggle}
        />
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
