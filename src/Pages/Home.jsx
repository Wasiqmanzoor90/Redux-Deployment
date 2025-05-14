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
            <h4 className='mb-3' style={{ fontSize: '1.2rem', opacity: '0.8' }}>Posted by: {post.name || "Unknown"}</h4>

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


            <h3 className='mt-4'>{post.caption || "No caption available"}</h3>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/comment/${post.id}`)}
              className="material-symbols-outlined"
            >
              mode_comment
            </span>


            <p style={{ fontSize: '0.7rem' }}>Uploaded: {new Date(post.createdAt).toLocaleString()}</p>
            <div>


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
