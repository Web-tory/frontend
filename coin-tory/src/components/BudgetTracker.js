import React, { useState, useEffect } from 'react';
import ExpenseTable from './ExpenseTable';
import AddExpenseForm from './AddExpenseForm';
import CommentModal from './CommentModal';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';

const BudgetTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [budget, setBudget] = useState(300000); // 초기 예산 설정

  useEffect(() => {
    fetch('http://localhost:5000/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data.map(exp => ({ ...exp, comments: exp.comments || [] }))));
    fetch('http://localhost:5000/budget')
      .then(response => response.json())
      .then(data => setBudget(data.budget));
  }, []);

  const addExpense = (expense) => {
    fetch('http://localhost:5000/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...expense, comments: [] })
    })
    .then(response => response.json())
    .then(newExpense => setExpenses([...expenses, newExpense]));
  };

  const handleRowClick = (expense) => {
    setSelectedExpense(expense);
  };

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm('이 지출 항목을 삭제하시겠습니까?')) {
      fetch(`http://localhost:5000/expenses/${expenseId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then(() => {
        // 서버에서 삭제 성공 후 클라이언트 상태 업데이트
        setExpenses(expenses.filter(exp => exp.id !== expenseId));
        alert('지출 항목이 삭제되었습니다.');
      })
      .catch(error => alert('삭제 중 오류가 발생했습니다: ' + error));
    }
  };

  const handleEditExpense = (expense) => {
    const newName = prompt('새 지출 내역 이름을 입력하세요:', expense.name);
    if (newName && newName !== expense.name) {
      const updatedExpense = { ...expense, name: newName };
      fetch(`http://localhost:5000/expenses/${expense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExpense),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json();
      })
      .then(updatedData => {
        setExpenses(expenses.map(exp => exp.id === expense.id ? updatedData : exp));
        alert('지출 항목이 업데이트 되었습니다.');
      })
      .catch(error => alert('수정 중 오류가 발생했습니다: ' + error));
    }
  };

  
  const handleClose = () => {
    setSelectedExpense(null);
  };

  const handleAddComment = (expenseId, text, author, password) => {
    fetch(`http://localhost:5000/expenses/${expenseId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, author, password })
    })
    .then(response => response.json())
    .then(updatedExpense => {
      setExpenses(expenses.map(exp => exp.id === expenseId ? updatedExpense : exp));
      setSelectedExpense(updatedExpense);
    });
  };

  const handleEditComment = (expenseId, commentId, text, password) => {
    fetch(`http://localhost:5000/expenses/${expenseId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, password })
    })
    .then(response => response.json())
    .then(updatedExpense => {
      setExpenses(expenses.map(exp => exp.id === expenseId ? updatedExpense : exp));
      setSelectedExpense(updatedExpense);
    });
  };

  const handleDeleteComment = (expenseId, commentId, password) => {
    fetch(`http://localhost:5000/expenses/${expenseId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(updatedExpense => {
      setExpenses(expenses.map(exp => exp.id === expenseId ? updatedExpense : exp));
      setSelectedExpense(updatedExpense);
    });
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const saveBudget = () => {
    fetch('http://localhost:5000/budget', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ budget: parseInt(budget, 10) })
    })
    .then(response => response.json())
    .then(() => alert('Budget updated successfully'));
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h4">
            한 달 예산: ₩{parseInt(budget).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            label="예산 수정"
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            margin="normal"
          />
        </Grid>
        <Grid item>
          <Button onClick={saveBudget} variant="contained" color="primary">
            예산 저장
          </Button>
        </Grid>
      </Grid>
      <AddExpenseForm addExpense={addExpense} />
      <ExpenseTable expenses={expenses} onRowClick={handleRowClick} />
      {selectedExpense && (
        <CommentModal 
          expense={selectedExpense} 
          onClose={handleClose} 
          onAddComment={handleAddComment} 
          onEditComment={handleEditComment} 
          onDeleteComment={handleDeleteComment}
        />
      )}
    </Container>
  );
};

export default BudgetTracker;