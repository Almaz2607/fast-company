import React from "react";
import PropTypes from "prop-types";

const SearchLine = ({ value, onSearch }) => {
    const handleChange = (e) => {
        const inputValue = e.target.value;
        onSearch(inputValue);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

SearchLine.propTypes = {
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default SearchLine;
