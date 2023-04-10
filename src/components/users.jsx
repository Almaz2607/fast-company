import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const isCorrectLastTwoDigits = /[2-9][2-4]$/.test(number);

    const isLocalGroup = (number >= 2 && number <= 4) || isCorrectLastTwoDigits;

    if (number === 0) return "Никто с тобой не тусанет";
    if (number === 1) return "1 человек тусанет с тобой сегодня";
    if (isLocalGroup) return `${number} человека тусанут с тобой сегодня`;
    return `${number} человек тусанут с тобой сегодня`;
  };

  return (
    <>
      <h2>
        <span className={"badge bg-" + (users.length ? "primary" : "danger")}>
          {renderPhrase(users.length)}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((qualitie) => (
                      <span
                        className={`badge bg-${qualitie.color} me-1`}
                        key={qualitie._id}
                      >
                        {qualitie.name}
                      </span>
                    ))}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}/5</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
