import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextareaField from "../form/textareaField";
import { validator } from "../../../utils/validator";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message:
                    "Выберите имя, от лица которого будет отправлено сообщение"
            }
        },
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
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        onSubmit(data);
        clearForm();
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    return (
        <div>
            <h2 className="card-title">New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    value={data.userId}
                    onChange={handleChange}
                    name="userId"
                    options={arrayOfUsers}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextareaField
                    name="content"
                    label="Сообщение"
                    rows="3"
                    placeholder="Пожалуйста, введите своё сообщение"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isValid}
                    >
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
