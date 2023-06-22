import React from "react";
import PropTypes from "prop-types";
import api from "../../../api";

const Comments = ({ users, comment, onDelete }) => {
    const getUserName = (id) =>
        users.filter((user) => user.value === id)[0].label;

    const handleClick = (id) => {
        api.comments.remove(id).then((data) => onDelete(data));
    };

    const getMonthName = (date) => {
        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return month[date.getMonth()];
    };

    const displayDate = () => {
        const now = Date.now();
        const commentCreationTimestamp = +comment.created_at;

        // разница между сейчас и временем создания комментария в миллисекундах
        const diffMs = now - commentCreationTimestamp;

        // получаем объект даты создания комментария
        const commentCreatedDate = new Date(commentCreationTimestamp);

        // получаем minutes, hour, day, month, year из объекта даты создания комментария
        const minutes = commentCreatedDate.getMinutes();
        const hours = commentCreatedDate.getHours();
        const day = commentCreatedDate.getDay();
        const month = getMonthName(commentCreatedDate);
        const year = commentCreatedDate.getFullYear();

        // устанавливаем продолжительность соответствующих временных отрезков в миллисекундах
        const oneYear = 31536000000; // 365*24*60*60*1000
        const oneDay = 86400000; //     24*60*60*1000
        const halfHour = 1800000; //        30*60*1000
        const tenMin = 600000; //        10*60*1000
        const fiveMin = 300000; //         5*60*1000
        const oneMin = 60000; //         1*60*1000

        // логика для вывода сообщения о времени создания данного комментария
        if (diffMs > oneYear) return `${day} ${month} ${year}`;
        if (diffMs > oneDay) return `${day} ${month}`;
        if (diffMs > halfHour) return `${hours}:${minutes}`;
        if (diffMs > tenMin) return "30 минут назад";
        if (diffMs > fiveMin) return "10 минут назад";
        if (diffMs > oneMin) return "5 минут назад";
        return "1 минуту назад";
    };

    const publishedTime = displayDate();

    return (
        <div className="bg-light card-body mb-3">
            {users.length > 0 ? (
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                alt="avatar"
                                className="rounded-circle shadow-1-strong me-3"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">
                                            {getUserName(comment.userId)}
                                            <span className="small">
                                                {` - ${publishedTime}`}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() =>
                                                handleClick(comment._id)
                                            }
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h6>Loading ...</h6>
            )}
        </div>
    );
};

Comments.propTypes = {
    users: PropTypes.array,
    comment: PropTypes.object,
    onDelete: PropTypes.func
};

export default React.memo(Comments);
