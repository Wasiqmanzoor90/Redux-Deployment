// Comment.jsx - Fixed component
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetComments } from '../Redux/Action/UserAction';
import { useParams } from 'react-router-dom';

function Comment() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Select comments from Redux store
  const comments = useSelector((state) => state.user?.comment || []);

  useEffect(() => {
    if (postId) {
      setLoading(true);

      // Dispatch the Redux action to get comments
      dispatch(GetComments(postId))
        .finally(() => setLoading(false));
    }
  }, [dispatch, postId]);

  return (
    <div>
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments yet for post ID: {postId}</p>
      ) : (
        <div>
          <p>Found {comments.length} comments</p>
          {comments.map((comment, index) => (
            <div
              key={index}
              style={{
                borderBottom: '1px solid #ccc',
                padding: '10px',
                margin: '10px 0',
              }}
            >
              <p>
                <strong>{comment.name || 'Anonymous'}:</strong> {comment.content}
              </p>
              <small>{new Date(comment.created).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
