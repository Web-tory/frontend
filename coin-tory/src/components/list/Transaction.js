import React from 'react';

const Transaction = ({ transaction, index, setSelectedTransaction, handleDeleteTransaction }) => {
  const transactionStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    backgroundColor: '#fff'
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1em'
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

  return (
    <div
      style={transactionStyle}
      onClick={() => setSelectedTransaction(transaction)}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f1f1'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{index + 1}</span>
        <span>분류: {typeToKorean(transaction.type)}</span>
        <span>날짜: {transaction.date}</span>
        <span>내역: {transaction.description}</span>
        <span>태그: {tagToKorean(transaction.tag)}</span>
        <span>금액: {transaction.amount}원</span>
        <span>잔액: {transaction.balance}원</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTransaction(index);
          }}
          style={buttonStyle}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default Transaction;