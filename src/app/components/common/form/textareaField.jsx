import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({
    label,
    name,
    placeholder,
    rows,
    value,
    onChange,
    error
}) => {
    const getInputClases = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <textarea
                className={getInputClases()}
                id={name}
                name={name}
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={handleChange}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextareaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextareaField;
