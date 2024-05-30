import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddExpenseForm = ({ addExpense }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ name, amount: parseInt(amount), category, date });
    setName('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="지출 내역" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
      <TextField label="금액" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth margin="normal" />
      <FormControl fullWidth margin="normal">
        <InputLabel>유형</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="생활">생활</MenuItem>
          <MenuItem value="식비">식비</MenuItem>
          <MenuItem value="화장품">화장품</MenuItem>
          <MenuItem value="학습">학습</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="날짜"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        추가
      </Button>
    </form>
  );
};

export default AddExpenseForm;