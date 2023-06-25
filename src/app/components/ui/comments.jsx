import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";

const Comments = ({ userId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((c) => c._id !== id));
        });
    };

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
