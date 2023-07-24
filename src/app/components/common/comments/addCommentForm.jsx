import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextareaField from "../form/textareaField";
import { validator } from "../../../utils/validator";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не должно быть пустым"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        onSubmit(data);
        clearForm();
    };

    return (
        <div>
            <h2 className="card-title">New comment</h2>
            <form onSubmit={handleSubmit}>
                <TextareaField
                    name="content"
                    label="Сообщение"
                    rows="3"
                    placeholder="Пожалуйста, введите своё сообщение"
                    value={data.content || ""}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" disabled={!isValid}>
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
