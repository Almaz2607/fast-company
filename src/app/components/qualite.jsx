import React from "react";
import PropTypes from "prop-types";

const Qualite = ({ color, name }) => {
    return <span className={`badge bg-${color} me-1`}>{name}</span>;
};

Qualite.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
export default Qualite;
