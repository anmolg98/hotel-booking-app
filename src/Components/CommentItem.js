import React from 'react';

export default function CommentItem({ comment }) {
  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format date and time according to user's locale
  };

  return (
    <div style={{ border: '1px solid black', position: 'relative', marginBottom: '10px', padding: '10px' }}>
      <p>This is a comment:</p>
      <p>{comment.comment_desc}</p>
      <div style={{ position: 'absolute', top: '0', right: '0' }}>
        {formatTimestamp(comment.timestampField)}
      </div>
    </div>
  );
}
