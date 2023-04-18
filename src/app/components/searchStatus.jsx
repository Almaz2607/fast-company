import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        const isCorrectLastTwoDigits = /[2-9][2-4]$/.test(number);

        const isLocalGroup =
            (number >= 2 && number <= 4) || isCorrectLastTwoDigits;

        if (number === 0) return "Никто с тобой не тусанет";
        if (number === 1) return "1 человек тусанет с тобой сегодня";
        if (isLocalGroup) return `${number} человека тусанут с тобой сегодня`;
        return `${number} человек тусанут с тобой сегодня`;
    };

    return (
        <h2>
            <span className={"badge bg-" + (length ? "primary" : "danger")}>
                {renderPhrase(length)}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
