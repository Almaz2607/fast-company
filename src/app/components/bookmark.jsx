import React from "react";

const BookMark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={"bi bi-chat-square" + (status ? "-fill" : "")} />
    </button>
  );
};

export default BookMark;
