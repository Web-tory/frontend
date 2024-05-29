import React from 'react';

const TagSummary = ({ incomeSummary, expenseSummary }) => {
  const summaryStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff'
  };

  return (
    <div style={cardStyle}>
      <h2>태그별 내역</h2>
      <div style={summaryStyle}>
        <div>
          <h3>수입</h3>
          <p>오락: {incomeSummary.entertainment}원</p>
          <p>음식: {incomeSummary.food}원</p>
          <p>기타: {incomeSummary.other}원</p>
        </div>
        <div>
          <h3>지출</h3>
          <p>오락: {expenseSummary.entertainment}원</p>
          <p>음식: {expenseSummary.food}원</p>
          <p>기타: {expenseSummary.other}원</p>
        </div>
      </div>
    </div>
  );
};

export default TagSummary;