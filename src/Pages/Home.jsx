import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetPost } from '../Redux/Action/UserAction';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.user.posts || []);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(GetPost());
  }, [dispatch]);

  console.log('Posts in Home:', posts); // Debug log to check posts data

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <div
            key={index}
            style={{
              borderBottom: '1px solid lightgrey',
              padding: '10px',
              marginBottom: '20px',
            }}
          >
            <h4>Posted by: {post.name || "Unknown"}</h4>
            <h3>{post.caption || "No caption available"}</h3>
            {post.postPicUrl && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={post.postPicUrl}
                  alt="Post"
                  style={{
                    width: '700px',
                    maxHeight: '400px',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
            <p>Tags: {post.tags?.join(", ")}</p>
            <small>Created: {new Date(post.createdAt).toLocaleString()}</small>
            <div>
              <span className="material-symbols-outlined">favorite</span>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/comment/${post.id}`)}
                className="material-symbols-outlined"
              >
                mode_comment
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default Home;
