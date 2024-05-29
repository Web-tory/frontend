import React from 'react';

const MemoCard = ({
  selectedTransaction,
  commentAuthor,
  commentText,
  setCommentAuthor,
  setCommentText,
  transactions,
  setTransactions
}) => {
  const handleCommentSubmit = (transactionIndex) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[transactionIndex].comments.push({ author: commentAuthor, text: commentText });
    setTransactions(updatedTransactions);
    setCommentAuthor('');
    setCommentText('');
  };

  const inputStyle = {
    width: 'calc(100% - 20px)',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd'
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1em'
  };

  const memoCardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  };

  return (
    <div style={memoCardStyle}>
      <h3>메모</h3>
      <p>{selectedTransaction.memo}</p>
      <h4>댓글</h4>
      {selectedTransaction.comments.map((comment, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>{comment.author}</strong>: {comment.text}
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="작성자명"
          value={commentAuthor}
          onChange={(e) => setCommentAuthor(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="댓글 내용"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={() => {
            const transactionIndex = transactions.findIndex(t => t === selectedTransaction);
            handleCommentSubmit(transactionIndex);
          }}
          style={buttonStyle}
        >
          댓글 달기
        </button>
      </div>
    </div>
  );
};

export default MemoCard;