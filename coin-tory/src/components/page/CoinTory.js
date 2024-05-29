import React, { useState, useEffect } from 'react';
import MemoCard from '../ui/MemoCard';
import TagSummary from '../ui/TagSummary';
import Transaction from '../list/Transaction';

const CoinTory = () => {
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('transactions')) || []);
  const [type, setType] = useState('income');
  const [date, setDate] = useState('2024-05-28');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('other');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(() => JSON.parse(localStorage.getItem('balance')) || 0);
  const [memo, setMemo] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('balance', JSON.stringify(balance));
  }, [transactions, balance]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const handleMemoChange = (e) => {
    setMemo(e.target.value);
  };

  const handleAddTransaction = () => {
    const newBalance = type === 'income' ? balance + amount : balance - amount;
    const newTransaction = {
      type,
      date,
      description,
      tag,
      amount,
      balance: newBalance,
      memo,
      comments: []
    };

    setTransactions([...transactions, newTransaction]);
    setBalance(newBalance);
    setDescription('');
    setAmount(0);
    setMemo('');
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    const deletedTransaction = updatedTransactions.splice(index, 1)[0];
    setTransactions(updatedTransactions);
    setBalance(deletedTransaction.type === 'income' ? balance - deletedTransaction.amount : balance + deletedTransaction.amount);
    if (selectedTransaction === deletedTransaction) {
      setSelectedTransaction(null);
    }
  };

  const handleCommentSubmit = (transactionIndex) => {
    const updatedTransactions = [...transactions];
    updatedTransactions[transactionIndex].comments.push({ author: commentAuthor, text: commentText });
    setTransactions(updatedTransactions);
    setCommentAuthor('');
    setCommentText('');
  };

  const typeToKorean = (type) => {
    return type === 'income' ? '수입' : '지출';
  };

  const tagToKorean = (tag) => {
    switch (tag) {
      case 'entertainment':
        return '오락';
      case 'food':
        return '음식';
      default:
        return '기타';
    }
  };

  const calculateTagSummary = (type) => {
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === type) {
          acc[transaction.tag] = (acc[transaction.tag] || 0) + transaction.amount;
        }
        return acc;
      },
      { entertainment: 0, food: 0, other: 0 }
    );
    return summary;
  };

  const incomeSummary = calculateTagSummary('income');
  const expenseSummary = calculateTagSummary('expense');

  const containerStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  };

  const headerStyle = {
    fontSize: '2.5em',
    margin: '20px 0',
    color: '#4CAF50'
  };

  const flexContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>CoinTory</h1>
      <div style={flexContainerStyle}>
        {selectedTransaction && (
          <MemoCard
            selectedTransaction={selectedTransaction}
            commentAuthor={commentAuthor}
            commentText={commentText}
            setCommentAuthor={setCommentAuthor}
            setCommentText={setCommentText}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}
        <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', width: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
          <h2>가계부</h2>
          <div>
            <label>
              분류:
              <select value={type} onChange={handleTypeChange} style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
                <option value="income">수입</option>
                <option value="expense">지출</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              날짜:
              <input type="date" value={date} onChange={handleDateChange} style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            </label>
          </div>
          <div>
            <label>
              내역:
              <input type="text" value={description} onChange={handleDescriptionChange} style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            </label>
          </div>
          <div>
            <label>
              태그:
              <select value={tag} onChange={handleTagChange} style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }}>
                <option value="entertainment">오락</option>
                <option value="food">음식</option>
                <option value="other">기타</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              금액:
              <input type="number" value={amount} onChange={handleAmountChange} style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            </label>
          </div>
          <div>
            <label>
              메모:
              <input type="text" value={memo} onChange={handleMemoChange} style={{ width: 'calc(100% - 20px)', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd' }} />
            </label>
          </div>
          <button onClick={handleAddTransaction} style={{ padding: '10px 20px', margin: '10px 0', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: '#fff', cursor: 'pointer', fontSize: '1em' }}>추가</button>
        </div>
        <TagSummary incomeSummary={incomeSummary} expenseSummary={expenseSummary} />
      </div>
      <div>
        {transactions.map((transaction, index) => (
          <Transaction
            key={index}
            transaction={transaction}
            index={index}
            setSelectedTransaction={setSelectedTransaction}
            handleDeleteTransaction={handleDeleteTransaction}
          />
        ))}
      </div>
    </div>
  );
};

export default CoinTory;