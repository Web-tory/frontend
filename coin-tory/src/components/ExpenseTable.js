import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Button } from '@mui/material';

const ExpenseTable = ({ expenses, onRowClick, onDeleteExpense }) => {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>지출 내역</TableCell>
          <TableCell># 금액</TableCell>
          <TableCell>유형</TableCell>
          <TableCell>날짜</TableCell>
          <TableCell>댓글 수</TableCell>
          <TableCell>삭제</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id} onClick={() => onRowClick(expense)}>
            <TableCell>{expense.name}</TableCell>
            <TableCell>₩{expense.amount.toLocaleString()}</TableCell>
            <TableCell>{expense.category}</TableCell>
            <TableCell>{expense.date}</TableCell>
            <TableCell>{expense.comments ? expense.comments.length : 0}</TableCell>
            <TableCell>
              <Button color="error" onClick={(e) => {
                e.stopPropagation(); // Prevents row click event
                onDeleteExpense(expense.id);
              }}>
                삭제
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} align="right">총 금액:</TableCell>
          <TableCell>₩{totalAmount.toLocaleString()}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
