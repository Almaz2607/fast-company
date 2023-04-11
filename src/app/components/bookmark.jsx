import React from "react";

const BookMark = ({ status, ...rest }) => {
  const addClass = status ? "-fill" : "";

  const handleClick = (id) => {
    rest.onToggle(id);
  };

  return (
    <span className="border border-dark py-2">
      <i
        type="button"
        className={`bi bi-chat-square${addClass} m-1`}
        id={rest.id}
        onClick={() => handleClick(rest.id)}
      />
    </span>
  );
};

export default BookMark;
