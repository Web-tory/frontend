import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const CommentModal = ({ expense, onClose, onAddComment, onEditComment, onDeleteComment }) => {
  const [commentText, setCommentText] = useState('');
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCommentId) {
      onEditComment(expense.id, editCommentId, commentText, password);
    } else {
      onAddComment(expense.id, commentText, author, password);
    }
    resetForm();
  };

  const resetForm = () => {
    setCommentText('');
    setAuthor('');
    setPassword('');
    setEditCommentId(null);
  };

  const handleEdit = (comment) => {
    if (comment) {
      setEditCommentId(comment.id);
      setCommentText(comment.text);
      setAuthor(comment.author);
    } else {
      console.error("내용을 입력하세요");
    }
  };

  const handleDelete = (commentId) => {
    const passwordPrompt = prompt('비밀번호를 입력하시오:');
    if (passwordPrompt) {
      onDeleteComment(expense.id, commentId, passwordPrompt);
    }
  };

  return (
    <Modal open={!!expense} onClose={onClose}>
      <Box 
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
            {expense.name} 에  댓글 달기
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="내용"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="작성자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            {editCommentId ? '수정 완료' : '작성 완료'}
          </Button>
        </form>
        {expense && expense.comments && expense.comments.map((comment, index) => (
          <Box key={index} mt={2}>
            <Typography variant="body2">
              - {comment && comment.text ? comment.text : "Invalid comment data"}
              {" "} (by {comment && comment.author ? comment.author : "Unknown"})
            </Typography>
            <Button onClick={() => handleEdit(comment)} size="small">수정</Button>
            <Button onClick={() => handleDelete(comment.id)} size="small">삭제</Button>
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default CommentModal;