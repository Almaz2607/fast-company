import React from "react";

const Qualite = ({ color, name }) => {
  return <span className={`badge bg-${color} me-1`}>{name}</span>;
};

export default Qualite;
