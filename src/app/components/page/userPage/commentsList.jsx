import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import SelectField from "../../common/form/selectField";
import Comments from "./comments";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import TextareaField from "../../common/form/textareaField";

const CommentsList = ({ userId }) => {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        userId: "",
        pageId: "",
        content: ""
    });

    useEffect(() => {
        setData((prevState) => ({ ...prevState, pageId: userId }));
    }, [userId]);

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersList = data.map((user) => ({
                label: user.name,
                value: user._id
            }));
            setUsers(usersList);
        });

        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const removeComment = useCallback(
        (id) => {
            const updatedComments = comments.filter(
                (comment) => comment._id !== id
            );
            setComments(updatedComments);
        },
        [comments]
    );

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Имя пользователя обязательно для заполнения"
            }
        },
        content: {
            isRequired: {
                message: "Поле сообщения обязательно для заполнения"
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        api.comments
            .add(data)
            .then((data) => setComments((prevState) => [...prevState, data]));

        setData((prevState) => ({
            ...prevState,
            userId: "",
            content: ""
        }));
    };

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <h2 className="card-title">New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <SelectField
                            value={data.userId}
                            onChange={handleChange}
                            name="userId"
                            options={users}
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
            </div>
            {comments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        {comments
                            .sort((a, b) => b.created_at - a.created_at)
                            .map((comment) => (
                                <Comments
                                    users={users}
                                    comment={comment}
                                    key={comment._id}
                                    onDelete={removeComment}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

CommentsList.propTypes = {
    userId: PropTypes.string
};

export default CommentsList;
